const { config } = require("../config");
const { artistSeed } = require("../seed");

const [, artistAddresses] = artistSeed;

async function main() {
	const MirroredCollab = await hre.ethers.getContractFactory(
		"MirroredCollab"
	);
	const deploymentData = MirroredCollab.interface.encodeDeploy([
		config.ipfsURL,
		artistAddresses,
	]);
	const estimatedGas = await ethers.provider.estimateGas({
		data: deploymentData,
	});

	console.log({
		estimatedGas,
	});

	const mirroredCollab = await MirroredCollab.deploy(
		config.ipfsURL,
		artistAddresses
	);

	console.log(mirroredCollab);

	await mirroredCollab.deployed();

	console.log("test deployed to:", test.address);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
