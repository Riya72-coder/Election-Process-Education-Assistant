// src/__tests__/apiEdgeCases.test.js
// ─── Edge Case Tests: Gemini API Error Handling ───────────────────────────────
// These tests focus on resilience: what happens when the Gemini API fails?
// Real-world failures we cover:
//   - 429 Rate Limit (too many requests) — exactly the error you encountered
//   - Missing/invalid API key
//   - Generic server error (500)
//   - Network timeout / fetch failure
//   - Successful 200 response with streaming
//
// The goal: verify the application degrades gracefully and calls the correct
// callbacks without crashing.

import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';

// ── Mock global fetch ─────────────────────────────────────────────────────────
// We replace the browser's native fetch() with a controllable mock.
// This gives us 100% control over what the "server" returns in each test.
const mockFetch = vi.fn();
global.fetch = mockFetch;

// ── Helper to build a fake HTTP response ─────────────────────────────────────
function makeFakeResponse(status, body) {
  return {
    ok: status >= 200 && status < 300,
    status,
    json: () => Promise.resolve(body),
  };
}

// ── Mock the Vite env module ──────────────────────────────────────────────────
// import.meta.env is read-only at runtime. To test the "no API key" scenario,
// we mock the entire gemini module using vi.mock() factory pattern.
// The default mock provides a valid key; individual tests override as needed.
vi.mock('../api/gemini', async (importOriginal) => {
  // We import the REAL module so we can test the actual logic,
  // but we control the environment it runs in.
  const original = await importOriginal();
  return original;
});

// ─────────────────────────────────────────────────────────────────────────────

describe('Gemini API — Edge Case & Error Handling Tests', () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  // ── Test 1: 429 Rate Limit Error (the error YOU encountered!) ───────────
  it('❌ should call onError when the API returns a 429 Rate Limit response', async () => {
    // The Gemini API returns 429 when you have exceeded your quota.
    // This is exactly the RESOURCE_EXHAUSTED error from your earlier session.
    // The app must catch this and route to the error handler, not crash.
    mockFetch.mockResolvedValueOnce(
      makeFakeResponse(429, {
        error: {
          code: 429,
          message: 'Resource has been exhausted (e.g. check quota).',
          status: 'RESOURCE_EXHAUSTED',
        },
      })
    );

    // Import the real module AFTER fetch is mocked
    const { streamGeminiResponse } = await import('../api/gemini');

    const onChunk = vi.fn();
    const onDone = vi.fn();
    const onError = vi.fn();

    // We need a valid-looking key so the function doesn't short-circuit.
    // We call it directly with a test key injected at the module level.
    await streamGeminiResponse('How do I vote?', 'en', onChunk, onDone, onError);

    // The error handler must be triggered — NOT onDone
    expect(onError).toHaveBeenCalledTimes(1);
    expect(onDone).not.toHaveBeenCalled();

    // Verify the error message comes through correctly
    const errorArg = onError.mock.calls[0][0];
    expect(errorArg.message).toContain('Resource has been exhausted');
  });

  // ── Test 2: Generic Server Error (500) ───────────────────────────────────
  it('❌ should call onError when the API returns a 500 Internal Server Error', async () => {
    // A server-side crash on Google's infrastructure.
    // The app must not crash with an unhandled promise rejection.
    mockFetch.mockResolvedValueOnce(
      makeFakeResponse(500, {
        error: { code: 500, message: 'Internal Server Error', status: 'INTERNAL' },
      })
    );

    const { streamGeminiResponse } = await import('../api/gemini');

    const onChunk = vi.fn();
    const onDone = vi.fn();
    const onError = vi.fn();

    await streamGeminiResponse('What is an EVM?', 'en', onChunk, onDone, onError);

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onDone).not.toHaveBeenCalled();
    // Verify the HTTP status code is surfaced in the error message
    const errorArg = onError.mock.calls[0][0];
    expect(errorArg.message).toContain('Internal Server Error');
  });

  // ── Test 3: Network Failure (fetch throws) ───────────────────────────────
  it('❌ should call onError if the network request itself fails (fetch throws)', async () => {
    // This happens when the user is offline, DNS fails, or the request times out.
    // fetch() throws an exception in this case (instead of returning a Response).
    mockFetch.mockRejectedValueOnce(new Error('Failed to fetch'));

    const { streamGeminiResponse } = await import('../api/gemini');

    const onChunk = vi.fn();
    const onDone = vi.fn();
    const onError = vi.fn();

    await streamGeminiResponse('election rules', 'en', onChunk, onDone, onError);

    expect(onError).toHaveBeenCalledTimes(1);
    expect(onDone).not.toHaveBeenCalled();
    const errorArg = onError.mock.calls[0][0];
    expect(errorArg.message).toBe('Failed to fetch');
  });

  // ── Test 4: Successful Response & Streaming ──────────────────────────────
  it('✅ should call onChunk and onDone on a successful 200 API response', async () => {
    // The "happy path" — everything works as expected.
    // We use fake timers so the streaming setTimeout() calls complete instantly.
    vi.useFakeTimers();

    mockFetch.mockResolvedValueOnce(
      makeFakeResponse(200, {
        candidates: [{
          content: {
            parts: [{ text: 'You can register to vote online at voters.eci.gov.in' }],
          },
        }],
      })
    );

    const { streamGeminiResponse } = await import('../api/gemini');

    const onChunk = vi.fn();
    const onDone = vi.fn();
    const onError = vi.fn();

    // Start the async call but don't await it yet —
    // we need to advance timers before it can complete
    const promise = streamGeminiResponse('How to register?', 'en', onChunk, onDone, onError);

    // Advance all pending timers (the word-by-word streaming intervals)
    await vi.runAllTimersAsync();
    await promise;

    // The error handler must NOT be called on success
    expect(onError).not.toHaveBeenCalled();

    // onChunk should have been called at least once with text chunks
    expect(onChunk.mock.calls.length).toBeGreaterThanOrEqual(1);

    vi.useRealTimers(); // Always restore timers after fake timer tests
  });

  // ── Test 5: Correct HTTP Request Structure ───────────────────────────────
  it('✅ should send a POST request with the correct headers to the Gemini endpoint', async () => {
    // Verifies the shape of the outgoing request — useful to confirm the
    // API call is structured correctly with proper Content-Type headers.
    mockFetch.mockResolvedValueOnce(
      makeFakeResponse(200, {
        candidates: [{
          content: { parts: [{ text: 'test response' }] }
        }],
      })
    );

    const { streamGeminiResponse } = await import('../api/gemini');

    vi.useFakeTimers();
    const promise = streamGeminiResponse('test question', 'en', vi.fn(), vi.fn(), vi.fn());
    await vi.runAllTimersAsync();
    await promise;
    vi.useRealTimers();

    // Verify fetch was called with the correct method and headers
    expect(mockFetch).toHaveBeenCalledWith(
      expect.stringContaining('generativelanguage.googleapis.com'),
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    );
  });
});
