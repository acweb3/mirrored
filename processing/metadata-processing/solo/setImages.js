const fs = require("fs");
const { join } = require("path");
const { promisify } = require("util");

const asyncReaddir = promisify(fs.readdir);
const asyncCopyFile = promisify(fs.copyFile);
const asyncWriteFile = promisify(fs.writeFile);

const TEMP_FILE_PLACEHOLDER = ".placeholder";
const TEMP_DIR_PLACEHOLDER = "__TEMP__";
const OFFSET = 100;

/**
 * Remove spaces and set up metadata JSON object.
 */
(async () => {
    const rawImagesDir = join(__dirname, "images", "raw");
    const imageOutdir = join(__dirname, "images", "dist");
    const metadataOutdir = join(__dirname, "metadata", "raw");

    const files = (await asyncReaddir(rawImagesDir))
        .filter((file) => file !== TEMP_FILE_PLACEHOLDER)
        .sort((a, b) => {
            const [indexA, indexB] = [a, b].map((fileName) => {
                const [_reflection, indexExtension] = fileName.split(".");
                const [_reflectionX, index] =
                    indexExtension.split("reflection");
                return index;
            });

            return indexA - indexB;
        });

    await Promise.all(
        files.map(async (file) => {
            const [, n] = file.split("reflection");
            const [actualN] = n.split(".jpeg");
            const i = parseInt(actualN);
            console.log();
            console.log(`${file}: ${i}`);
            const sanitizedJpgName = `reflection${i + 1 + OFFSET}`;

            await asyncCopyFile(
                join(__dirname, "images", "raw", file),
                `${imageOutdir}/reflection${i + 1 + OFFSET}.jpg`
            );

            await asyncWriteFile(
                `${metadataOutdir}/${i}`,
                JSON.stringify(
                    {
                        name: `Reflection #${i + 1 + OFFSET}`,
                        // prettier-ignore
                        description: `Welcome to Mirrored, a world of never ending sunsets and to get lost in. Mint your own endless reflection below and enjoy your stay 🤍`,
                        attributes: [],
                        image: `${TEMP_DIR_PLACEHOLDER}/reflection${
                            i + 1 + OFFSET
                        }.jpg`,
                    },
                    null,
                    4
                )
            );

            return;
        })
    );
})();

module.exports = {
    TEMP_DIR_PLACEHOLDER,
};
