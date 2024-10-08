const { defineConfig } = require('cypress')

module.exports = defineConfig({
    numTestsKeptInMemory: 8,
    trashAssetsBeforeRuns: true,
    video: false,
    chromeWebSecurity: false,
    retries: {
        runMode: 1
    },
    e2e: {
        // We've imported your old cypress plugins here.
        // You may want to clean this up later by importing these.
        setupNodeEvents(on, config) {

        },
        baseUrl: 'https://hackthefuture.bignited.be',
    }
})
