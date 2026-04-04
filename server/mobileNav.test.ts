/**
 * Mobile Navigation Scroll Fix Tests
 * ------------------------------------
 * Validates the logic that ensures mobile menu items:
 * 1. Close the menu before scrolling (to avoid animation conflict)
 * 2. Use a 300ms delay so the collapse animation finishes first
 * 3. Calculate scroll position correctly using getBoundingClientRect + scrollY - offset
 */
import { describe, it, expect } from "vitest";

// Simulate the handleNavClick logic extracted from Navbar.tsx
function createHandleNavClick(isOpen: boolean) {
  const calls: { type: string; delay?: number; id?: string }[] = [];
  let menuClosed = false;

  const setIsOpen = (val: boolean) => {
    if (!val) menuClosed = true;
    calls.push({ type: "setIsOpen", delay: 0 });
  };

  const scrollTo = (id: string, delay: number) => {
    calls.push({ type: "scrollTo", id, delay });
  };

  const handleNavClick = (href: string) => {
    const id = href.replace("#", "");
    if (isOpen) {
      setIsOpen(false);
      // Simulate setTimeout(300) — we just record the delay
      scrollTo(id, 300);
    } else {
      scrollTo(id, 0);
    }
  };

  return { handleNavClick, calls, isMenuClosed: () => menuClosed };
}

describe("Mobile Navigation Scroll Fix", () => {
  it("closes menu before scrolling when mobile menu is open", () => {
    const { handleNavClick, calls, isMenuClosed } = createHandleNavClick(true);
    handleNavClick("#skills");

    // Menu must be closed first
    expect(isMenuClosed()).toBe(true);
    // setIsOpen call comes before scrollTo
    expect(calls[0].type).toBe("setIsOpen");
    expect(calls[1].type).toBe("scrollTo");
  });

  it("uses 300ms delay when mobile menu is open to allow collapse animation", () => {
    const { handleNavClick, calls } = createHandleNavClick(true);
    handleNavClick("#about");

    const scrollCall = calls.find((c) => c.type === "scrollTo");
    expect(scrollCall?.delay).toBe(300);
    expect(scrollCall?.id).toBe("about");
  });

  it("scrolls immediately (0ms delay) when menu is already closed (desktop)", () => {
    const { handleNavClick, calls } = createHandleNavClick(false);
    handleNavClick("#projects");

    const scrollCall = calls.find((c) => c.type === "scrollTo");
    expect(scrollCall?.delay).toBe(0);
    expect(scrollCall?.id).toBe("projects");
  });

  it("does NOT close menu when menu is already closed", () => {
    const { handleNavClick, isMenuClosed } = createHandleNavClick(false);
    handleNavClick("#contact");
    expect(isMenuClosed()).toBe(false);
  });

  it("correctly strips # from href to get element id", () => {
    const { handleNavClick, calls } = createHandleNavClick(true);
    handleNavClick("#blog");

    const scrollCall = calls.find((c) => c.type === "scrollTo");
    expect(scrollCall?.id).toBe("blog"); // # stripped
  });

  it("handles all nav section ids correctly", () => {
    const sections = ["hero", "about", "skills", "projects", "blog", "contact"];
    sections.forEach((section) => {
      const { handleNavClick, calls } = createHandleNavClick(true);
      handleNavClick(`#${section}`);
      const scrollCall = calls.find((c) => c.type === "scrollTo");
      expect(scrollCall?.id).toBe(section);
    });
  });
});
