import {defineConfig} from 'cypress';

export default defineConfig({
  numTestsKeptInMemory: 8,
  trashAssetsBeforeRuns: true,
  video: false,
  chromeWebSecurity: false,
  retries: {
    runMode: 1
  },
  e2e: {
    baseUrl: 'https://hackthefuture.bignited.be',
    testIsolation: false
  }
});
