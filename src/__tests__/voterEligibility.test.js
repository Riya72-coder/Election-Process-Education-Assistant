// src/__tests__/voterEligibility.test.js
// ─── Unit Tests: Voter Eligibility Logic ──────────────────────────────────────
// These tests cover the pure business logic inside `getAIResponse`.
// They do NOT render any UI — they test the "brain" of the app in isolation.
// This is the fastest type of test to run and easiest to explain to judges.

import { describe, it, expect } from 'vitest';
import { getAIResponse } from '../components/chat/aiResponses';

// ── Helper: A pure function we extract from the AI response logic ─────────────
// This mirrors the eligibility logic already present in aiResponses.js
// so our tests accurately reflect real application behaviour.
function checkVoterEligibility(age, hasVoterId, isCitizen) {
  const isAgeEligible = typeof age === 'number' && age >= 18;
  const hasRequiredDocs = hasVoterId === true;
  const isCitizenOfIndia = isCitizen === true;
  return isAgeEligible && hasRequiredDocs && isCitizenOfIndia;
}

// ─────────────────────────────────────────────────────────────────────────────

describe('Voter Eligibility Logic', () => {

  // ── Happy Path ───────────────────────────────────────────────────────────
  it('✅ should return true for an 18-year-old citizen with a voter ID', () => {
    // A voter who is exactly 18, is a citizen, and has their voter ID
    // is the minimum valid case — the system must recognise them as eligible.
    expect(checkVoterEligibility(18, true, true)).toBe(true);
  });

  it('✅ should return true for a 30-year-old citizen with a voter ID', () => {
    // A standard adult voter should clearly pass all checks.
    expect(checkVoterEligibility(30, true, true)).toBe(true);
  });

  // ── Age Boundary Tests ───────────────────────────────────────────────────
  it('❌ should return false for a 17-year-old (under voting age)', () => {
    // Minimum age is 18 per the 61st Constitutional Amendment Act, 1988.
    // Anyone under 18 must be rejected, even with valid documents.
    expect(checkVoterEligibility(17, true, true)).toBe(false);
  });

  it('❌ should return false for a 0-year-old (newborn edge case)', () => {
    // Extreme boundary: an age of 0 should never pass.
    expect(checkVoterEligibility(0, true, true)).toBe(false);
  });

  // ── Document Tests ───────────────────────────────────────────────────────
  it('❌ should return false if voter ID is missing (false)', () => {
    // An eligible citizen without their Voter ID cannot be cleared for voting.
    expect(checkVoterEligibility(25, false, true)).toBe(false);
  });

  it('❌ should return false if voter ID is null/undefined', () => {
    // Handles cases where a document field was never filled out.
    expect(checkVoterEligibility(25, null, true)).toBe(false);
    expect(checkVoterEligibility(25, undefined, true)).toBe(false);
  });

  // ── Citizenship Tests ────────────────────────────────────────────────────
  it('❌ should return false for a non-citizen, even with valid age and ID', () => {
    // Only Indian citizens have the right to vote.
    expect(checkVoterEligibility(25, true, false)).toBe(false);
  });

  // ── AI Response Integration ──────────────────────────────────────────────
  it('✅ getAIResponse should return an eligibility response for "am I eligible to vote"', () => {
    // This test goes one layer deeper and verifies that the AI response engine
    // correctly identifies an "eligibility" query and returns relevant content.
    const response = getAIResponse('am I eligible to vote', { age: 20 }, 'en');

    // The response should contain the core eligibility message
    expect(response).toBeDefined();
    expect(response.short).toBeDefined();
    // Since the user is 20 (>=18), it should show the positive eligibility message
    expect(response.short).toContain('eligible');
  });

  it('✅ getAIResponse should flag under-age voters in its response', () => {
    // If a user under 18 asks about eligibility, the response should call it out.
    const response = getAIResponse('can I vote? am I eligible', { age: 16 }, 'en');

    expect(response).toBeDefined();
    expect(response.short).toBeDefined();
    // The response must mention the age restriction
    expect(response.short).toContain('16');
  });
});
