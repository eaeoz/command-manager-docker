const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Set environment to disable code signing
const env = {
  ...process.env,
  CSC_IDENTITY_AUTO_DISCOVERY: 'false',
  WIN_CSC_LINK: '',
  CSC_FOR_PULL_REQUEST: 'true'
};

console.log('Building portable version...');

try {
  // Build only portable target
  const output = execSync(
    'npx electron-builder --win portable --x64 --publish never',
    { 
      env, 
      cwd: __dirname,
      stdio: 'pipe'
    }
  );
  console.log(output.toString());
  console.log('Build complete!');
  console.log('Check dist/ for output files');
} catch (err) {
  console.error('Build failed:', err.message);
  if (err.stdout) console.log(err.stdout.toString());
  if (err.stderr) console.error(err.stderr.toString());
}
