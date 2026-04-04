import { describe, expect, it } from "vitest";
import { BLOG_POSTS } from "../shared/blogData";

const REQUIRED_FIELDS = [
  "id", "slug", "title", "excerpt", "content",
  "category", "tags", "readTime", "date",
  "color", "borderColor", "accentColor", "tagColor", "linkedInUrl",
] as const;

describe("Blog Posts — Real Data Integrity", () => {
  it("should have at least 6 blog posts", () => {
    expect(BLOG_POSTS.length).toBeGreaterThanOrEqual(6);
  });

  it("each post should have all required fields with non-empty values", () => {
    for (const post of BLOG_POSTS) {
      for (const field of REQUIRED_FIELDS) {
        expect(post[field], `Post "${post.title}" missing field: ${field}`).toBeTruthy();
      }
    }
  });

  it("each post should have a unique id", () => {
    const ids = BLOG_POSTS.map((p) => p.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it("each post should have a unique slug", () => {
    const slugs = BLOG_POSTS.map((p) => p.slug);
    const uniqueSlugs = new Set(slugs);
    expect(uniqueSlugs.size).toBe(slugs.length);
  });

  it("each post slug should be URL-safe (lowercase letters, digits, hyphens only)", () => {
    for (const post of BLOG_POSTS) {
      expect(post.slug, `Slug "${post.slug}" is not URL-safe`).toMatch(/^[a-z0-9-]+$/);
    }
  });

  it("each post should have at least one tag", () => {
    for (const post of BLOG_POSTS) {
      expect(post.tags.length, `Post "${post.title}" has no tags`).toBeGreaterThan(0);
    }
  });

  it("each post LinkedIn URL should point to sakis-athan profile", () => {
    for (const post of BLOG_POSTS) {
      expect(post.linkedInUrl).toContain("sakis-athan");
    }
  });

  it("each post title should be longer than 10 characters", () => {
    for (const post of BLOG_POSTS) {
      expect(post.title.length, `Post id=${post.id} title too short`).toBeGreaterThan(10);
    }
  });

  it("each post excerpt should be longer than 20 characters", () => {
    for (const post of BLOG_POSTS) {
      expect(post.excerpt.length, `Post id=${post.id} excerpt too short`).toBeGreaterThan(20);
    }
  });

  it("each post content should be longer than 50 characters", () => {
    for (const post of BLOG_POSTS) {
      expect(post.content.length, `Post id=${post.id} content too short`).toBeGreaterThan(50);
    }
  });

  it("post ids should be sequential starting from 1", () => {
    const ids = [...BLOG_POSTS].sort((a, b) => a.id - b.id).map((p) => p.id);
    ids.forEach((id, i) => expect(id).toBe(i + 1));
  });
});
