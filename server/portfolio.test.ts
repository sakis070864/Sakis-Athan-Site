import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock the LLM and notification modules
vi.mock("./_core/llm", () => ({
  invokeLLM: vi.fn().mockResolvedValue({
    choices: [
      {
        message: {
          content: "I am Sakis's AI assistant. How can I help you?",
        },
      },
    ],
  }),
}));

vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

describe("contact.send", () => {
  it("sends a contact form message and returns success", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.send({
      name: "John Doe",
      email: "john@example.com",
      subject: "AI project inquiry",
      message: "I would like to discuss an AI automation project.",
    });

    expect(result).toEqual({ success: true });
  });

  it("sends a contact form message without optional subject", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.contact.send({
      name: "Jane Smith",
      email: "jane@example.com",
      message: "Hello, I need help with an AI chatbot.",
    });

    expect(result).toEqual({ success: true });
  });

  it("rejects invalid email addresses", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.send({
        name: "Test User",
        email: "not-an-email",
        message: "Test message",
      })
    ).rejects.toThrow();
  });

  it("rejects empty name", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.contact.send({
        name: "",
        email: "test@example.com",
        message: "Test message",
      })
    ).rejects.toThrow();
  });
});

describe("chat.message", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns an AI response for a user message", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.chat.message({
      messages: [{ role: "user", content: "What are Sakis's skills?" }],
    });

    expect(result).toHaveProperty("content");
    expect(typeof result.content).toBe("string");
    expect(result.content.length).toBeGreaterThan(0);
  });

  it("handles multi-turn conversation history", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.chat.message({
      messages: [
        { role: "user", content: "What does Sakis do?" },
        { role: "assistant", content: "Sakis is an AI Orchestrator and Software Developer." },
        { role: "user", content: "Can he build chatbots?" },
      ],
    });

    expect(result).toHaveProperty("content");
    expect(typeof result.content).toBe("string");
  });

  it("rejects empty messages array with an error", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    // Gemini requires at least one message in contents — empty array should throw
    await expect(
      caller.chat.message({ messages: [] })
    ).rejects.toThrow();
  });
});

describe("auth.logout", () => {
  it("clears session cookie and returns success", async () => {
    const clearedCookies: { name: string; options: Record<string, unknown> }[] = [];
    const ctx: TrpcContext = {
      user: {
        id: 1,
        openId: "test-user",
        email: "test@example.com",
        name: "Test User",
        loginMethod: "manus",
        role: "user",
        createdAt: new Date(),
        updatedAt: new Date(),
        lastSignedIn: new Date(),
      },
      req: { protocol: "https", headers: {} } as TrpcContext["req"],
      res: {
        clearCookie: (name: string, options: Record<string, unknown>) => {
          clearedCookies.push({ name, options });
        },
      } as unknown as TrpcContext["res"],
    };

    const caller = appRouter.createCaller(ctx);
    const result = await caller.auth.logout();

    expect(result).toEqual({ success: true });
    expect(clearedCookies).toHaveLength(1);
  });
});
