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

### ✅ MetaMask Wallet Connection (ethers.js v6)

- `WalletContext` — React Context + `useWallet()` hook  
- `WalletProvider` — server-safe, re-subscribes on unmount/remount  
- **Connect** — `eth_requestAccounts` via `BrowserProvider`  
- **Disconnect** — resets address, balance, and network state  
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
