// const chai = require("chai");
// const { solidity } = require("ethereum-waffle");

// const { config } = require("../config");
// const { soloSeed } = require("../seed");

// const [, premintTokenIds] = soloSeed;

// chai.use(solidity);

// const { expect } = chai;
// describe("Mirrored contract", () => {
// 	let Mirrored;
// 	let hardhatToken;
// 	let owner;
// 	let signers;

// 	beforeEach(async () => {
// 		Mirrored = await ethers.getContractFactory("Mirrored");
// 		[owner, ...signers] = await ethers.getSigners();

// 		hardhatToken = await Mirrored.deploy(
// 			config.ipfsURL,
// 			signers.slice(0, 11).map((addr) => addr.address),
// 			premintTokenIds
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
// 		it("should not blind mint more than limit", async () => {
// 			await Promise.all(
// 				[...Array(2)].map(async (x, i) => {
// 					return await hardhatToken.publicMint({
// 						value: ethers.utils.parseEther("0.2"),
// 					});
// 				})
// 			);

// 			await expect(
// 				hardhatToken.publicMint({
// 					value: ethers.utils.parseEther("0.2"),
// 				})
// 			).to.be.revertedWith("MAX_LIMIT_PER_BUYER");

// 			const totalSupplyAfter = await hardhatToken.totalSupply();
// 			expect(totalSupplyAfter).to.be.equal(2);
// 		});

// 		it("should blind mint 69", async () => {
// 			await hardhatToken.setSalesLimit(80);

// 			const totalSupplyBefore = await hardhatToken.totalSupply();
// 			expect(totalSupplyBefore).to.be.equal(0);

// 			await Promise.all(
// 				[...Array(69)].map(async (x, i) => {
// 					return await hardhatToken.publicMint({
// 						value: ethers.utils.parseEther("0.2"),
// 					});
// 				})
// 			);

// 			const totalSupplyAfter = await hardhatToken.totalSupply();
// 			expect(totalSupplyAfter).to.be.equal(69);
// 		});

// 		it("should not blind mint more than 69", async () => {
// 			await hardhatToken.setSalesLimit(80);

// 			const totalSupplyBefore = await hardhatToken.totalSupply();
// 			expect(totalSupplyBefore).to.be.equal(0);

// 			await Promise.all(
// 				[...Array(69)].map(async (x, i) => {
// 					return await hardhatToken.publicMint({
// 						value: ethers.utils.parseEther("0.2"),
// 					});
// 				})
// 			);

// 			await expect(
// 				hardhatToken.publicMint({
// 					value: ethers.utils.parseEther("0.2"),
// 				})
// 			).to.be.revertedWith("MAX_REACHED");
// 		});

// 		it("should handle regular premint", async () => {
// 			await hardhatToken.setSalesLimit(80);

// 			const totalSupplyBefore = await hardhatToken.totalSupply();
// 			expect(totalSupplyBefore).to.be.equal(0);

// 			await Promise.all(
// 				[...Array(69)].map(async (x, i) => {
// 					return await hardhatToken.publicMint({
// 						value: ethers.utils.parseEther("0.2"),
// 					});
// 				})
// 			);

// 			await hardhatToken.removeFromPremint(
// 				signers[2].address,
// 				premintTokenIds[2]
// 			);
// 			await hardhatToken.addToPremint(owner.address, premintTokenIds[2]);

// 			await expect(
// 				hardhatToken.tokenURI(premintTokenIds[2])
// 			).to.be.revertedWith("TOKEN_DNE");

// 			await hardhatToken.publicMint({
// 				value: ethers.utils.parseEther("0.2"),
// 			});

// 			await hardhatToken.tokenURI(premintTokenIds[2]);
// 			const totalSupply = await hardhatToken.totalSupply();
// 			expect(totalSupply).to.be.equal(70);
// 		});

// 		it("should handle all regular premints", async () => {
// 			await hardhatToken.setSalesLimit(80);

// 			const totalSupplyBefore = await hardhatToken.totalSupply();
// 			expect(totalSupplyBefore).to.be.equal(0);

// 			await Promise.all(
// 				signers.slice(0, 4).map(async (signer) => {
// 					await hardhatToken.connect(signer).publicMint({
// 						value: ethers.utils.parseEther("0.2"),
// 					});
// 				})
// 			);

// 			await Promise.all(
// 				[...Array(29)].map(async (x, i) => {
// 					return await hardhatToken.publicMint({
// 						value: ethers.utils.parseEther("0.2"),
// 					});
// 				})
// 			);

// 			await Promise.all(
// 				signers.slice(4, 9).map(async (signer) => {
// 					await hardhatToken.connect(signer).publicMint({
// 						value: ethers.utils.parseEther("0.2"),
// 					});
// 				})
// 			);

// 			await Promise.all(
// 				[...Array(20)].map(async (x, i) => {
// 					return await hardhatToken.publicMint({
// 						value: ethers.utils.parseEther("0.2"),
// 					});
// 				})
// 			);

// 			await Promise.all(
// 				signers.slice(9, 11).map(async (signer) => {
// 					await hardhatToken.connect(signer).publicMint({
// 						value: ethers.utils.parseEther("0.2"),
// 					});
// 				})
// 			);

// 			await Promise.all(
// 				[...Array(20)].map(async (x, i) => {
// 					return await hardhatToken.publicMint({
// 						value: ethers.utils.parseEther("0.2"),
// 					});
// 				})
// 			);

// 			const totalSupply = await hardhatToken.totalSupply();
// 			expect(totalSupply).to.be.equal(80);
// 		});

// 		it("premints can mint later", async () => {
// 			await hardhatToken.setSalesLimit(80);

// 			const totalSupplyBefore = await hardhatToken.totalSupply();
// 			expect(totalSupplyBefore).to.be.equal(0);

// 			await Promise.all(
// 				[...Array(69)].map(async (x, i) => {
// 					return await hardhatToken.publicMint({
// 						value: ethers.utils.parseEther("0.2"),
// 					});
// 				})
// 			);

// 			await expect(
// 				hardhatToken.publicMint({
// 					value: ethers.utils.parseEther("0.2"),
// 				})
// 			).to.be.revertedWith("MAX_REACHED");

// 			await Promise.all(
// 				signers.slice(0, 11).map(async (signer) => {
// 					await hardhatToken.connect(signer).publicMint({
// 						value: ethers.utils.parseEther("0.2"),
// 					});
// 				})
// 			);

// 			const totalSupply = await hardhatToken.totalSupply();
// 			expect(totalSupply).to.be.equal(80);
// 		});

// 		it("can withdraw", async () => {
// 			await hardhatToken.setSalesLimit(80);

// 			const totalSupplyBefore = await hardhatToken.totalSupply();
// 			expect(totalSupplyBefore).to.be.equal(0);

// 			await Promise.all(
// 				[...Array(69)].map(async (x, i) => {
// 					return await hardhatToken.publicMint({
// 						value: ethers.utils.parseEther("0.2"),
// 					});
// 				})
// 			);

// 			await Promise.all(
// 				signers.slice(0, 11).map(async (signer) => {
// 					await hardhatToken.connect(signer).publicMint({
// 						value: ethers.utils.parseEther("0.2"),
// 					});
// 				})
// 			);

// 			const totalSupply = await hardhatToken.totalSupply();
// 			expect(totalSupply).to.be.equal(80);

// 			const balanceBefore = await ethers.provider.getBalance(
// 				hardhatToken.address
// 			);
// 			expect(balanceBefore).to.be.equal(
// 				ethers.BigNumber.from("16000000000000000000")
// 			);

// 			const ownerBalanceBefore = await ethers.provider.getBalance(
// 				owner.address
// 			);

// 			await hardhatToken.withdraw();

// 			const balanceAfter = await ethers.provider.getBalance(
// 				hardhatToken.address
// 			);
// 			expect(balanceAfter).to.be.equal(ethers.BigNumber.from("0"));

// 			const ownerBalanceAfter = await ethers.provider.getBalance(
// 				owner.address
// 			);
// 			const devBalance = await ethers.provider.getBalance(
// 				"0x35FB16Db88Bd1A37EFe58E4A936456c15065f713"
// 			);
// 			expect(devBalance).to.be.equal(
// 				ethers.BigNumber.from("800000000000000000")
// 			);

// 			console.log({
// 				ownerBalanceBefore,
// 				ownerBalanceAfter,
// 			});
// 		});
// 	});
// });
