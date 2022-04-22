const fs = require("fs");
const { join } = require("path");
const { promisify } = require("util");

const { TEMP_DIR_PLACEHOLDER } = require("./setImages");

const asyncReaddir = promisify(fs.readdir);
const asyncWriteFile = promisify(fs.writeFile);

const IPFS_DIR = "ipfs://QmV8sPeAmsMZGh6UgmFzt7usqLZ4krnSkRvFUMhiu8vgnC";

/**
 * Set IPFS URL within metadata
 */
(async () => {
    const metadataRawDir = join(__dirname, "metadata", "raw");
    const metadataDistDir = join(__dirname, "metadata", "dist");

    const files = await asyncReaddir(metadataRawDir);

    files.forEach(async (file) => {
        try {
            const fileContents = fs.readFileSync(
                `${metadataRawDir}/${file}`,
                "utf8"
            );

            await asyncWriteFile(
                `${metadataDistDir}/${file}`,
                fileContents.replace(TEMP_DIR_PLACEHOLDER, IPFS_DIR)
            );
        } catch (e) {
            console.log(e);
            console.log("ERROR");
            console.log(file);
        }
    });
})();
