/**
 * Test script for the Docker configuration for Node.js.
 * Displays welcome message and list of environment variables.
 *
 * @author Yaroslav Chupikov <https://www.mirasoltek.com/>
 * @copyright (C) 2023 Yaroslav Chupikov <https://www.mirasoltek.com/>
 * @version 1.0.0
 */
(() => {
    const msg = "\
Hello buddy!\n\
Welcome to the Docker configuration for Node.js.\n\
Product page: https://github.com/chupikov/nodejs-docker\n\
";

    const env = Object.keys(process.env).sort().reduce(
        (a, key) => { 
          a[key] = process.env[key]; 
          return a;
        }, 
        {}
    );

    console.log(msg);
    printObject(env);

    function keyLength(array) {
        let width = 0;
        for (let key in array) {
            if (key.length > width) {
                width = key.length;
            }
        }
        return width;
    }

    function printObject(object) {
        const w = keyLength(env);
        for (let key in object) {
            console.log(key.padEnd(w, " ") + ` : ${object[key]}`);
        }
    }
})();
