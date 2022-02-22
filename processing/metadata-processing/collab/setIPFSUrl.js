const fs = require("fs");
const { join } = require("path");
const { promisify } = require("util");

const { TEMP_DIR_PLACEHOLDER } = require("./setImages");

const asyncReaddir = promisify(fs.readdir);
const asyncWriteFile = promisify(fs.writeFile);

const MANIFEST_NAME = "manifest.json";
const IPFS_DIR = "ipfs://QmYkyGhz1CBoYU4sfvH6xzqCF4ycXEMmnDhFooF39utrVj";

/**
 * Set IPFS URL within metadata
 */
(async () => {
    const metadataRawDir = join(__dirname, "metadata", "raw");
    const metadataDistDir = join(__dirname, "metadata", "dist");

    const files = (await asyncReaddir(metadataRawDir)).filter(
        (file) => file !== MANIFEST_NAME
    );

    files.forEach(async (file) => {
        try {
            const fileContents = fs.readFileSync(
                `${metadataRawDir}/${file}`,
                "utf8"
            );

            const [fileName] = file.split(".json");
            await asyncWriteFile(
                `${metadataDistDir}/${fileName}`,
                fileContents.replace(TEMP_DIR_PLACEHOLDER, IPFS_DIR)
            );
        } catch (e) {
            console.log(e);
            console.log("ERROR");
            console.log(file);
        }
    });
})();
