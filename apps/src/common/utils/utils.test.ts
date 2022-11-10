import { formatDate, getValue } from "./utils";

describe("format Date", () => {
  it("should return date formatted", async () => {
    const response = formatDate("2022-11-07T10:06:00.000Z");
    expect(response).toStrictEqual("07-11-2022");
  });
  it("should return empty string if input string is null", async () => {
    const response = formatDate();
    expect(response).toStrictEqual("");
  });
  it("should return empty string if not a date", async () => {
    const response = formatDate("2as24342");
    expect(response).toStrictEqual("");
  });
});

describe("get Value", () => {
  it("should return expected value", async () => {
    const response = getValue("12345676432:value");
    expect(response).toStrictEqual("value");
  });
});
