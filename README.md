# UGF NFT Certificate

A beginner-friendly gasless dApp built on Base Sepolia for the UGF Hackathon. Students claim their academic certificates as verifiable ERC-721 NFTs — without ever needing ETH in their wallet. Gas is paid in Mock USD via the Universal Gas Framework (UGF).

---

## Live Demo

🚀 **Vercel:** [Add your Vercel URL here after deployment]

📄 **Deployed Contract:** [0x5B1202D4cf17fcc362d939916eC1c638cf65B0fA](https://sepolia.basescan.org/address/0x5B1202D4cf17fcc362d939916eC1c638cf65B0fA)

---

## The Problem This Solves

Normally, doing anything on a blockchain requires ETH in your wallet just to pay gas fees. This breaks the experience for new users who don't own crypto. UGF removes this barrier — users pay gas in Mock USD (TYI), and UGF sponsors the actual ETH transaction on their behalf.

This app demonstrates that Web3 onboarding can feel as simple as a regular website.

---

## How It Works

```
1. Connect MetaMask wallet
2. Click "Claim Certificate"
3. Sign two MetaMask popups (no ETH spent — just signatures)
4. UGF pays the gas using Mock USD from your wallet
5. NFT certificate is minted to your wallet on Base Sepolia
6. View your confirmed transaction on BaseScan
```

**UGF Lifecycle under the hood:**
```
auth.login           → EIP-191 wallet signature → JWT
quote.get            → get gas price in TYI Mock USD → digest
payment.x402.execute → ERC-3009 signature → UGF pulls TYI from wallet
sponsorAndExecute    → UGF sponsors ETH, submits tx → userTxHash
```

No paymasters. No bundlers. No ERC-4337. Just quote → settle → execute → confirm.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2 (App Router) |
| Language | TypeScript 5 |
| Styling | Tailwind CSS v4 |
| Blockchain Library | ethers.js v6 |
| Gasless Layer | `@tychilabs/ugf-testnet-js` v0.1.3 |
| Network | Base Sepolia Testnet (chain ID `84532`) |
| Wallet | MetaMask |
| Smart Contract | ERC-721 (Solidity 0.8.20, OpenZeppelin) |

---

## Project Structure

```
ugf-nft-certificate/
├── app/
│   ├── page.tsx                  # Page composition
│   ├── layout.tsx                # Root layout with WalletProvider
│   ├── globals.css               # Global styles
│   └── components/
│       ├── Navbar.tsx            # Navigation + wallet connect/disconnect
│       ├── Hero.tsx              # Hero section + claim certificate button
│       ├── Features.tsx          # Feature highlights (NFT minting, gasless, Base Sepolia)
│       ├── HowItWorks.tsx        # 4-step flow: Connect → Sign → Claim → Mint
│       ├── Footer.tsx            # Site footer
│       ├── WalletContext.tsx     # Wallet state management + claimCertificate()
│       └── index.ts              # Barrel exports
├── contracts/
│   └── CertificateNFT.sol        # ERC-721 contract deployed on Base Sepolia
├── lib/
│   └── ugf.ts                    # UGF SDK integration (quote, settle, execute)
├── .env.example                  # Environment variable template
└── README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- MetaMask browser extension installed
- TYI Mock USD tokens — get them free from the [UGF Faucet](https://universalgasframework.com/faucets)

### 1. Clone and Install

```bash
git clone https://github.com/YOURUSERNAME/ugf-nft-certificate.git
cd ugf-nft-certificate
npm install
```

### 2. Set Up Environment

```bash
cp .env.example .env.local
```

Your `.env.local` will contain:
```
NEXT_PUBLIC_CERTIFICATE_CONTRACT_ADDRESS=0x5B1202D4cf17fcc362d939916eC1c638cf65B0fA
```

The contract is already deployed — no need to redeploy anything.

### 3. Run the Dev Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

### 4. Set Up MetaMask

Add Base Sepolia to MetaMask if it isn't there:

| Field | Value |
|---|---|
| Network name | Base Sepolia |
| RPC URL | https://sepolia.base.org |
| Chain ID | 84532 |
| Symbol | ETH |
| Explorer | https://sepolia.basescan.org |

Then get TYI Mock USD from [universalgasframework.com/faucets](https://universalgasframework.com/faucets).

### 5. Test the Full Flow

1. Open the app at localhost:3000
2. Click **Connect Wallet** — approve in MetaMask
3. Click **Claim Certificate** — sign two MetaMask popups
4. Wait ~15 seconds for UGF to process
5. See the success message with your BaseScan transaction link

---

## Smart Contract

The `CertificateNFT` contract is a minimal ERC-721 deployed on Base Sepolia.

| Property | Value |
|---|---|
| Address | `0x5B1202D4cf17fcc362d939916eC1c638cf65B0fA` |
| Network | Base Sepolia (chain ID 84532) |
| Token Name | UGF Certificate |
| Token Symbol | UGFC |
| Solidity Version | 0.8.20 |
| Key Function | `safeMint(address to)` |

Source code is in `contracts/CertificateNFT.sol`.

---

## Deploying to Vercel

1. Push this repo to GitHub
2. Go to [vercel.com](https://vercel.com) and click **Add New Project**
3. Import your GitHub repository
4. Under **Environment Variables**, add:
   - Name: `NEXT_PUBLIC_CERTIFICATE_CONTRACT_ADDRESS`
   - Value: `0x5B1202D4cf17fcc362d939916eC1c638cf65B0fA`
5. Click **Deploy**
6. Your app is live at `your-project.vercel.app`

Any future `git push` to `main` will automatically redeploy.

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_CERTIFICATE_CONTRACT_ADDRESS` | ✅ | ERC-721 contract address on Base Sepolia |

---

## Features Implemented

| Feature | Status |
|---|---|
| ERC-721 CertificateNFT contract deployed on Base Sepolia | ✅ |
| Full UGF gasless flow (quote → settle → execute) | ✅ |
| MetaMask wallet connection and disconnection | ✅ |
| Base Sepolia network detection and auto-switch | ✅ |
| Claim Certificate button wired to UGF mint | ✅ |
| Loading state during transaction (~15s) | ✅ |
| Success state with BaseScan transaction link | ✅ |
| Wrong network warning with one-click switch | ✅ |
| Responsive UI across screen sizes | ✅ |
| TypeScript strict mode, ESLint clean | ✅ |

---

## Resources

- [UGF Docs](https://universalgasframework.com/docs)
- [UGF Testnet Quickstart](https://universalgasframework.com/docs/testnet)
- [TYI Mock USD Faucet](https://universalgasframework.com/faucets)
- [UGF SDK on npm](https://www.npmjs.com/package/@tychilabs/ugf-testnet-js)
- [UGF SDK GitHub](https://github.com/TychiWallet/ugf-testnet-js)
- [Base Sepolia Explorer](https://sepolia.basescan.org)
- [Tychi Telegram](https://t.me/TychiCommunity)

---

*Built for the UGF Hackathon — May 2026*
