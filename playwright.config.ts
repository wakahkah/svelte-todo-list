import type { PlaywrightTestConfig } from '@playwright/test';

const config: PlaywrightTestConfig = {
	retries: process.env.CI ? 2 : 0,
	webServer: {
		command: 'npm run build && npm run preview',
		port: 4173
	},
	use: {
		trace: 'on-first-retry', // record traces on first retry of each test
	  },
	testDir: 'tests'
};

export default config;
