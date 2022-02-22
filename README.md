# Mirrored — Cody Mayer

This monorepo contains the source code for the mint page, auction site, ERC721 contracts, and metadata processing for Cody Mayer's Mirrored Project.

## Sections

*Auction* — An auction site associated with the [MirroredCollab](https://github.com/acweb3/mirrored/blob/main/contract/contracts/MirroredCollab.sol) contract.  This site is a gasless, dutch auction style site for 20 collaboration pieces.

*Mint* — A blind mint static site associated with the [Mirrored](https://github.com/acweb3/mirrored/blob/main/contract/contracts/Mirrored.sol) contract.

*Contract* — ERC721 contracts developed with Hardhat.  Tests written in chai.

*Processing* — Metadata processing for IPFS for solo and collab ERC721 contracts.

### Post-mortem

There are a couple things here that need fixing, but this project is now completed so we're not going to waste time addressing them:

  #### Auction
  - Apollo authentication on frontend needs to be fixed.  For whatever reason, following apollo docs did not properly store bearer token
  - Login should be persisted after refetch.  This was an overly cautious look on my end
  - Reusing the old mint was super sloppy, adding `.jsx` (as opposed to `.tsx`) to our codebase and a ton of unneeded dependencies.  That said, we needed to hack this in really last minute so cut'n'paste was maybe the best method forward here.
  - Apollo server subscriptions were not working.  This caused us to choose just refetching bids every X seconds.  In no way is this sustainable.
  - On new bid received, page scroll was thrown off.  This was super annoying and bad UX.
  - Winning bids were set manually to save gas.  Gasless bids was broadly a design mistake from the start, but manually setting these naturally caused a handful of error.s
  - Notification UX should have been dialed way up.  This is really the difference between this one off and a professional product.
  - Should have improved site metadata and made sharing more dynamic, e.g. linking to a specific piece.
 
  #### Mint
  - Deploying hardhat.consol to mainnet 😳... pretty unforgivable.
  - Haptic on mint should have been better.

  #### Across the monorepo
  - Should have made imports more consistent.  This was sort of annoying but things were made quickly.
  - Should have used a component library between Auction/Mint.
