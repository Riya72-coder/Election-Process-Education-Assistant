// src/__tests__/chatAssistant.test.jsx
// ─── Integration Tests: ChatAssistant Component ───────────────────────────────
// These tests render the full ChatAssistant panel and simulate real user
// interactions (typing, clicking). The Gemini API module is mocked so no
// live network requests are made during the test run.
//
// Key principles demonstrated:
//  1. Component rendering in a real DOM environment (jsdom).
//  2. Mocking external modules with vi.mock() to isolate the component.
//  3. Simulating user input with @testing-library/user-event.
//  4. Asserting UI state changes as a result of user actions.

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// ── Mocks ─────────────────────────────────────────────────────────────────────

// 1. Mock framer-motion: the animation library requires a browser canvas API
//    that jsdom does not support. We replace all motion components with plain
//    HTML equivalents so our tests aren't blocked by animation concerns.
vi.mock('framer-motion', async () => {
  const actual = await vi.importActual('framer-motion');
  return {
    ...actual,
    // Replace animated components with their static HTML equivalents.
    // Using JSX here is safe because vitest.config.js sets jsxRuntime: 'automatic'.
    motion: {
      div: ({ children, ...props }) => <div {...props}>{children}</div>,
      button: ({ children, ...props }) => <button {...props}>{children}</button>,
      span: ({ children, ...props }) => <span {...props}>{children}</span>,
    },
    AnimatePresence: ({ children }) => <>{children}</>,
  };
});

// 2. Mock react-i18next: our component calls useTranslation() to get strings.
//    We return a simple function so keys render as-is, keeping tests readable.
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key) => {
      if (key === 'chat.chips') return ['How do I register?', 'What is an EVM?'];
      if (key === 'chat.welcome') return 'Welcome to CivicGuide AI!';
      if (key === 'chat.placeholder') return 'Ask me anything...';
      if (key === 'chat.tagline') return 'Powered by Gemini AI';
      if (key === 'chat.online') return 'Online';
      return key;
    },
    i18n: { language: 'en' },
  }),
  initReactI18next: { type: '3rdParty', init: vi.fn() },
}));

// 3. Mock the Gemini API: the critical mock. We replace the real
//    network-calling module with a controlled version that resolves instantly.
//    No API keys needed. No network latency. 100% deterministic.
vi.mock('../api/gemini', () => ({
  streamGeminiResponse: vi.fn(),
}));

// ── Imports (MUST come after vi.mock() calls) ─────────────────────────────────
import ChatAssistant from '../components/chat/ChatAssistant';
import { ChatProvider } from '../components/chat/ChatContext';
import { streamGeminiResponse } from '../api/gemini';

// ── Test Helper ───────────────────────────────────────────────────────────────
// ChatAssistant requires ChatContext, so we wrap it in ChatProvider.
function renderChat() {
  return render(
    <ChatProvider>
      <ChatAssistant />
    </ChatProvider>
  );
}

// ─────────────────────────────────────────────────────────────────────────────

describe('ChatAssistant Component — Integration Tests', () => {

  beforeEach(() => {
    // Reset all mock call counts and implementations before each test
    // to prevent state from leaking between tests.
    vi.clearAllMocks();
  });

  // ── Test 1: Basic Rendering ──────────────────────────────────────────────
  it('✅ should render the FAB (floating action) button on initial load', () => {
    renderChat();
    // The floating action button is the entry point to the chat.
    // It must be visible to the user when the chat panel is closed.
    const fab = screen.getByRole('button', { name: /open civicguide ai chat/i });
    expect(fab).toBeInTheDocument();
  });

  // ── Test 2: Opening the Panel ────────────────────────────────────────────
  it('✅ should open the chat panel when the FAB is clicked', async () => {
    const user = userEvent.setup();
    renderChat();

    const fab = screen.getByRole('button', { name: /open civicguide ai chat/i });
    await user.click(fab);

    // After clicking, the chat panel header should be visible.
    expect(screen.getByText('CivicGuide AI')).toBeInTheDocument();
  });

  // ── Test 3: Input Field Availability ────────────────────────────────────
  it('✅ should show an empty textarea when the panel first opens', async () => {
    const user = userEvent.setup();
    renderChat();

    await user.click(screen.getByRole('button', { name: /open civicguide ai chat/i }));

    // The textarea must exist and start empty.
    const textarea = screen.getByPlaceholderText('Ask me anything...');
    expect(textarea).toBeInTheDocument();
    expect(textarea).toHaveValue('');
  });

  // ── Test 4: User Typing ──────────────────────────────────────────────────
  it('✅ should reflect typed text in the textarea', async () => {
    const user = userEvent.setup();
    renderChat();

    await user.click(screen.getByRole('button', { name: /open civicguide ai chat/i }));

    const textarea = screen.getByPlaceholderText('Ask me anything...');

    // Type a question — simulates a real user typing character by character.
    await user.type(textarea, 'How do I register to vote?');

    // Verify the controlled input reflects the typed text.
    expect(textarea).toHaveValue('How do I register to vote?');
  });

  // ── Test 5: Mocked API Call ──────────────────────────────────────────────
  it('✅ should call streamGeminiResponse when a message is sent via Enter key', async () => {
    const user = userEvent.setup();

    // Configure our mock to immediately call onDone, simulating a fast response.
    streamGeminiResponse.mockImplementation(
      (prompt, lang, onChunk, onDone, onError) => {
        onChunk('You can register at voters.eci.gov.in');
        onDone();
      }
    );

    renderChat();
    await user.click(screen.getByRole('button', { name: /open civicguide ai chat/i }));

    const textarea = screen.getByPlaceholderText('Ask me anything...');
    await user.type(textarea, 'How do I register?');

    // Simulate pressing Enter to submit (identical to clicking the Send button).
    await user.keyboard('{Enter}');

    // Verify the Gemini API was called once with the correct arguments.
    await waitFor(() => {
      expect(streamGeminiResponse).toHaveBeenCalledTimes(1);
      expect(streamGeminiResponse).toHaveBeenCalledWith(
        'How do I register?', // the user's trimmed message
        'en',                  // the active language code
        expect.any(Function),  // onChunk callback
        expect.any(Function),  // onDone callback
        expect.any(Function),  // onError callback
      );
    });
  });
});
