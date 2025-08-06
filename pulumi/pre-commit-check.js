#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

function checkRequiredFiles() {
  console.log('📁 Required Files:');
  const files = [
    'Pulumi.yaml',
    'Pulumi.production.yaml', 
    'package.json',
    'index.ts',
    'tsconfig.json'
  ];

  let hasErrors = false;
  files.forEach(file => {
    const exists = fs.existsSync(file);
    console.log(`${exists ? '✅' : '❌'} ${file}`);
    if (!exists) hasErrors = true;
  });

  return hasErrors;
}

function checkWorkflowSecrets() {
  console.log('\n🔑 GitHub Workflow Secrets:');
  const workflowPath = '../.github/workflows/deploy-pulumi.yml';
  
  if (!fs.existsSync(workflowPath)) {
    console.log('❌ Workflow file not found');
    return true;
  }

  const workflow = fs.readFileSync(workflowPath, 'utf8');
  const secrets = workflow.match(/secrets\.([A-Z_]+)/g) || [];
  const uniqueSecrets = [...new Set(secrets.map(s => s.replace('secrets.', '')))];
  
  console.log('Required secrets from workflow:');
  uniqueSecrets.forEach(secret => console.log(`  - ${secret}`));
  
  let hasErrors = false;
  if (!uniqueSecrets.includes('PULUMI_CONFIG_PASSPHRASE')) {
    console.log('⚠️  Missing PULUMI_CONFIG_PASSPHRASE (needed for local state)');
    hasErrors = true;
  }

  return hasErrors;
}

function validateTypeScript() {
  console.log('\n🔧 TypeScript Validation:');
  try {
    require('child_process').execSync('npm run lint', { stdio: 'pipe', cwd: __dirname });
    console.log('✅ TypeScript compilation successful');
    return false;
  } catch (error) {
    console.log('❌ TypeScript compilation failed');
    return true;
  }
}

function main() {
  console.log('🔍 Pulumi Deployment Setup Check\n');

  const fileErrors = checkRequiredFiles();
  const secretErrors = checkWorkflowSecrets();
  const typeErrors = validateTypeScript();

  const hasErrors = fileErrors || secretErrors || typeErrors;
  console.log(`\n${hasErrors ? '❌ Issues found' : '✅ All checks passed'}`);
  
  process.exit(hasErrors ? 1 : 0);
}

main();