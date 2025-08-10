MintPass — NFT Ticketing MVP (Design System + React/Tailwind Spec)

Design tokens (exact values)
- Colors
  - Primary Dark: #0F1724
  - Accent Gradient: #6EE7B7 → #60A5FA
  - Accent Solid: #2563EB
  - Muted: #94A3B8
  - Background Light: #F8FAFC
  - Card White: #FFFFFF
  - Danger: #EF4444
  - Success: #10B981
- Typography
  - Headline: Poppins SemiBold / 32–48px
  - Subheader: Inter Medium / 18–24px
  - Body: Inter Regular / 14–16px
  - Mono: Roboto Mono / 13px
- Spacing
  - Base: 8px scale (8, 16, 24, 32…)
- Grid
  - Desktop: 12-col, 1200px max content width, 24px gutter
- Radius
  - Cards: 12px
  - Buttons: 8px
- Shadows
  - Subtle: 0 6px 18px rgba(2,6,23,0.06)
  - Lifted: 0 14px 40px rgba(2,6,23,0.08)

Tailwind mapping
- Headline: text-4xl md:text-5xl font-semibold tracking-tight text-[#0F1724]
- Subheader: text-lg text-muted-foreground
- Body: text-sm or text-base text-muted-foreground
- Accent Solid Button: bg-[#2563EB] hover:opacity-90 h-10/11 rounded-md
- Gradient underline: bg-[linear-gradient(90deg,#6EE7B7_0%,#60A5FA_100%)]
- Cards: rounded-xl border bg-white shadow-[0_6px_18px_rgba(2,6,23,0.06)]
- Lifted hover: translate-y-[-8px] shadow-[0_14px_40px_rgba(2,6,23,0.08)]
- Radius: rounded-xl (12px), rounded-md (8px)
- Focus: focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500

Components (React API + class hints)
- TopNavigation
  - Props: isAuthed?: boolean
  - Behavior: hover raise on “Create Event”; active tab gradient underline
  - Mobile: Sheet bottom menu
  - Classes: sticky top-0 backdrop-blur, border-b
- EventCard
  - 16:9 image, title/date/location, verified pill, price, tier pill, Book CTA
  - Hover: image scale 1.03, lift + shadow
- Event Details
  - Left hero, right tiers/perks
  - Tier rows show supply, price, reserve toggle (outline)
  - FAQ with accordion and easing
- AddAttendeesModal
  - Row: name, email (+ verify), age (optional), “create DID + email verify”
  - Inline validation; red highlight via aria-invalid
- CheckoutModal
  - Tabs: UPI/Card/Crypto
  - Proceed triggers MintModal
- MintModal
  - Stepper: Payment → Wallet → Minting → Success
  - Progress bar with animated coin; short confetti OK
  - Copy tx hash + explorer link
- TicketCard
  - Flip hint on hover (rotateY small), Show QR, Resell
- QRView
  - Full-screen QR, short token, owner email, Add to Wallet, Share, Report
  - Pulse ring animation (1.6s)
- ScannerView
  - Camera overlay, rectangle guide, success/fail states
  - Shows “Verifying… (cache/on-chain)” hints
- AdminWizard
  - Steps: Details → Tiers → Royalties/Resale → Schedule → Review & Deploy
  - Live preview pane
- Sales & Scan Logs
  - Tables with Export
- ResaleModal
  - Price input, fee/royalty preview, 3s confirm delay anti-accident

Motion guidelines (Framer Motion)
- General: 160–220ms ease cubic-bezier(.22,.9,.1,1)
- Modals: 320ms mount/unmount
- Hover: y: -6–12px + shadow fade
- Button press: scale 0.98 then back
- Mint sequence: progress coin slide (0.3s) per increment; small success burst
- QR pulse: 1.6s loop, low opacity ring
- Scanner success: scale 0.96 → 1, color flash to emerald

A11y & performance
- All interactive elements keyboard-focusable with visible focus ring
- WCAG AA contrast for text
- Alt text on images
- Lazy-loaded hero images via next/image sizes
- Skeleton loaders on Explore
- Mobile-first layouts, thumb-friendly buttons (h-11)
- PWA-friendly Scanner (camera permissions prompt, hardware acceleration enabled via video element)

Dev notes — Scanner caching strategy
- On scan, hit /api/verify with payload { tokenId, ownerEmail }
- In-memory cache TTL: 10–30s; if cache fresh and not used, return immediately (green), mark used
- Cache miss: simulate on-chain ownerOf fallback with ~2.5s delay, repopulate cache
- UI copy: “Verifying… (cache)” or “Verifying… (on-chain)”
- Do NOT hit RPC every scan; index chain events in backend for production

Implementation hints
- Wallet: integrate Wagmi/RainbowKit later; “Connect Wallet” button present
- Email/Magic Link: add API routes/providers; current UI simulates verification
- QR generation: qrcode.react (QRCodeCanvas)
- Scanning: jsqr from canvas frames via MediaDevices
- Royalties/resale: guard in UI; enforce in contracts/back-end
- Admin sidebar: shadcn/ui sidebar with collapsible icon variant (see code), per docs. [^1]

What’s included in this prototype
- Explore → Details → Add Attendees → Checkout → Mint → My Tickets → QR → Scanner
- Admin Wizard + Logs
- Resale flow modal with cap enforcement (UI)
- Settings/Profile shell

Next steps for production
- Replace mock minting and verify cache with real services/contracts
- Add authentication (email magic link) and role-based access for admin
- Connect payment providers (Razorpay, crypto)
- Implement custodial wallet mint (server) and on-chain mint (wallet)
- Add database for tickets, scans, sales; server cache layer (Redis-like)
