const chai = require("chai");
const { solidity } = require("ethereum-waffle");

const { config } = require("../config");
const { soloSeed } = require("../seed");

chai.use(solidity);

const { expect } = chai;
describe("MirroredByCodyByCody contract", () => {
	let MirroredByCody;
	let hardhatToken;
	let owner;
	let signers;

	beforeEach(async () => {
		MirroredByCody = await ethers.getContractFactory("MirroredByCody");
		[owner, ...signers] = await ethers.getSigners();

		hardhatToken = await MirroredByCody.deploy(config.ipfsURL);
	});

	describe("Deployment", async () => {
		it("should set the right owner", async () => {
			const ownerAddress = await hardhatToken.owner();
			expect(ownerAddress).to.equal(owner.address);
		});

		it("should assign the total supply of tokens to owner", async () => {
			const ownerBalance = await hardhatToken.balanceOf(owner.address);
			const totalSupply = await hardhatToken.totalSupply();
			expect(ownerBalance).to.deep.equal(totalSupply);
		});
	});

	describe("Blind Mint", async () => {
		it("should not blind mint more than limit", async () => {
			await Promise.all(
				[...Array(2)].map(async (x, i) => {
					return await hardhatToken.blindMint(false, {
						value: ethers.utils.parseEther("0.2"),
					});
				})
			);

			await expect(
				hardhatToken.blindMint(false, {
					value: ethers.utils.parseEther("0.2"),
				})
			).to.be.revertedWith("MAX_LIMIT_PER_BUYER");

			const totalSupplyAfter = await hardhatToken.totalSupply();
			expect(totalSupplyAfter).to.be.equal(2);
		});

		it("should blind mint 75", async () => {
			await hardhatToken.setSalesLimitPerUser(80);

			const totalSupplyBefore = await hardhatToken.totalSupply();
			expect(totalSupplyBefore).to.be.equal(0);

			await Promise.all(
				[...Array(69)].map(async (x, i) => {
					return await hardhatToken.blindMint(false, {
						value: ethers.utils.parseEther("0.2"),
					});
				})
			);

			const totalSupplyAfter = await hardhatToken.totalSupply();
			expect(totalSupplyAfter).to.be.equal(69);
		});

		it("should not blind mint more than 75", async () => {
			await hardhatToken.setSalesLimitPerUser(76);

			const totalSupplyBefore = await hardhatToken.totalSupply();
			expect(totalSupplyBefore).to.be.equal(0);

			await Promise.all(
				[...Array(75)].map(async (x, i) => {
					return await hardhatToken.blindMint(false, {
						value: ethers.utils.parseEther("0.2"),
					});
				})
			);

			await expect(
				hardhatToken.blindMint(false, {
					value: ethers.utils.parseEther("0.2"),
				})
			).to.be.revertedWith("MAX_REACHED");
		});

		it("should handle reserved tokens premint", async () => {
			await hardhatToken.setSalesLimitPerUser(75);
			await hardhatToken.setSweetAndy(owner.address);
			await hardhatToken.reserveToken(
				signers[0].address,
				3,
				ethers.utils.parseEther("0.2")
			);

			await Promise.all(
				[...Array(74)].map(async (x, i) => {
					return await hardhatToken.blindMint(false, {
						value: ethers.utils.parseEther("0.2"),
					});
				})
			);

			// console.log(await hardhatToken.tokenURI(3));
			await expect(
				hardhatToken.blindMint(false, {
					value: ethers.utils.parseEther("0.2"),
				})
			).to.be.revertedWith("MAX_REACHED");

			await expect(hardhatToken.tokenURI(3)).to.be.revertedWith(
				"TOKEN_DNE"
			);

			await hardhatToken.connect(signers[0]).blindMint(false, {
				value: ethers.utils.parseEther("0.2"),
			});

			expect(await hardhatToken.tokenURI(3)).to.be.equal(
				`${config.ipfsURL}3`
			);
		});

		it("should handle all regular premints", async () => {
			await hardhatToken.setSalesLimitPerUser(80);

			const totalSupplyBefore = await hardhatToken.totalSupply();
			expect(totalSupplyBefore).to.be.equal(0);

			await Promise.all(
				signers.slice(0, 4).map(async (signer) => {
					await hardhatToken.connect(signer).blindMint(false, {
						value: ethers.utils.parseEther("0.2"),
					});
				})
			);

			await Promise.all(
				[...Array(24)].map(async (x, i) => {
					return await hardhatToken.blindMint(false, {
						value: ethers.utils.parseEther("0.2"),
					});
				})
			);

			await Promise.all(
				signers.slice(4, 9).map(async (signer) => {
					await hardhatToken.connect(signer).blindMint(false, {
						value: ethers.utils.parseEther("0.2"),
					});
				})
			);

			await Promise.all(
				[...Array(20)].map(async (x, i) => {
					return await hardhatToken.blindMint(false, {
						value: ethers.utils.parseEther("0.2"),
					});
				})
			);

			await Promise.all(
				signers.slice(9, 11).map(async (signer) => {
					await hardhatToken.connect(signer).blindMint(false, {
						value: ethers.utils.parseEther("0.2"),
					});
				})
			);

			await Promise.all(
				[...Array(20)].map(async (x, i) => {
					return await hardhatToken.blindMint(false, {
						value: ethers.utils.parseEther("0.2"),
					});
				})
			);

			const totalSupply = await hardhatToken.totalSupply();
			expect(totalSupply).to.be.equal(75);
		});
	});

	describe("Auction mint", async () => {
		it("mints a reserved token", async () => {
			await hardhatToken.setSweetAndy(owner.address);
			await hardhatToken.setIsBlindMint(false);
			await hardhatToken.reserveToken(
				signers[0].address,
				0,
				ethers.utils.parseEther("0.2")
			);

			await hardhatToken
				.connect(signers[0])
				.auctionMint(0, { value: ethers.utils.parseEther("0.2") });

			expect(await hardhatToken.ownerOf(0)).to.be.equal(
				signers[0].address
			);
		});
	});

	describe("Do both blind and auction mints", async () => {
		it("should blind mint 75 and then do an auction", async () => {
			await hardhatToken.setSalesLimitPerUser(85);

			const totalSupplyBefore = await hardhatToken.totalSupply();
			expect(totalSupplyBefore).to.be.equal(0);

			await Promise.all(
				[...Array(75)].map(async (x, i) => {
					return await hardhatToken.blindMint(false, {
						value: ethers.utils.parseEther("0.2"),
					});
				})
			);

			const totalSupplyAfter = await hardhatToken.totalSupply();
			expect(totalSupplyAfter).to.be.equal(75);

			await hardhatToken.nextDrop(false, 10, 0, false, 0, 0);
			await hardhatToken.setSweetAndy(owner.address);
			await hardhatToken.setIsBlindMint(false);
			await hardhatToken.reserveToken(
				signers[0].address,
				79,
				ethers.utils.parseEther("0.2")
			);

			await hardhatToken
				.connect(signers[0])
				.auctionMint(79, { value: ethers.utils.parseEther("0.2") });

			expect(await hardhatToken.ownerOf(79)).to.be.equal(
				signers[0].address
			);
		});
	});

	describe("Withdraw", async () => {
		it("can withdraw", async () => {
			await hardhatToken.setSalesLimitPerUser(75);

			const totalSupplyBefore = await hardhatToken.totalSupply();
			expect(totalSupplyBefore).to.be.equal(0);

			await Promise.all(
				[...Array(75)].map(async (x, i) => {
					return await hardhatToken.blindMint(false, {
						value: ethers.utils.parseEther("0.2"),
					});
				})
			);

			const totalSupply = await hardhatToken.totalSupply();
			expect(totalSupply).to.be.equal(75);

			const balanceBefore = await ethers.provider.getBalance(
				hardhatToken.address
			);
			expect(balanceBefore).to.be.equal(
				ethers.BigNumber.from("15000000000000000000")
			);

			const ownerBalanceBefore = await ethers.provider.getBalance(
				owner.address
			);

			await hardhatToken.withdraw();

			const balanceAfter = await ethers.provider.getBalance(
				hardhatToken.address
			);
			expect(balanceAfter).to.be.equal(ethers.BigNumber.from("0"));
			const devBalance = await ethers.provider.getBalance(
				"0x21868fCb0D4b262F72e4587B891B4Cf081232726"
			);
			expect(devBalance).to.be.equal(
				ethers.BigNumber.from("750000000000000000")
			);
		});
	});
});
