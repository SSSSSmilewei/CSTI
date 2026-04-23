const fs = require('fs');
const path = require('path');
const dir = 'c:\\Users\\smile\\Downloads\\personal';
const files = fs.readdirSync(dir);
const result = {};

files.forEach(f => {
  if (!f.endsWith('.md')) return;
  const content = fs.readFileSync(path.join(dir, f), 'utf8');
  const chunks = content.split(/(?=# CSTI 人格报告：)/);
  
  chunks.forEach(chunk => {
    const titleMatch = chunk.match(/# CSTI 人格报告：(.*?) \(/);
    if (!titleMatch) return;
    const name = titleMatch[1].trim();
    if (result[name]) return;
    
    const quoteMatch = chunk.match(/> “([\s\S]*?)”/);
    const quote = quoteMatch ? quoteMatch[1].trim() : '';
    
    const subtitleMatch = chunk.match(/## (.*?)\n/);
    const subtitle = subtitleMatch ? subtitleMatch[1].trim() : '';

    let detailedContent = chunk;
    if (quoteMatch) {
      detailedContent = chunk.substring(quoteMatch.index + quoteMatch[0].length).trim();
    }
    
    result[name] = { quote, subtitle, detailedContent };
  });
});

fs.writeFileSync('c:\\Users\\smile\\Desktop\\cs-ideologies\\parsed_archetypes.json', JSON.stringify(result, null, 2));
console.log('Parsed successfully to parsed_archetypes.json');
