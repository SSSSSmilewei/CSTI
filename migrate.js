import fs from 'fs';
import path from 'path';

// 1. Read the old JS files by stripping the 'questions =' parts and parsing JSON, or using eval.
const readOldJs = (filename, varName) => {
    const p = path.join('8values.github.io', filename);
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(new RegExp(`^\\s*${varName}\\s*=\\s*`), '');
    content = content.replace(/;\s*$/, '');
    // eval to get the object
    let obj;
    eval(`obj = ${content}`);
    return obj;
};

const oldQuestions = readOldJs('questions.js', 'questions');
const oldIdeologies = readOldJs('ideologies.js', 'ideologies');
const oldBadges = readOldJs('badges.js', 'badges');

// 2. Read the TS files, and replace English with Chinese.
// For questions.ts
let qTs = fs.readFileSync('src/data/questions.ts', 'utf8');
oldQuestions.forEach(q => {
    // replace q.question with q.question_zh
    // careful with quotes
    const engText = q.question.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const zhText = q.question_zh.replace(/"/g, '\\"');
    qTs = qTs.replace(new RegExp(`text:\\s*["']${engText}["']`), `text: "${zhText}"`);
});
fs.writeFileSync('src/data/questions.ts', qTs);

// For archetypes.ts
let aTs = fs.readFileSync('src/data/archetypes.ts', 'utf8');
oldIdeologies.forEach(i => {
    const engName = i.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const zhName = i.name_zh.replace(/"/g, '\\"');
    const engDesc = i.desc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const zhDesc = i.desc_zh.replace(/"/g, '\\"');
    
    aTs = aTs.replace(new RegExp(`name:\\s*["']${engName}["']`), `name: "${zhName}"`);
    aTs = aTs.replace(new RegExp(`description:\\s*["']${engDesc}["']`), `description: "${zhDesc}"`);
});
fs.writeFileSync('src/data/archetypes.ts', aTs);

// For badges.ts
let bTs = fs.readFileSync('src/data/badges.ts', 'utf8');
oldBadges.forEach(b => {
    const engName = b.name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const zhName = b.name_zh.replace(/"/g, '\\"');
    const engDesc = b.desc.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const zhDesc = b.desc_zh.replace(/"/g, '\\"');
    
    bTs = bTs.replace(new RegExp(`name:\\s*["']${engName}["']`), `name: "${zhName}"`);
    bTs = bTs.replace(new RegExp(`description:\\s*["']${engDesc}["']`), `description: "${zhDesc}"`);
});
fs.writeFileSync('src/data/badges.ts', bTs);

console.log('Migration complete');
