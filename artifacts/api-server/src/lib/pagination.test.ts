/**
 * Unit tests for parsePaginationParam using Node's built-in test runner.
 * Run with: node --experimental-strip-types src/lib/pagination.test.ts
 */
import { test } from "node:test";
import assert from "node:assert/strict";
import { parsePaginationParam, MAX_PAGE_LIMIT } from "./pagination.js";

// ── Valid inputs ──────────────────────────────────────────────────────────────

test("accepts '0'", () => {
  assert.strictEqual(parsePaginationParam("0"), 0);
});

test("accepts '1'", () => {
  assert.strictEqual(parsePaginationParam("1"), 1);
});

test("accepts '50' (default limit)", () => {
  assert.strictEqual(parsePaginationParam("50"), 50);
});

test("accepts MAX_PAGE_LIMIT as string", () => {
  assert.strictEqual(parsePaginationParam(String(MAX_PAGE_LIMIT)), MAX_PAGE_LIMIT);
});

test("accepts a large integer string", () => {
  // parsePaginationParam itself does not enforce the cap; callers do.
  assert.strictEqual(parsePaginationParam("1000000"), 1_000_000);
});

// ── Invalid inputs — must return null ────────────────────────────────────────

test("rejects alphanumeric string 'abc'", () => {
  assert.strictEqual(parsePaginationParam("abc"), null);
});

test("rejects partially-numeric string '50abc'", () => {
  assert.strictEqual(parsePaginationParam("50abc"), null);
});

test("rejects partially-numeric string '12.3abc'", () => {
  assert.strictEqual(parsePaginationParam("12.3abc"), null);
});

test("rejects decimal '1.5'", () => {
  assert.strictEqual(parsePaginationParam("1.5"), null);
});

test("rejects negative '-1'", () => {
  assert.strictEqual(parsePaginationParam("-1"), null);
});

test("rejects negative '-50'", () => {
  assert.strictEqual(parsePaginationParam("-50"), null);
});

test("rejects exponent notation '1e3'", () => {
  assert.strictEqual(parsePaginationParam("1e3"), null);
});

test("rejects exponent notation '1E5'", () => {
  assert.strictEqual(parsePaginationParam("1E5"), null);
});

test("rejects empty string ''", () => {
  assert.strictEqual(parsePaginationParam(""), null);
});

test("rejects whitespace ' 50 '", () => {
  assert.strictEqual(parsePaginationParam(" 50 "), null);
});

test("rejects hex '0xff'", () => {
  assert.strictEqual(parsePaginationParam("0xff"), null);
});

test("rejects Infinity string", () => {
  assert.strictEqual(parsePaginationParam("Infinity"), null);
});

test("rejects NaN string", () => {
  assert.strictEqual(parsePaginationParam("NaN"), null);
});

// ── MAX_PAGE_LIMIT constant ───────────────────────────────────────────────────

test("MAX_PAGE_LIMIT is 100", () => {
  assert.strictEqual(MAX_PAGE_LIMIT, 100);
});
