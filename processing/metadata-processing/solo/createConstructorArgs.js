const fs = require("fs");
const { join } = require("path");

const { artists } = require("../artists");
const { premint } = require("../premint");

(async () => {
    const metadataRawDir = join(__dirname, "metadata", "raw");

    const fileContents = fs.readFileSync(
        `${metadataRawDir}/manifest.json`,
        "utf8"
    );

    const manifest = JSON.parse(fileContents);
    const addressMapping = Object.entries(manifest).reduce(
        (acc, [key, value]) => {
            return {
                ...acc,
                [value]: {
                    tokenId: key,
                    artistAddress: artists[value],
                },
            };
        },
        {}
    );

    // Log out two parallel arrays of token ids and artist addresses
    console.log("artist seed");
    console.log(
        Object.values(addressMapping).reduce(
            ([tokenIds, artistAddresses], value) => {
                return [
                    [...tokenIds, value.tokenId],
                    [...artistAddresses, value.artistAddress],
                ];
            },
            [[], []]
        )
    );

    console.log("premint seed");
    console.log(
        Object.entries(premint).reduce(
            ([premintTokenids, premintAddresses], [address, tokenId]) => {
                return [
                    [...premintTokenids, tokenId],
                    [...premintAddresses, address],
                ];
            },
            [[], []]
        )
    );
})();
