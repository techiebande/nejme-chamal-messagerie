import { describe, expect, it } from "vitest";

import { cn } from "./utils";

describe("cn", () => {
  it("joins non-conflicting class names", () => {
    expect(cn("px-2", "py-1")).toBe("px-2 py-1");
  });

  it("resolves Tailwind conflicts - last wins", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });
});
