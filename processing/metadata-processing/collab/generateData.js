const fs = require("fs");
const { join } = require("path");
const { promisify } = require("util");

const asyncReadFile = promisify(fs.readFile);


(async () => {
    const data = await asyncReadFile('./data.tsv', 'utf8');
    const rows = data.split('\n');
    const parsed = rows.map(row => row.split('\t'));

    const f = parsed.reduce((acc, [artist, description, token]) => {
        return {
            ...acc,
            [token]: {
                artist,
                description
            }
        }
    }, {});

    console.log(f)
})();