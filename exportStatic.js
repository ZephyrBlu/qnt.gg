(async () => {
    const fs = require('fs').promises;
    const { execSync } = require('child_process');
    const CSS_PATH = '_next/static/css';
    const OUTPUT_DIR = 'deploy';
    const BUCKET = 'qnt.gg';

    const generatedFiles = await fs.readdir('out');
    const staticHtmlFiles = generatedFiles.filter((name) => (
        name.slice(-5) === '.html' && name !== '404.html'
    ));

    const createDir = async (dir) => {
        try {
            await fs.access(dir);
            await fs.rmdir(dir, { recursive: true });
        } catch {
            // do nothing
        }
        await fs.mkdir(dir, { recursive: true });
    };

    await createDir(OUTPUT_DIR);

    Promise.all(staticHtmlFiles.map(async (name) => {
        const noExt = name === 'index.html' ? name : name.slice(0, -5);
        const file = await fs.readFile(`out/${name}`);
        await fs.writeFile(`${OUTPUT_DIR}/${noExt}`, file);
    })).then(async () => {
        const deployFiles = await fs.readdir(OUTPUT_DIR);
        console.log('Deploying files:', deployFiles);

        console.log('\nChecking bucket');
        const bucketFiles = execSync(`gsutil ls gs://${BUCKET}`).toString();
        console.log('Found:', bucketFiles);
        if (bucketFiles) {
            console.log('Deleting files');
            execSync(`gsutil rm -r gs://${BUCKET}/*`);
        }

        console.log('\nUploading files');
        execSync(`gsutil -h "Content-Type:text/html" cp ${OUTPUT_DIR}/* gs://${BUCKET}`)
    }).then(async () => {
        await createDir(`${OUTPUT_DIR}/${CSS_PATH}`);
        const staticCssFiles = await fs.readdir(`out/${CSS_PATH}`);

        Promise.all(staticCssFiles.map(async (name) => {
            const file = await fs.readFile(`out/${CSS_PATH}/${name}`);
            await fs.writeFile(`${OUTPUT_DIR}/${CSS_PATH}/${name}`, file);
        })).then(async () => {
            const deployFiles = await fs.readdir(`${OUTPUT_DIR}/${CSS_PATH}`);
            console.log('Deploying files:', deployFiles);
            console.log('\nUploading files');
            execSync(`gsutil cp ${OUTPUT_DIR}/${CSS_PATH}/*.css gs://${BUCKET}/${CSS_PATH}/`)
        });
    });
})();
