import { analyzeMood } from "./your-file.js";
import { InferenceClient } from "@huggingface/inference";

// Mock the external dependencies
jest.mock("@huggingface/inference");

describe("analyzeMood", () => {
  let mockClient;

  beforeEach(() => {
    // Reset all mocks
    jest.clearAllMocks();

    // Create a fresh mock client for each test
    mockClient = {
      chatCompletion: jest.fn(),
    };

    // Mock the constructor
    InferenceClient.mockImplementation(() => mockClient);

    // Set up environment variable
    process.env.HF_API_KEY = "test-api-key";
  });

  afterEach(() => {
    delete process.env.HF_API_KEY;
  });

  describe("Input validation", () => {
    test("should return default for empty string", async () => {
      const result = await analyzeMood("");
      expect(result).toEqual({
        explanation: "",
        player_mode: "",
        queries: ["chill"],
      });
    });

    test("should return default for whitespace only", async () => {
      const result = await analyzeMood("   ");
      expect(result).toEqual({
        explanation: "",
        player_mode: "",
        queries: ["chill"],
      });
    });

    test("should return default for null input", async () => {
      const result = await analyzeMood(null);
      expect(result).toEqual({
        explanation: "",
        player_mode: "",
        queries: ["chill"],
      });
    });

    test("should return default for undefined input", async () => {
      const result = await analyzeMood(undefined);
      expect(result).toEqual({
        explanation: "",
        player_mode: "",
        queries: ["chill"],
      });
    });

    test("should return default for non-string input", async () => {
      const result = await analyzeMood(123);
      expect(result).toEqual({
        explanation: "",
        player_mode: "",
        queries: ["chill"],
      });
    });
  });

  describe("Successful API call", () => {
    test("should parse valid JSON response", async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: JSON.stringify({
                explanation: "Test explanation",
                player_mode: "shuffle",
                queries: ["chill", "ambient", "lo-fi"],
              }),
            },
          },
        ],
      };

      mockClient.chatCompletion.mockResolvedValue(mockResponse);

      const result = await analyzeMood("happy mood");

      expect(result).toEqual({
        explanation: "Test explanation",
        player_mode: "shuffle",
        queries: ["chill", "ambient", "lo-fi"],
      });
      expect(mockClient.chatCompletion).toHaveBeenCalledTimes(1);
    });

    test("should handle empty response text", async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: "",
            },
          },
        ],
      };

      mockClient.chatCompletion.mockResolvedValue(mockResponse);

      const result = await analyzeMood("test mood");

      expect(result).toEqual({
        explanation: "",
        player_mode: "",
        queries: ["chill"],
      });
    });

    test("should handle missing choices", async () => {
      const mockResponse = {
        choices: [],
      };

      mockClient.chatCompletion.mockResolvedValue(mockResponse);

      const result = await analyzeMood("test mood");

      expect(result).toEqual({
        explanation: "",
        player_mode: "",
        queries: ["chill"],
      });
    });

    test("should handle missing message content", async () => {
      const mockResponse = {
        choices: [
          {
            message: {},
          },
        ],
      };

      mockClient.chatCompletion.mockResolvedValue(mockResponse);

      const result = await analyzeMood("test mood");

      expect(result).toEqual({
        explanation: "",
        player_mode: "",
        queries: ["chill"],
      });
    });
  });

  describe("Invalid JSON response", () => {
    test("should return default for invalid JSON", async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: "Not a JSON string",
            },
          },
        ],
      };

      mockClient.chatCompletion.mockResolvedValue(mockResponse);
      console.error = jest.fn(); // Mock console.error

      const result = await analyzeMood("test mood");

      expect(result).toEqual({
        explanation: "",
        player_mode: "",
        queries: ["chill"],
      });
      expect(console.error).toHaveBeenCalled();
    });

    test("should return default for malformed JSON", async () => {
      const mockResponse = {
        choices: [
          {
            message: {
              content: "{ invalid json",
            },
          },
        ],
      };

      mockClient.chatCompletion.mockResolvedValue(mockResponse);
      console.error = jest.fn();

      const result = await analyzeMood("test mood");

      expect(result).toEqual({
        explanation: "",
        player_mode: "",
        queries: ["chill"],
      });
    });
  });

  describe("API error handling", () => {
    test("should return default on network error", async () => {
      mockClient.chatCompletion.mockRejectedValue(new Error("Network error"));
      console.error = jest.fn();

      const result = await analyzeMood("test mood");

      expect(result).toEqual({
        explanation: "",
        player_mode: "",
        queries: ["chill"],
      });
      expect(console.error).toHaveBeenCalled();
    });

    test("should return default on API error", async () => {
      mockClient.chatCompletion.mockRejectedValue(new Error("API rate limit"));
      console.error = jest.fn();

      const result = await analyzeMood("test mood");

      expect(result).toEqual({
        explanation: "",
        player_mode: "",
        queries: ["chill"],
      });
    });
  });
});

// Mock console.error to keep test output clean
beforeAll(() => {
  jest.spyOn(console, "error").mockImplementation(() => {});
});

afterAll(() => {
  console.error.mockRestore();
});
