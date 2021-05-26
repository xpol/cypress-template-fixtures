const path = require('path');
const fs = require('fs');

const ensureDirSync = (dir) => {
    if (fs.existsSync(dir)) {
        return;
    }
    const parent = path.dirname(dir);

    if (!fs.existsSync(parent)) {
        ensureDirSync(parent);
    }

    fs.mkdirSync(dir);
}

const recursiveScanDirSync = (dir) => {
    const results = [];
    const files = fs.readdirSync(dir);
    for (let i = 0; i < files.length; i++) {
        const filename = path.join(dir, files[i]);
        const stat = fs.lstatSync(filename);
        if (stat.isDirectory()) {
            results.push(...scanDirSync(filename));
        } else {
            results.push(filename);
        }
    }
    return results;
}

const scanDirSync = (dir) => {
    return fs.existsSync(dir) ? recursiveScanDirSync(dir) : [];
}

const resolveVariables = (text, variables) => {
    return text.replace(/{{\s?([a-zA-Z_]\w+)\s?}}/g, (matched, captured) => {
        return captured in variables ? variables[captured] : matched;
    });
};

const buildFixtures = (inputDir, variables, outputDir) => {
    const textFiles = {
        '.json': true,
        '.js': true,
        '.coffee': true,
        '.html': true,
        '.txt': true,
        '.csv': true,
    };

    ensureDirSync(outputDir);
    for (const file of scanDirSync(inputDir)) {
        const to = file.replace(inputDir, outputDir);
        ensureDirSync(path.dirname(to));
        if (textFiles[path.extname(file)]) {
            let text = fs.readFileSync(file).toString();
            text = resolveVariables(text, variables);
            fs.writeFileSync(to, text);
        } else {
            fs.copyFileSync(file, to)
        }
    }
};

module.exports = {
    ensureDirSync,
    recursiveScanDirSync,
    scanDirSync,
    resolveVariables,
    buildFixtures,
}