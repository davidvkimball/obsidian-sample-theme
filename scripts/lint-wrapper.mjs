#!/usr/bin/env node

/**
 * Stylelint wrapper that adds helpful success messages
 */

import { spawn } from 'child_process';
import process from 'process';

const args = process.argv.slice(2);
const hasFix = args.includes('--fix');

// Run Stylelint
const stylelint = spawn('npx', ['stylelint', '*.css', ...args], {
	stdio: 'inherit',
	shell: true
});

stylelint.on('close', (code) => {
	if (code === 0) {
		const message = hasFix 
			? '\n✓ CSS linting complete! All issues fixed automatically.\n'
			: '\n✓ CSS linting passed! No issues found.\n';
		console.log(message);
		process.exit(0);
	} else {
		// Stylelint already printed errors, just exit with the code
		process.exit(code);
	}
});

