const { config } = require("../config");
const { artistSeed } = require("../seed");

async function main() {
	const MirroredByCody = await hre.ethers.getContractFactory(
		"MirroredByCody"
	);
	const deploymentData = MirroredByCody.interface.encodeDeploy([
		config.ipfsURL,
		// artistAddresses,
	]);
	const estimatedGas = await ethers.provider.estimateGas({
		data: deploymentData,
	});

	console.log({
		estimatedGas,
	});

	const mirroredByCody = await MirroredByCody.deploy(config.ipfsURL);

	console.log(mirroredByCody);

	await mirroredByCody.deployed();

	console.log("test deployed to:", test.address);
}

main()
	.then(() => process.exit(0))
	.catch((error) => {
		console.error(error);
		process.exit(1);
	});
