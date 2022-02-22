const fs = require("fs");
const { join } = require("path");
const { promisify } = require("util");
const sharp = require("sharp");

const asyncReaddir = promisify(fs.readdir);

const PLACEHOLDER_NAME = ".placeholder";

(async () => {
	const rawImagesDir = join(__dirname, "images", "raw");
	const fuzzyOutputDir = join(__dirname, "images", "fuzzy");
	const outputDir = join(__dirname, "images", "dist");

	const files = (await asyncReaddir(rawImagesDir)).filter(
		(file) => file !== PLACEHOLDER_NAME
	);

	files.forEach(async (file, i) => {
		const fileName = join(__dirname, "images", "raw", file);

		await sharp(fileName)
			.resize({
				width: 500,
			})
			.jpeg({
				quality: 60,
			})
			.blur(30)
			.toFile(join(fuzzyOutputDir, `reflection${i}.jpeg`));
	});

	files.forEach(async (file, i) => {
		const fileName = join(__dirname, "images", "raw", file);

		await sharp(fileName)
			.resize({
				width: 500,
			})
			.jpeg({
				quality: 100,
			})
			.toFile(join(outputDir, `reflection${i}.jpeg`));
	});

	files.forEach(async (file, i) => {
		const fileName = join(__dirname, "images", "raw", file);

		await sharp(fileName)
			// .resize({
			// 	width: 500,
			// })
			// .jpeg({
			// 	quality: 100,
			// })
			.toFile(join(outputDir, `reflection${i}.jpeg`));
	});

	// const files = (await asyncReaddir(rawImagesDir))
	// 	.filter((file) => file !== PLACEHOLDER_NAME)
	// 	.sort((a, b) => {
	// 		const [indexA, indexB] = [a, b].map((fileName) => {
	// 			const [_reflection, indexExtension] = fileName.split(" ");
	// 			const [index] = indexExtension.split(".");
	// 			return index;
	// 		});

	// 		return indexA - indexB;
	// 	});

	// files.forEach(async (file, i) => {
	// 	const fileName = join(__dirname, "images", "raw", file);

	// 	await sharp(fileName)
	// 		.resize({
	// 			width: 200 + Math.floor(Math.random() * 25),
	// 		})
	// 		.jpeg({
	// 			quality: 40,
	// 		})
	// 		.toFile(join(outputDir, `reflection${i}.jpeg`));
	// });
})();
