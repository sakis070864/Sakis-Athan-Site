import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

/**
 * Lazily initializes the Drizzle ORM instance.
 * Safe for serverless environments where a DB might not be configured.
 */
export async function getDb() {
  const url = process.env.DATABASE_URL;
  if (!_db && url && url.startsWith('mysql://')) {
    try {
      _db = drizzle(url);
      console.log("[Database] Connected successfully");
    } catch (error) {
      console.error("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) return;

  try {
    const db = await getDb();
    if (!db) return;

    const values: InsertUser = { openId: user.openId };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    textFields.forEach(field => {
      const val = user[field];
      if (val !== undefined) {
        values[field] = val ?? null;
        updateSet[field] = val ?? null;
      }
    });

    if (user.lastSignedIn) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    
    if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Upsert failed:", error);
  }
}

export async function getUserByOpenId(openId: string) {
  try {
    const db = await getDb();
    if (!db) return undefined;
    const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);
    return result[0];
  } catch (error) {
    console.error("[Database] GetUser failed:", error);
    return undefined;
  }
}
