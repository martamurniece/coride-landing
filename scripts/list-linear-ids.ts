import { LinearClient } from '@linear/sdk';
import { readFileSync } from 'fs';
import { resolve } from 'path';

// Read LINEAR_API_KEY from .env.local
const envPath = resolve(import.meta.dirname, '..', '.env.local');
const envFile = readFileSync(envPath, 'utf-8');
const apiKey = envFile
  .split('\n')
  .find((l) => l.startsWith('LINEAR_API_KEY='))
  ?.split('=')
  .slice(1)
  .join('=')
  .trim();

if (!apiKey) {
  console.error('LINEAR_API_KEY not found in .env.local');
  process.exit(1);
}

const linear = new LinearClient({ apiKey });

async function main() {
  const teams = await linear.teams();
  for (const team of teams.nodes) {
    console.log(`\nTeam: ${team.name}`);
    console.log(`  Key:  ${team.key}`);
    console.log(`  UUID: ${team.id}`);

    const projects = await team.projects();
    if (projects.nodes.length === 0) {
      console.log('  Projects: (none)');
    } else {
      console.log('  Projects:');
      for (const project of projects.nodes) {
        console.log(`    - ${project.name}`);
        console.log(`      UUID: ${project.id}`);
      }
    }
  }
}

main().catch((err) => { console.error(err); process.exit(1); });
