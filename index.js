const {buildFixtures} = require('./functions');

const DefaultOutputFolder = 'cypress/fixtures.out';
const DefaultFixturesFolder = 'cypress/fixtures';

module.exports = (on, config) => {
    const inputDir = config.fixturesFolder;
    const outputDir = config.fixturesOutputFolder || DefaultOutputFolder;

    buildFixtures(inputDir, config.env, outputDir);

    config.fixturesFolder = outputDir;
    return config;
}

// Used to debug this script directly in IDEs.
if (require.main === module) {
    buildFixtures(DefaultFixturesFolder, process.env, DefaultOutputFolder);
}
