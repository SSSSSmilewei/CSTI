import fs from 'fs';
import path from 'path';

// Read the old JS files
const readOldJs = (filename, varName) => {
    const p = path.join('8values.github.io', filename);
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(new RegExp(`^\\s*${varName}\\s*=\\s*`), '');
    content = content.replace(/;\s*$/, '');
    let obj;
    eval(`obj = ${content}`);
    return obj;
};

const oldQuestions = readOldJs('questions.js', 'questions');
const oldIdeologies = readOldJs('ideologies.js', 'ideologies');
const oldBadges = readOldJs('badges.js', 'badges');

// Axis mapping
const mapAxis = (axis) => {
    if (axis === 'econ') return 'paradigm';
    if (axis === 'dipl') return 'system';
    if (axis === 'govt') return 'copyright';
    if (axis === 'scty') return 'evolution';
    return axis;
};

// 1. Generate questions.ts
let qTsContent = `import type { Question } from './types';\n\nexport const questions: Question[] = [\n`;
oldQuestions.forEach((q, idx) => {
    // find the dominant axis
    let dominantAxis = '';
    let val = 0;
    Object.keys(q.effect).forEach(k => {
        if (Math.abs(q.effect[k]) > Math.abs(val)) {
            val = q.effect[k];
            dominantAxis = mapAxis(k);
        }
    });
    
    qTsContent += `  { id: ${idx + 1}, text: "${q.question_zh.replace(/"/g, '\\"')}", effect: { axis: '${dominantAxis}', value: ${val} }`;
    if (q.triggerId) {
        qTsContent += `, triggerId: '${q.triggerId}'`;
    }
    qTsContent += ` },\n`;
});
qTsContent += `];\n`;
fs.writeFileSync('src/data/questions.ts', qTsContent);

// 2. Generate archetypes.ts
let aTsContent = `import type { Archetype } from './types';\n\nexport const archetypes: Archetype[] = [\n`;
oldIdeologies.forEach(i => {
    aTsContent += `  {
    name: "${i.name_zh.replace(/"/g, '\\"')}",
    description: "${i.desc_zh.replace(/"/g, '\\"')}",
    coordinates: { paradigm: ${i.stats.econ}, system: ${i.stats.dipl}, copyright: ${i.stats.govt}, evolution: ${i.stats.scty} }
  },\n`;
});
aTsContent += `];\n`;
fs.writeFileSync('src/data/archetypes.ts', aTsContent);

// 3. Generate badges.ts
let bTsContent = `import type { Badge } from './types';\n\nexport const badges: Badge[] = [\n`;
const iconMap = {
    '🦀': 'Crab',
    ':wq': 'TerminalSquare',
    '🤖': 'Bot',
    '🧹': 'Trash2',
    '🏴': 'Flag',
    '🗿': 'Landmark',
    '⚡': 'Zap',
    '⚛️': 'Atom',
    '🦄': 'Wand2',
    '🧙': 'Wand',
    '🐘': 'Database', // PHP elephant approximation
    '⇥': 'Space',
    '✅': 'CheckCircle2',
    '🌑': 'Moon',
    '💎': 'Gem',
    '🤸': 'Dumbbell',
    '🪟': 'LayoutDashboard',
    '🧼': 'Sparkles',
    '🌳': 'GitBranch',
    '🏗️': 'Building'
};

oldBadges.forEach(b => {
    const iconName = iconMap[b.icon] || 'Award';
    bTsContent += `  {
    id: '${b.id}',
    name: "${b.name_zh.replace(/"/g, '\\"')}",
    description: "${b.desc_zh.replace(/"/g, '\\"')}",
    iconName: '${iconName}'
  },\n`;
});
bTsContent += `];\n`;
fs.writeFileSync('src/data/badges.ts', bTsContent);

console.log('Generation complete');
