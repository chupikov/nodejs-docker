/**
 * HTTP server for development purposes only.
 * PLEASE NEVER USE THIS SERVER FOR PRODUCTION!
 *
 * @author Yaroslav Chupikov <https://www.mirasoltek.com/>
 * @copyright (C) 2023 Yaroslav Chupikov <https://www.mirasoltek.com/>
 * @version 1.0.0
 */

import express from 'express';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

(() => {
    const __filename = fileURLToPath(import.meta.url),
        __dirname = path.dirname(__filename),
        // __root = path.dirname(__dirname),
        __root = __dirname,
        __public = `${__root}/public`,
        configFile = `${__dirname}${path.sep}server.json`,
        filesystem = {
            filename: __filename,
            dirname: __dirname,
            root: __root,
            public: __public,
            config: configFile,
        },
        defaults = {
            version: "0.1.0",
            host: "localhost",
            port: {
                internal: 8080,
                external: 80,
            },
            public: __public,
        }
    ;

    let config = {};

    try {
        const data = fs.readFileSync(configFile, 'utf8');
        config = JSON.parse(data);
    } catch (err) {
        console.error(`Server config file not found: ${configFile}`);
    }

    for (let key in defaults) {
        if (typeof config[key] === "undefined") {
            config[key] = defaults[key];
        }
    }

    for (let p in filesystem) {
        config.public = config.public.replace(`__${p}`, filesystem[p]);
    }

    const app = express();

    app.use(express.static(config.public));

    app.listen(config.port.internal, () => {
        console.log("\nDev server for TabURL Customazer Website.");
        console.log(`SERVER URL: http://${config.host}` + (config.port.external != 80 ? `:${config.port.external}` : "") + "/");
        console.log(`Internal port: ${config.port.internal}`);
        console.log(`Server version: ${defaults.version}`);
        console.log(`Config version: ${config.version}`);
        console.log(`Public directory: "${config.public}".`);
        console.log("Working directory: \"" + process.cwd() + "\" (where server started)");
        console.log("\nFile system:");
        console.log(filesystem);
        console.log("\nConfig:");
        console.log(config);
        console.log("\nType \"Ctrl+C\" to stop the server.\n");
    });
})();
