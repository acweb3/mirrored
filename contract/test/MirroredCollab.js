// const chai = require("chai");
// const { solidity } = require("ethereum-waffle");

// const { config } = require("../config");
// const { artistSeed, premintSeed } = require("../seed");

// chai.use(solidity);

// const { expect } = chai;
// const [, artistAddresses] = artistSeed;

// describe("MirroredCollab contract", () => {
// 	let MirroredCollab;
// 	let hardhatToken;
// 	let owner;
// 	let addrs;

// 	beforeEach(async () => {
// 		MirroredCollab = await ethers.getContractFactory("MirroredCollab");
// 		[owner, ...addrs] = await ethers.getSigners();
// 		hardhatToken = await MirroredCollab.deploy(
// 			"ipfs://QmTqr2PdMgtStxhVTqsvcYzF1saHyEZCMkuMcmtuPWLPeb/",
// 			artistAddresses
// 		);
// 	});

// 	describe("Deployment", async () => {
// 		it("should set the right owner", async () => {
// 			const ownerAddress = await hardhatToken.owner();
// 			expect(ownerAddress).to.equal(owner.address);
// 		});

// 		it("should assign the total supply of tokens to owner", async () => {
// 			const ownerBalance = await hardhatToken.balanceOf(owner.address);
// 			const totalSupply = await hardhatToken.totalSupply();
// 			expect(ownerBalance).to.deep.equal(totalSupply);
// 		});
// 	});

// 	describe("Transactions", async () => {
// 		it("should mint", async () => {
// 			await hardhatToken.setSweetAndy(owner.address);
// 			await hardhatToken.addToWonAuction(
// 				0,
// 				owner.address,
// 				ethers.utils.parseEther("0.2")
// 			);
// 			await hardhatToken.mint(0, {
// 				value: ethers.utils.parseEther("0.2"),
// 			});

// 			const tokenURI = await hardhatToken.tokenURI(0);
// 			expect(tokenURI).to.be.equal(
// 				"ipfs://QmTqr2PdMgtStxhVTqsvcYzF1saHyEZCMkuMcmtuPWLPeb/0"
// 			);
// 		});

// 		it("should not be able to mint with insufficient eth", async () => {
// 			await hardhatToken.setSweetAndy(owner.address);
// 			await hardhatToken.addToWonAuction(
// 				0,
// 				owner.address,
// 				ethers.utils.parseEther("0.4")
// 			);

// 			await expect(
// 				hardhatToken.mint(0, {
// 					value: ethers.utils.parseEther("0.2"),
// 				})
// 			).to.be.revertedWith("LOW_ETH");
// 		});

// 		it("should not be able to mint without winning bid", async () => {
// 			// await hardhatToken.setSweetAndy(owner.address);

// 			await expect(
// 				hardhatToken.mint(0, {
// 					value: ethers.utils.parseEther("0.2"),
// 				})
// 			).to.be.revertedWith("AUCTION_NOT_FINISHED");
// 		});

// 		it("should count the right number", async () => {
// 			await hardhatToken.setSweetAndy(owner.address);
// 			await hardhatToken.addToWonAuction(
// 				0,
// 				owner.address,
// 				ethers.utils.parseEther("0.2")
// 			);
// 			await hardhatToken.mint(0, {
// 				value: ethers.utils.parseEther("0.2"),
// 			});

// 			await Promise.all(
// 				addrs.slice(0, 4).map(async (addr, i) => {
// 					await hardhatToken.addToWonAuction(
// 						i + 1,
// 						addr.address,
// 						ethers.utils.parseEther("0.4")
// 					);
// 					await hardhatToken.connect(addr).mint(i + 1, {
// 						value: ethers.utils.parseEther("0.4"),
// 					});
// 				})
// 			);

// 			const tokenURI = await hardhatToken.tokenURI(3);
// 			expect(tokenURI).to.be.equal(
// 				"ipfs://QmTqr2PdMgtStxhVTqsvcYzF1saHyEZCMkuMcmtuPWLPeb/3"
// 			);

// 			const supply = await hardhatToken.totalSupply();
// 			expect(supply).to.be.equal(5);
// 		});

// 		it("should not mint a minted token", async () => {
// 			await hardhatToken.setSweetAndy(owner.address);
// 			await hardhatToken.addToWonAuction(
// 				0,
// 				owner.address,
// 				ethers.utils.parseEther("0.2")
// 			);
// 			await hardhatToken.mint(0, {
// 				value: ethers.utils.parseEther("0.2"),
// 			});

// 			await expect(
// 				hardhatToken.mint(0, {
// 					value: ethers.utils.parseEther("0.2"),
// 				})
// 			).to.be.revertedWith("TOKEN_ALLOCATED");
// 		});

// 		it("should not modify bids for minted token", async () => {
// 			await hardhatToken.setSweetAndy(owner.address);
// 			await hardhatToken.addToWonAuction(
// 				0,
// 				owner.address,
// 				ethers.utils.parseEther("0.2")
// 			);
// 			await hardhatToken.mint(0, {
// 				value: ethers.utils.parseEther("0.2"),
// 			});

// 			await expect(
// 				hardhatToken.addToWonAuction(
// 					0,
// 					owner.address,
// 					ethers.utils.parseEther("0.2")
// 				)
// 			).to.be.revertedWith("TOKEN_ALLOCATED");
// 		});
// 	});

// 	// describe("Typical sales flows", async () => {

// 	// 	it("should mint", async () => {
// 	// 		expect(
// 	// 			await hardhatToken.publicMint({
// 	// 				value: ethers.utils.parseEther("0.2"),
// 	// 			})
// 	// 		).to.emit(hardhatToken, "Transfer");

// 	// 		const totalSupply = await hardhatToken.totalSupply();
// 	// 		expect(totalSupply).to.be.equal(1);

// 	// 		const balance = await ethers.provider.getBalance(
// 	// 			hardhatToken.address
// 	// 		);
// 	// 		expect(balance).to.be.equal(
// 	// 			ethers.BigNumber.from("200000000000000000")
// 	// 		);
// 	// 	});

// 	it("should have all artists paid out", async () => {
// 		const artistAddressesTruncated = artistAddresses.slice(0, 5);
// 		const totalSupply = await hardhatToken.totalSupply();

// 		expect(totalSupply).to.be.equal(0);

// 		await hardhatToken.setSweetAndy(owner.address);
// 		await hardhatToken.addToWonAuction(
// 			0,
// 			owner.address,
// 			ethers.utils.parseEther("0.2")
// 		);
// 		await hardhatToken.mint(0, {
// 			value: ethers.utils.parseEther("0.2"),
// 		});

// 		await Promise.all(
// 			addrs.slice(0, 4).map(async (addr, i) => {
// 				await hardhatToken.addToWonAuction(
// 					i + 1,
// 					addr.address,
// 					ethers.utils.parseEther("0.2")
// 				);
// 				await hardhatToken.connect(addr).mint(i + 1, {
// 					value: ethers.utils.parseEther("0.2"),
// 				});
// 			})
// 		);

// 		const artistBalancesBefore = await Promise.all(
// 			artistAddressesTruncated.map(async (artistAddress) => {
// 				const balance = await ethers.provider.getBalance(artistAddress);
// 				return [artistAddress, balance];
// 			})
// 		);

// 		artistBalancesBefore.forEach(([artistAddress, balance]) => {
// 			expect(balance).to.be.equal(ethers.BigNumber.from("0"));
// 		});

// 		await hardhatToken.withdraw();

// 		const artistBalancesAfter = await Promise.all(
// 			artistAddressesTruncated.map(async (artistAddress) => {
// 				const balance = await ethers.provider.getBalance(artistAddress);
// 				return [artistAddress, balance];
// 			})
// 		);

// 		const devBalance = await ethers.provider.getBalance(
// 			"0xeb68669D321E1459900D83595818cE1313a4d90f"
// 		);

// 		artistBalancesAfter.forEach(([artistAddress, balance]) => {
// 			expect(balance).to.be.equal(
// 				ethers.BigNumber.from("90000000000000000")
// 			);
// 		});
// 	});
// });
