/**
 * Docker configuration for Node.js. Example Gulp file.
 * Please refer to 'README.md' for details.
 *
 * @author Yaroslav Chupikov <yaroslav@mirasoltek.com>
 * @version 0.1.0
 */
import gulp from 'gulp';

(() => {
    const INFO = "\n\
Docker configuration for Node.js.\n\
Example Gulp file.\n\
Version 0.1.0\n\
(C) 2023 Yaroslav Chupikov <https://www.mirasoltek.com/>\n\
\n\
IF YOU CAN SEE THIS MESSAGE THEN GULP INSTALLED AND WORKING FINE.\n\
\n\
Please refer to 'README.md' for details.\n\
";

    gulp.task('default', async function(){
        console.log(INFO);
    });
})();
