import { decimalToString } from "../../../src/format/utils/decimalToString";

describe("decimalToString", () => {
  it("should return stringified number with at least 2 digits after dot", () => {
    expect(decimalToString(1, 2)).toBe("1");
    expect(decimalToString(1.1, 2)).toBe("1.1");
    expect(decimalToString(1.15, 2)).toBe("1.15");
    expect(decimalToString(10000123.151516546546, 2)).toBe("10000123.15");
    expect(decimalToString(10000123.151516546546, 3)).toBe("10000123.152");
  });
  it("should format number by default with 2 digits", () => {
    expect(decimalToString(1)).toBe("1");
    expect(decimalToString(1.1)).toBe("1.1");
    expect(decimalToString(1.15)).toBe("1.15");
    expect(decimalToString(10000123.151516546546)).toBe("10000123.15");
    expect(decimalToString(10000123.156516546546)).toBe("10000123.16");
  });
});
