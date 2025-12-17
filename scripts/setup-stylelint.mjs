#!/usr/bin/env node

/**
 * Setup Stylelint for Obsidian Theme
 * 
 * This script:
 * - Updates package.json with Stylelint devDependencies and scripts
 * - Generates .stylelintrc.json configuration file
 * - Generates .stylelintignore file
 * - Copies lint-wrapper.mjs for helpful linting success messages
 * 
 * Usage: node scripts/setup-stylelint.mjs
 */

import { readFileSync, writeFileSync, existsSync, unlinkSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const STYLELINT_DEPS = {
	"stylelint": "^15.11.0",
	"stylelint-config-recommended": "^13.0.0",
	"stylelint-no-unsupported-browser-features": "^7.0.0"
};

const STYLELINT_SCRIPTS = {
	"lint": "node scripts/lint-wrapper.mjs",
	"lint:fix": "node scripts/lint-wrapper.mjs --fix"
};

function generateLintWrapper() {
	return `#!/usr/bin/env node

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
			? '\\n✓ CSS linting complete! All issues fixed automatically.\\n'
			: '\\n✓ CSS linting passed! No issues found.\\n';
		console.log(message);
		process.exit(0);
	} else {
		// Stylelint already printed errors, just exit with the code
		process.exit(code);
	}
});
`;
}

function generateStylelintConfig(customRules = {}) {
	// Default configuration for Obsidian themes
	const defaultConfig = {
		"extends": ["stylelint-config-recommended"],
		"plugins": ["stylelint-no-unsupported-browser-features"],
		"rules": {
			"plugin/no-unsupported-browser-features": [
				true,
				{
					"browsers": ["last 10 Chrome versions", "last 3 iOS versions"],
					"ignore": ["css-masks"],
					"ignorePartialSupport": true
				}
			]
		}
	};
	
	// Merge custom rules with defaults (custom rules take precedence)
	const rules = { ...defaultConfig.rules, ...customRules };
	
	return {
		...defaultConfig,
		rules
	};
}

function generateStylelintIgnore() {
	return `node_modules/**
*.min.css
dist/**
build/**
scripts/**
`;
}

function migrateStylelintrc(stylelintrcPath) {
	try {
		const stylelintrcContent = readFileSync(stylelintrcPath, 'utf8');
		const stylelintrc = JSON.parse(stylelintrcContent);
		
		// Extract custom rules from existing config
		const customRules = stylelintrc.rules || {};
		
		console.log('✓ Found existing Stylelint config - migrating rules');
		
		return customRules;
	} catch (error) {
		if (error instanceof SyntaxError) {
			console.log('⚠ Warning: Stylelint config file is not valid JSON, using default rules');
		} else {
			console.log('⚠ Warning: Could not read Stylelint config file, using default rules');
		}
		return {};
	}
}

function setupStylelint() {
	// Check Node.js version (requires v14+, but v16+ recommended for security)
	// Stylelint 15.x supports Node.js 14+, but Node.js 14 is EOL
	// Requiring v16+ ensures security updates and compatibility with modern tooling
	const nodeVersion = process.version;
	const majorVersion = parseInt(nodeVersion.slice(1).split('.')[0]);
	if (majorVersion < 14) {
		console.error(`❌ Error: Node.js v14+ is required for Stylelint (found ${nodeVersion})`);
		console.error('Node.js v16+ is recommended for security and compatibility');
		console.error('Please upgrade Node.js from https://nodejs.org/');
		process.exit(1);
	}
	if (majorVersion < 16) {
		console.warn(`⚠ Warning: Node.js v16+ is recommended (found ${nodeVersion})`);
		console.warn('Node.js v14 is EOL and may have security vulnerabilities');
	}
	
	// Get the directory where this script is located
	const scriptDir = dirname(fileURLToPath(import.meta.url));
	// Resolve project root (one level up from scripts folder)
	const projectRoot = join(scriptDir, '..');
	const packageJsonPath = join(projectRoot, 'package.json');
	const stylelintConfigPath = join(projectRoot, '.stylelintrc.json');
	const stylelintIgnorePath = join(projectRoot, '.stylelintignore');
	const stylelintrcPath = join(projectRoot, '.stylelintrc');
	
	try {
		// Read package.json
		const packageJsonContent = readFileSync(packageJsonPath, 'utf8');
		const packageJson = JSON.parse(packageJsonContent);
		
		let updated = false;
		let customRules = {};
		
		// Check for existing Stylelint config and migrate rules
		if (existsSync(stylelintrcPath)) {
			customRules = migrateStylelintrc(stylelintrcPath);
		} else if (existsSync(stylelintConfigPath)) {
			customRules = migrateStylelintrc(stylelintConfigPath);
		}
		
		// Add or update Stylelint devDependencies
		if (!packageJson.devDependencies) {
			packageJson.devDependencies = {};
			updated = true;
		}
		
		for (const [dep, version] of Object.entries(STYLELINT_DEPS)) {
			if (!packageJson.devDependencies[dep] || packageJson.devDependencies[dep] !== version) {
				packageJson.devDependencies[dep] = version;
				updated = true;
				console.log(`✓ Added/updated devDependency: ${dep}@${version}`);
			}
		}
		
		// Add or update scripts
		if (!packageJson.scripts) {
			packageJson.scripts = {};
			updated = true;
		}
		
		for (const [script, command] of Object.entries(STYLELINT_SCRIPTS)) {
			const currentCommand = packageJson.scripts[script];
			if (!currentCommand || currentCommand !== command) {
				packageJson.scripts[script] = command;
				updated = true;
				if (currentCommand) {
					console.log(`✓ Updated script: ${script}`);
				} else {
					console.log(`✓ Added script: ${script}`);
				}
			}
		}
		
		// Generate .stylelintrc.json file
		let stylelintConfigUpdated = false;
		const config = generateStylelintConfig(customRules);
		const newConfig = JSON.stringify(config, null, '\t') + '\n';
		
		if (!existsSync(stylelintConfigPath)) {
			writeFileSync(stylelintConfigPath, newConfig, 'utf8');
			console.log('✓ Created .stylelintrc.json configuration file');
			stylelintConfigUpdated = true;
		} else {
			// Update existing file to ensure it has the correct config
			const existingContent = readFileSync(stylelintConfigPath, 'utf8');
			const existingConfig = JSON.parse(existingContent);
			
			// Check if config needs updating (simplified check)
			if (JSON.stringify(existingConfig, null, '\t') !== JSON.stringify(config, null, '\t')) {
				writeFileSync(stylelintConfigPath, newConfig, 'utf8');
				console.log('✓ Updated .stylelintrc.json configuration file');
				stylelintConfigUpdated = true;
			}
		}
		
		// Remove legacy .stylelintrc file after migration
		if (existsSync(stylelintrcPath) && stylelintrcPath !== stylelintConfigPath) {
			try {
				unlinkSync(stylelintrcPath);
				console.log('✓ Removed legacy .stylelintrc file (migrated to .stylelintrc.json)');
			} catch {
				console.log('⚠ Warning: Could not remove .stylelintrc file');
			}
		}
		
		// Generate .stylelintignore file
		let stylelintIgnoreUpdated = false;
		const ignoreContent = generateStylelintIgnore();
		
		if (!existsSync(stylelintIgnorePath)) {
			writeFileSync(stylelintIgnorePath, ignoreContent, 'utf8');
			console.log('✓ Created .stylelintignore file');
			stylelintIgnoreUpdated = true;
		} else {
			const existingContent = readFileSync(stylelintIgnorePath, 'utf8');
			if (existingContent !== ignoreContent) {
				writeFileSync(stylelintIgnorePath, ignoreContent, 'utf8');
				console.log('✓ Updated .stylelintignore file');
				stylelintIgnoreUpdated = true;
			}
		}
		
		// Generate and copy lint-wrapper.mjs if it doesn't exist or needs updating
		const lintWrapperPath = join(projectRoot, 'scripts', 'lint-wrapper.mjs');
		const lintWrapperSource = generateLintWrapper();
		let lintWrapperUpdated = false;
		
		// Ensure scripts directory exists
		const scriptsDir = join(projectRoot, 'scripts');
		if (!existsSync(scriptsDir)) {
			mkdirSync(scriptsDir, { recursive: true });
		}
		
		if (!existsSync(lintWrapperPath)) {
			writeFileSync(lintWrapperPath, lintWrapperSource, 'utf8');
			console.log('✓ Created scripts/lint-wrapper.mjs');
			lintWrapperUpdated = true;
		} else {
			// Update if content differs (in case of updates)
			const existingContent = readFileSync(lintWrapperPath, 'utf8');
			if (existingContent !== lintWrapperSource) {
				writeFileSync(lintWrapperPath, lintWrapperSource, 'utf8');
				console.log('✓ Updated scripts/lint-wrapper.mjs');
				lintWrapperUpdated = true;
			}
		}
		
		if (updated) {
			// Write back to package.json with proper formatting
			const updatedContent = JSON.stringify(packageJson, null, '\t') + '\n';
			writeFileSync(packageJsonPath, updatedContent, 'utf8');
			console.log('\n✓ package.json updated successfully!');
		}
		
		if (updated || stylelintConfigUpdated || stylelintIgnoreUpdated || lintWrapperUpdated) {
			console.log('\n✓ Stylelint setup complete!');
			console.log('\nNext steps:');
			console.log('  1. Run: npm install');
			console.log('  2. Run: npm run lint');
		} else {
			console.log('✓ Everything is already set up correctly!');
			console.log('  Run: npm run lint');
		}
		
	} catch (error) {
		if (error.code === 'ENOENT') {
			console.error('❌ Error: package.json not found in project root');
			process.exit(1);
		} else if (error instanceof SyntaxError) {
			console.error('❌ Error: package.json is not valid JSON');
			console.error(error.message);
			process.exit(1);
		} else {
			console.error('❌ Error:', error.message);
			process.exit(1);
		}
	}
}

setupStylelint();

