const fs = require('fs-extra');
const concat = require('concat');
(async function build() {
    const filesES2015 = [
        './dist/spaceXLaunchPrograms/browser/runtime-es2015.js',
        './dist/spaceXLaunchPrograms/browser/polyfills-es2015.js',
        './dist/spaceXLaunchPrograms/browser/scripts.js',
        './dist/spaceXLaunchPrograms/browser/main-es2015.js'
    ];
    const filesES5 = [
        './dist/spaceXLaunchPrograms/browser/runtime-es5.js',
        './dist/spaceXLaunchPrograms/browser/polyfills-es5.js',
        './dist/spaceXLaunchPrograms/browser/scripts.js',
        './dist/spaceXLaunchPrograms/browser/main-es5.js'
    ];

    await fs.ensureDir('app-element');

    await concat(filesES2015, 'app-element/spaceXApp-es2015.js');
    await concat(filesES5, 'app-element/spaceXApp-es5.js');

    await fs.copyFile('./dist/spaceXLaunchPrograms/browser/styles.css', 'app-element/styles.css');
    await fs.copyFile('./dist/spaceXLaunchPrograms/browser/manifest.webmanifest', 'app-element/manifest.webmanifest');
    await fs.copyFile('./dist/spaceXLaunchPrograms/browser/ngsw-worker.js', 'app-element/ngsw-worker.js');
    await fs.copyFile('./dist/spaceXLaunchPrograms/browser/ngsw.json', 'app-element/ngsw.json');
    await fs.copyFile('./dist/spaceXLaunchPrograms/browser/safety-worker.js', 'app-element/safety-worker.js');
    await fs.copyFile('./dist/spaceXLaunchPrograms/browser/worker-basic.min.js', 'app-element/worker-basic.min.js');
    
    await fs.copy('./dist/spaceXLaunchPrograms/browser/assets/', 'app-element/assets/' );
    
})();