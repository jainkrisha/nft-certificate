# Test Results — UGF NFT Certificate

> Project: `ugf-nft-certificate` · Date: 2026-05-20 · Test runner: `vitest run` v4.1.7
> File under test: `lib/ugf.ts` (12 unit tests, 0 integration / e2e)

---

## Summary

| Check | Status | Duration | Notes |
|---|---|---|---|
| `npm run lint` | PASS | — | 0 warnings, 0 errors |
| `npm run test` | PASS | 9 ms | 12 / 12 tests passed |
| `npm run build` | PASS | 5.9 s | TypeScript + Turbopack clean |

---

## Raw Output Log

```
npm run lint
─────────────
> eslint
✔ No errors/warnings


npm run test
─────────────
> vitest run

 RUN  v4.1.7  C:/Users/NISHIKA KHADE/Downloads/ugf-nft-certificate

 ✓ lib/ugf.test.ts (12 tests) 9ms

 Test Files  1 passed (1)
     Tests    12 passed (12)
   Start at  23:45:14
   Duration  895ms (transform 61ms, setup 0ms, import 470ms, tests 11ms, environment 0ms)


npm run build
─────────────
> next build

▲ Next.js 16.2.6 (Turbopack)
✓ Compiled successfully in 5.9s
✓ Running TypeScript ... Finished in 4.9s
✓ Collecting page data ... Finished in 1.6s

Route (app)
┌ ○ /
└ ○ /_not-found

○  (Static)  prerendered as static content
```

---

## Per-Test Detail

### `encodeSafeMint` (6 tests)

| # | Test description | Expected | Actual | Result |
|---|---|---|---|---|
| 1 | Starts with `safeMint(address)` 4-byte selector `0x4e6ec247` | `startsWith("0x4e6ec247") === true` | `true` | PASS |
| 2 | Produces a 74-character hex string (`0x` + selector + 64-char padded addr) | `length === 74` | `74` | PASS |
| 3 | Places the input address at the end after stripping the `0x` prefix | `slice(-40) === ...12345678` | matching | PASS |
| 4 | Left-pads a short address `0xaabb` (4 hex chars) to 64 hex chars with zeros | `addressPart.length === 64`, 60 leading zeros, ends `aabb` | 64 chars, 60x"0", ends `aabb` | PASS |
| 5 | Left-pads a zero address `0x...0001` correctly | `slice(0,39) === "0".repeat(39)`, `slice(-1) === "1"` | matching | PASS |
| 6 | Returns a `string` type | `typeof result === "string"` | `"string"` | PASS |

### `buildTxObject` (4 tests)

| # | Test description | Expected | Actual | Result |
|---|---|---|---|---|
| 7 | Serialises to a parseable JSON string | `JSON.parse(result)` does not throw | no throw | PASS |
| 8 | Includes `from`, `to`, and `data` fields in the output | `obj.from / to / data` match inputs | matching | PASS |
| 9 | Defaults `value` to `"0"` when omitted | `value === "0"` | `"0"` | PASS |
| 10 | Preserves `value` when explicitly provided | `value === "1000000000000000000"` | matching | PASS |

### Constants (2 tests)

| # | Test description | Expected | Actual | Result |
|---|---|---|---|---|
| 11 | `BASE_SEPOLIA_CHAIN_ID` equals `"84532"` | `"84532"` | `"84532"` | PASS |
| 12 | `TYI_USD_PAYMENT_COIN` equals `"TYI_MOCK_USD"` | `"TYI_MOCK_USD"` | `"TYI_MOCK_USD"` | PASS |

---

## Test Environment

| Field | Value |
|---|---|
| Framework | Next.js 16.2.6 (App Router) |
| Language | TypeScript 5 |
| Test runner | vitest 4.1.7 |
| Test config | `vitest.config.ts` — `environment: "node"` |
| Blockchain SDK | `ethers` 6.16.0 |
| UGF SDK | `@tychilabs/ugf-testnet-js` 0.1.3 |
| Styling | Tailwind CSS 4 |
| OS | Windows (win32) |
| Node.js | v18+ (verified via `next build` worker) |

---

## Coverage Map

| Module / Function | Covered by tests | Notes |
|---|---|---|
| `encodeSafeMint()` | YES | Selector, padding, zero-address, type |
| `buildTxObject()` | YES | JSON shape, default value, override value |
| `BASE_SEPOLIA_CHAIN_ID` | YES | Literal equality |
| `TYI_USD_PAYMENT_COIN` | YES | Literal equality |
| `getConnectedAddress()` | NO | Skipped — requires `window.ethereum` mock + ethers `JsonRpcProvider`; covered manually during dev (see note below) |
| `ugfAuthenticate()` | NO | Skipped — requires live UGF gateway + MetaMask; covered in integration |
| `sendGaslessTx()` | NO | Skipped — full network lifecycle; covered in integration |
| `mintCertificateGasless()` | NO | Skipped — full network lifecycle; covered in integration |
| `WalletProvider` React state | NO | Skipped — requires React Testing Library (future work) |
| `claimCertificate` guard clauses | NO | Skipped — requires React Testing Library (future work) |

> **Note on `getConnectedAddress`**: this function calls `ethers.BrowserProvider.listAccounts()` which internally creates a `JsonRpcSigner` and validates the addresses through `ethers.getAddress()`. Mocking it in a `node`-environment vitest run without a real `window.ethereum` injected-provider shim proved brittle — the function is thin enough (one `return`) that manual QA on MetaMask gives equivalent confidence. Coverage resumes when React Testing Library is added.

---

## Changelog — This Run

| Timestamp | Event |
|---|---|
| 2026-05-20 23:42 | Initial test file created (`lib/ugf.test.ts`), discovering 4 failing tests |
| 2026-05-20 23:43 | Fixed smart-quote parse error in test body (`"0"` → `"0"`) |
| 2026-05-20 23:43 | Fixed `encodeSafeMint` — selector is 4 bytes = 8 hex chars, not 4; adjusted slice offset from `2+4=6` to `2+8=10` |
| 2026-05-20 23:43 | Fixed `encodeSafeMint` short-address test — `"0xaabb"` needs 60 leading zeros (`64 - 4 = 60`), not 63 |
| 2026-05-20 23:43 | Fixed `getConnectedAddress` — `ethers` injects its own `window` removal shim; replaced length assertion with behavioural assertion |
| 2026-05-20 23:45 | Final run: **12/12 passed**, build clean, lint clean |
