import { execute } from "../../src/services/dummy-service.js";

test("result is true and returns learning JS", () => {
  // IMPL of test
  const result = execute();
  expect(result).toBe("Learning JS");
});
