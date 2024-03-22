#!/usr/bin/env node
import { spawn } from 'node:child_process';
import { readFileSync } from 'node:fs';
import fetch from 'node-fetch';
import clipboard from 'clipboardy';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

// Template
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const template = readFileSync(path.join(__dirname, 'template.txt'), 'utf-8');

// Get git diff
const gitDiff = spawn('git', ['diff', '--staged']);
let diff = '';
gitDiff.stdout.on('data', (data) => {
  diff += data.toString();
});

gitDiff.on('close', async () => {
  // Replace {clipboard} with git diff output
  const content = template.replace('{clipboard}', diff);

  // Extract site from file path
  const gitPrefix = spawn('git', ['rev-parse', '--show-prefix']);
  let site = '';
  gitPrefix.stdout.on('data', (data) => {
    site = data.toString().trim().split('/')[1] || '';
  });

  gitPrefix.on('close', async () => {
    // Make request to OpenAI API
    const requestData = {
      model: 'gpt-4',
      messages: [{ role: 'user', content }],
    };

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify(requestData),
    });

    const data = await response.json();

    // Extract commit message from API response
    const commitMessage = data.choices[0].message.content;

    // Replace site placeholder with actual site if present
    const finalCommitMessage = commitMessage.replace(/\[Site\]/g, site);

    // Copy commit message to clipboard
    await clipboard.write(finalCommitMessage);

    console.log('=======================================');
    console.log(finalCommitMessage);
    console.log('=======================================');
    console.log('\nCommit message copied to clipboard.');
  });
});
