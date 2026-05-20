import { describe, it, expect } from "vitest";
import { encodeSafeMint, buildTxObject, BASE_SEPOLIA_CHAIN_ID, TYI_USD_PAYMENT_COIN } from "../lib/ugf";

/* ═══════════════════════════════════════════════════════════════════════
 * encodeSafeMint
 * Result = 0x(8 hex) + address_padded_to_64_hex = 74 chars total
 * For "0xaabb" → strip 0x = "aabb" → padStart(64) → 60 zeros + "aabb"
 * ═══════════════════════════════════════════════════════════════════════ */

describe("encodeSafeMint", () => {
  it("starts with the safeMint(address) 4-byte selector (0x4e6ec247)", () => {
    const result = encodeSafeMint("0x1234567890abcdef1234567890abcdef12345678");
    expect(result.startsWith("0x4e6ec247")).toBe(true);
  });

  it("produces a 74-character hex string (0x + 4-byte selector + 64-char padded address)", () => {
    const result = encodeSafeMint("0x1234567890abcdef1234567890abcdef12345678");
    expect(result).toHaveLength(74);
  });

  it("places the input address at the end after padding", () => {
    const input = "0x1234567890abcdef1234567890abcdef12345678";
    const result = encodeSafeMint(input);
    // Last 40 chars = address without the 0x prefix
    expect(result.slice(-40)).toBe(input.replace("0x", ""));
  });

  it("left-pads a short address (4 hex chars) to 64 hex chars with zeros", () => {
    const result = encodeSafeMint("0xaabb");
    // Output = 0x (2) + 4_byte_selector (8) + padded_address (64) = 74 chars
    const addressPart = result.slice(10); // drop "0x"+"4e6ec247"  = 10 chars
    expect(addressPart).toHaveLength(64);
    expect(addressPart.slice(0, 60)).toBe("0".repeat(60));
    expect(addressPart.slice(-4)).toBe("aabb");
  });

  it("left-pads a zero address correctly", () => {
    const result = encodeSafeMint("0x0000000000000000000000000000000000000001");
    const addressPart = result.slice(-40); // plain address segment
    expect(addressPart.slice(0, 39)).toBe("0".repeat(39));
    expect(addressPart.slice(-1)).toBe("1");
  });

  it("returns a string type", () => {
    expect(typeof encodeSafeMint("0x0000000000000000000000000000000000000001")).toBe("string");
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * buildTxObject
 * ═══════════════════════════════════════════════════════════════════════ */

describe("buildTxObject", () => {
  it("serialises to a parseable JSON string", () => {
    const result = buildTxObject({
      from: "0xCaller",
      to: "0xContract",
      data: "0xabcd",
    });
    expect(typeof result).toBe("string");
    expect(() => JSON.parse(result)).not.toThrow();
  });

  it("includes from, to, and data fields in the output", () => {
    const result = buildTxObject({
      from: "0xCaller",
      to: "0xContract",
      data: "0xabcd",
    });
    const obj = JSON.parse(result);
    expect(obj.from).toBe("0xCaller");
    expect(obj.to).toBe("0xContract");
    expect(obj.data).toBe("0xabcd");
  });

  it('defaults value to "0" when omitted', () => {
    const result = buildTxObject({
      from: "0xCaller",
      to: "0xContract",
      data: "0x",
    });
    expect(JSON.parse(result).value).toBe("0");
  });

  it('preserves value when explicitly provided', () => {
    const result = buildTxObject({
      from: "0xCaller",
      to: "0xContract",
      data: "0x",
      value: "1000000000000000000",
    });
    expect(JSON.parse(result).value).toBe("1000000000000000000");
  });
});

/* ═══════════════════════════════════════════════════════════════════════
 * Constants
 * ═══════════════════════════════════════════════════════════════════════ */

describe("re-exported constants", () => {
  it("BASE_SEPOLIA_CHAIN_ID equals 84532 as a string", () => {
    expect(BASE_SEPOLIA_CHAIN_ID).toBe("84532");
  });

  it("TYI_USD_PAYMENT_COIN is the correct UGF mock token symbol", () => {
    expect(TYI_USD_PAYMENT_COIN).toBe("TYI_MOCK_USD");
  });
});
