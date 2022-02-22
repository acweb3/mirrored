const fs = require("fs");
const { join } = require("path");
const { promisify } = require("util");

const asyncReaddir = promisify(fs.readdir);
const asyncCopyFile = promisify(fs.copyFile);
const asyncWriteFile = promisify(fs.writeFile);

const TEMP_FILE_PLACEHOLDER = ".placeholder";
const TEMP_DIR_PLACEHOLDER = "__TEMP__";

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
                const [_reflection, indexExtension] = fileName.split(" ");
                const [index] = indexExtension.split(".");
                return index;
            });

            return indexA - indexB;
        });

    await Promise.all(
        files.map(async (file, i) => {
            const sanitizedJpgName = `Reflection #${i + 1}`;

            await asyncCopyFile(
                join(__dirname, "images", "raw", file),
                `${imageOutdir}/${sanitizedJpgName}.jpg`
            );

            await asyncWriteFile(
                `${metadataOutdir}/${i}`,
                JSON.stringify(
                    {
                        name: sanitizedJpgName,
                        description: `Welcome to Mirrored, a world of never ending sunsets and sunrises to get lost in. Mint your own endless sky below and enjoy your stay 🤍 #${
                            i + 1
                        }/80`,
                        attributes: [],
                        image: `${TEMP_DIR_PLACEHOLDER}/Reflection%20%23${
                            i + 1
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
