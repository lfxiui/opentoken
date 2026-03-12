import { readFileSync, readdirSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { parse } from 'yaml';
import { PlatformSchema } from '@opentoken/shared';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataDir = resolve(__dirname, '../data/platforms');

let hasErrors = false;

const files = readdirSync(dataDir).filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));
console.log(`Validating ${files.length} platform files...\n`);

for (const file of files) {
  const raw = readFileSync(resolve(dataDir, file), 'utf-8');
  const data = parse(raw);

  const result = PlatformSchema.safeParse(data);
  if (result.success) {
    console.log(`  ✅ ${file} - ${result.data.name}`);
  } else {
    console.error(`  ❌ ${file}:`);
    for (const issue of result.error.issues) {
      console.error(`     ${issue.path.join('.')}: ${issue.message}`);
    }
    hasErrors = true;
  }
}

console.log();
if (hasErrors) {
  console.error('Validation failed!');
  process.exit(1);
} else {
  console.log('All files valid!');
}
