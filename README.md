# Gasless NFT Certificates

> Claim academic certificates as verifiable NFTs on Base Sepolia with **zero gas fees** — powered by the [User Gasless Fund (UGF)](https://docs.base.org/base-sepolia).

---

## 📌 Overview

**UGF NFT Certificate** is a Next.js dApp that lets students mint and claim their graduation certificates as ERC-721 NFTs on-chain. Transactions are **fully gasless** — students never need to hold ETH. Institutions (oracles) issue credentials directly into student wallets through UGF-sponsored transactions.

Built and tested on **Base Sepolia Testnet**.

---

## ✨ What's Implemented

### ✅ Landing Page

| Section | Description |
|---|---|
| ⚡ **Navbar** | Logo · Connect Wallet button (switches to truncated address + Disconnect after connecting) |
| 🎯 **Hero** | "Gasless NFT Certificates" gradient heading · live badge · description · 2 CTAs |
| 🧩 **Features** | 3 cards — NFT Minting · Gasless Transactions with UGF · Base Sepolia Testnet |
| 🔢 **How It Works** | 4-step card grid: Connect → Sign In → Claim → Mint (with arrow connectors on desktop) |
| 🦶 **Footer** | Brand · copyright · GitHub / Docs / Discord links |

### ✅ UGF Gasless Transaction Layer (`@tychilabs/ugf-testnet-js`)

**`lib/ugf.ts`** — thin, typed wrapper around the official UGF testnet SDK.

| Export | Purpose |
|---|---|
| `sendGaslessTx()` | Runs the full UGF lifecycle: **quote → settle → execute** → returns `userTxHash` |
| `mintCertificateGasless()` | Encodes `safeMint(recipient)` calldata and fires a complete gasless NFT mint |
| `buildTxObject()` | Builds the `tx_object` JSON for `quote.get` |
| `encodeSafeMint()` | Returns `0x4e6ec247…` ABI-encoded `safeMint(address)` calldata |
| `ugfAuthenticate()` | EIP-191 wallet signature → JWT |
| `getInjectedSigner()` | `BrowserProvider`-backed signer from MetaMask |
| `BASE_SEPOLIA_CHAIN_ID` | Re-exported: `"84532"` |
| `TYI_USD_PAYMENT_COIN` | Re-exported: `"TYI_MOCK_USD"` |

**UGF lifecycle steps** (all wired in `sendGaslessTx`):

```
1. auth.login  — EIP-191 sig → JWT
2. quote.get   — price destination action → digest + TYI settlement_amount
3. payment.x402.execute — ERC-3009 typed-data sig → UGF pulls TYI_MOCK_USD from wallet
4. chains.evm.sponsorAndExecute — UGF provides sponsored ETH, sends tx → userTxHash
```

Errors are normalised with `[UGF <code>]` prefix so the UI surfaces the failing stage.

### ✅ MetaMask Wallet Connection (ethers.js v6)

- `WalletContext` — React Context + `useWallet()` hook
- `WalletProvider` — server-safe, re-subscribes on unmount/remount
- **Connect** — `eth_requestAccounts` via `BrowserProvider`
- **Disconnect** — resets address, balance, network state, and tx state
- **`claimCertificate()`** — reads `NEXT_PUBLIC_CERTIFICATE_CONTRACT_ADDRESS`, encodes `safeMint(userAddress)` calldata, runs `sendGaslessTx` end-to-end; callers pass an `onHash` callback to receive the confirmed `userTxHash`
- **Real-time account listener** — listens to `accountsChanged`; re-fetches balance automatically on account switch
- **Truncated address display** — e.g. `0x1a2b…9f8e`

### ✅ Base Sepolia Network Configuration

- `BASE_SEPOLIA` constant — chain ID `0x14a34` (84532), RPC, block explorer  
- `wallet_switchEthereumChain` — attempts chain switch first  
- `wallet_addEthereumChain` — falls back if `4902` (chain not added) is thrown; then re-fetches balance  
- **Wrong-network alert banner** (amber pill in navbar) — shown when connected wallet is on an unsupported network  
- Network is **validated on connect** and on every `accountsChanged` event

### ✅ Project Structure — Component Library

```
app/
├── page.tsx                    # Composition entry-point
├── layout.tsx                  # Root layout · Wraps children with WalletProvider
└── components/
    ├── index.ts                # Barrel exports
    ├── Navbar.tsx              # Navigation + wallet button + network alert
    ├── Hero.tsx                # Hero section
    ├── Features.tsx            # Features grid + FeatureCard helper
    ├── HowItWorks.tsx          # How it Works grid + StepCard helper
    ├── Footer.tsx              # Site footer
    └── WalletContext.tsx        # WalletProvider + useWallet hook

lib/
└── ugf.ts                     # UGF SDK integration layer (auth / quote / settle / execute)
```

- `FeatureCard` and `StepCard` are **internal helpers** co-located in their rendering file (not exported)  
- Barrel index pattern makes imports a single line in `page.tsx`

### ✅ CI & Type Safety

| Check | Status |
|---|---|
| ESLint (`npm run lint`) | ✅ Passes (0 warnings) |
| TypeScript (`next build`) | ✅ Passes (0 errors) |
| Production build | ✅ Static pages generated |

---

## 🛠 Tech Stack

| Layer | Tech |
|---|---|
| **Framework** | Next.js 16.2 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS v4 |
| **Blockchain** | ethers.js v6 |
| **Network** | Base Sepolia Testnet (chain ID `84532`) |
| **Wallet** | MetaMask (EVM-compatible) |

---

## ⚡ Quick Start

```bash
# Install dependencies
npm install

# Run the development server
npm run dev

# Lint
npm run lint

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000).

---

## 🔐 Environment Variables

Create a `.env.local` (generated from `.env.example`) before running gasless features:

```bash
# Contract address of the Certificate NFT (ERC-721) deployed on Base Sepolia
NEXT_PUBLIC_CERTIFICATE_CONTRACT_ADDRESS=0xYourContractAddress
```

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_CERTIFICATE_CONTRACT_ADDRESS` | ✅ for minting | ERC-721 address used by `claimCertificate()` |

> `.env.local` is git-ignored. `.env.example` contains only the variable name — **do not commit secrets**.

---

## 🦊 MetaMask Setup

1. Install the [MetaMask browser extension](https://metamask.io/download/)  
2. Click **Connect Wallet** in the navbar  
3. If prompted, approve the connection in MetaMask  
4. If you're on the wrong network, an amber warning appears — click **Switch Network**

---

## 🔗 Base Sepolia Faucet

Students need SEP ETH gas for standard on-chain operations (not required for certificate minting since UGF covers it):

- [Base Sepolia Faucet](https://docs.base.org/network-information)
- [Sepolia Faucet (NAV)](https://sepoliafaucet.com/)

---

## 🗺 Changelog / Future Updates

> This section is maintained as the project evolves.

### v0.2.0 — 🔥 UGF Gasless Layer
_2026-05-20_

- Installed `@tychilabs/ugf-testnet-js` (v0.1.3) — Base Sepolia testnet SDK
- `lib/ugf.ts` — typed integration layer: `sendGaslessTx`, `mintCertificateGasless`, `buildTxObject`, `encodeSafeMint`, `ugfAuthenticate`
- `WalletContext` — `claimCertificate()` method; reads `NEXT_PUBLIC_CERTIFICATE_CONTRACT_ADDRESS`, encodes `safeMint(userAddress)`, runs full UGF lifecycle, surfaces `[UGF <code>]` errors
- `WalletContext` — `sendGaslessTx()` generic method for arbitrary destination calls
- `WalletContext` — `txPending` + `lastTxHash` state; `txPending` blocks wallet buttons while a gasless flow is in progress; `lastTxHash` available to callers via `onHash` callback
- Error normalisation — `UGFError` subclasses map to plain `Error` with `[UGF <code>]` prefix
- `BASE_SEPOLIA_CHAIN_ID` / `TYI_USD_PAYMENT_COIN` re-exported from `@tychilabs/ugf-testnet-js`
- `.env.example` created; `NEXT_PUBLIC_CERTIFICATE_CONTRACT_ADDRESS` documented

### v0.1.0 — 🚀 Initial Release
_2026-05-20_

- Next.js 16 landing page with all 5 sections
- MetaMask integration via ethers.js v6
- Wallet context provider (`WalletProvider`) + `useWallet()` hook
- `wrongNetwork` detection and `wallet_switchEthereumChain` flow
- Wrong-network amber alert banner in navbar
- Component library: `Navbar`, `Hero`, `Features`, `HowItWorks`, `Footer`
- Reusable `WalletContext` with ambient `window.ethereum` type augmentation
- ESLint-clean, TypeScript-clean, production build passing

### 🔜 Planned / In Progress

| Item | Status |
|---|---|
| UGF gasless transaction flow (`UserOperation` / `EntryPoint`) | ⏳ Not started |
| Smart contract integration (NFT minting, oracle claims) | ⏳ Not started |
| SIWE (Sign-in with Ethereum) authentication | ⏳ Not started |
| Certificate claim UI + fetch from on-chain | ⏳ Not started |
| Loading / error skeletons | ⏳ Not started |
| Toast notifications | ⏳ Not started |
| Environment variables for RPC / contract addresses | ⏳ Not started |

---

_Last updated: 2026-05-20_
