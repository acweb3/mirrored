const fs = require("fs");
const { join } = require("path");
const { promisify } = require("util");

const asyncReaddir = promisify(fs.readdir);
const asyncCopyFile = promisify(fs.copyFile);
const asyncWriteFile = promisify(fs.writeFile);

const TEMP_FILE_PLACEHOLDER = ".placeholder";
const TEMP_DIR_PLACEHOLDER = "__TEMP__";

const artistData = {
    0: {
        artist: "Mirrored X Brian Toups",
        description: "Stars being forged in the burning heart of Carina.",
    },
    1: {
        artist: "Mirrored X Casara Moon",
        description:
            "Captured this from the top of a mountain in Glacier National Park, Montana. We got caught in one of the strongest and coldest windstorms, but once we saw this sky light up we stuck it out and stayed till the sun set.",
    },
    2: {
        artist: "Mirrored X Chad Torkelsen",
        description:
            "I took a photo of this sky while on a canoe in the middle of the Columbia river. 15 minutes after this photo we were being pelted with hail as we desperately paddled for shore.",
    },
    3: {
        artist: "Mirrored X Courtney Wilson",
        description:
            "A deep pink and blue sunset captured in the deserts of Arizona. This area continues to bring me peace and delivers beautiful sunsets on a seemingly weekly basis.",
    },
    4: {
        artist: "Mirrored X Emilie Hofferber",
        description: "A sky that felt like falling in love.",
    },
    5: {
        artist: "Mirrored X Eric Kerr",
        description:
            "As we peaked out of our frozen vehicles in the morning, we realized the most exciting cloud formation was right above our heads.  We ran over to the ledge, waited for the light begin to graze the clouds, and once the orange hues touched the clouds, we all knew we were about to witness one of the most beautiful, and memorable sunsets of our lives.",
    },
    6: {
        artist: "Mirrored X Jakob LR",
        description:
            "There a type of adrenaline rush that comes right before a sunset is about to ignite. The soft gradient of light turns into a display of pink and red tones as the sun drips behinds the horizon. Chasing light like this is why I continually pick up a camera day after day",
    },
    7: {
        artist: "Mirrored X James Piper",
        description:
            "A simply mind blowing Christmas morning sunrise over the city of San Francisco with these rare mamatus clouds that glowed with the early colors of the morning. ",
    },
    8: {
        artist: "Mirrored X Jenna Dixon",
        description:
            "Some nights we dream in technicolor! A rare encounter with lady aurora dancing in the heart of the Canadian Rockies.",
    },
    9: {
        artist: "Mirrored X Jessica Moore",
        description:
            "On the edge of the unknown, where only stillness and Mother Nature’s majestic fury exist, is where one goes to discover themselves...  Captured near McLean, TX - May 16th, 2017 by artist Jessica Moore",
    },
    10: {
        artist: "Mirrored X Joelle LB",
        description:
            "Sunrise over 3 sisters in the Canadian rockies. A simple orange and yellow glow over the peaks made this a morning I won’t forget soon. ",
    },
    11: {
        artist: "Mirrored X Jonny Roams",
        description:
            "A long time goal of mine has been to capture the entire arc of the milkyway galaxy and during the early season and in April 2021 I finally made that happen. I had to plan around the moon and weather patterns to make sure the sky would be completely dark and free of clouds across the entire 180 degree frame. This is the result of 38 individual frames (13 frames stacked 3 times for noise reduction).",
    },
    12: {
        artist: "Mirrored X Justin Snead",
        description:
            "We live in a world where reality and illusions often intertwine, creating the perfect storm of chaos upon our minds. ",
    },
    13: {
        artist: "Mirrored X Kara Captured",
        description:
            "This memorable sky was captured during a September sunset on Cape Cod with someone special.",
    },
    14: {
        artist: "Mirrored X Kristopher Shinn",
        description:
            "That sunset was at Cannon Beach, Oregon, one of my favorite places on Earth. It was one of those sunsets that was an absolute showcase of natures beauty, all the way til sundown.",
    },
    15: {
        artist: "Mirrored X Kenneth Lerose",
        description:
            "Somewhere down a dirt road in central Oregon I had set up camp minutes before a wicked storm rolled through. After a huge double rainbow and an intense thunder and lightning storm, light began to filter in from the horizon. Thus allowing the last bit of glow to turn these gloriously rare puffs aka mammatus clouds pink in the sky. Mother Nature sure has a way of flexing her power and keeping me coming back for more.",
    },
    16: {
        artist: "Mirrored X Lori Grace",
        description:
            "As the storm drifted over me and into the valley to my east, a dazzling rainbow appeared and I captured this shot of a lightning bolt parallel the double rainbow. I was soaked to the bone after this but didn't care. I knew I'd caught a rare moment.",
    },
    17: {
        artist: "Mirrored X Rachel Stewart",
        description:
            "Natures brushstrokes one windless winter morning left me in absolute awe at how incredibly talented our Mother Earth is, and how lucky we are to be graced with her presence,  Shot in Queenstown , New Zealand",
    },
    18: {
        artist: "Mirrored X Ryan Newburn",
        description:
            "This Aurora danced across the sky during one of the strongest solar storms Iceland has seen in years. I shot this alongside spectators witnessing the aurora for the first time and to see the awe in their glowing green faces and hear their cries of joy made the night enchantingly perfect.",
    },
    19: {
        artist: "Mirrored X John Weatherby",
        description:
            "On the tale end of an NYC visit, I made my way out for a sunset shoot at a favorite spot. The conditions weren’t great so I went to call the Uber but then I saw clouds start to come over the skyline right as the sun was setting, catching them vibrant gold and pink hues. I decided to wait and proceeded to watch the whole sky fill with these clouds over Manhattan. Barely made it to my flight that night as the gate closed, but completely worth the stress.",
    },
};

/**
 * Remove spaces and set up metadata JSON object.
 */
(async () => {
    const rawImagesDir = join(__dirname, "images", "raw");
    const imageOutdir = join(__dirname, "images", "dist");
    const metadataOutdir = join(__dirname, "metadata", "raw");

    const files = (await asyncReaddir(rawImagesDir)).filter(
        (file) => file !== TEMP_FILE_PLACEHOLDER
    );

    const manifest = {};

    await Promise.all(
        files.map(async (file, i) => {
            await asyncCopyFile(
                join(__dirname, "images", "raw", file),
                `${imageOutdir}/${i}.jpg`
            );

            const [artistName] = file.split(".");
            await asyncWriteFile(
                `${metadataOutdir}/${i}.json`,
                JSON.stringify(
                    {
                        name: artistData[i].artist,
                        description: artistData[i].description,
                        attributes: [],
                        image: `${TEMP_DIR_PLACEHOLDER}/${i}.jpg`,
                    },
                    null,
                    4
                )
            );

            manifest[i] = artistName;

            return;
        })
    );

    await asyncWriteFile(
        `${metadataOutdir}/manifest.json`,
        JSON.stringify(manifest, null, 4)
    );
})();

module.exports = {
    TEMP_DIR_PLACEHOLDER,
};
