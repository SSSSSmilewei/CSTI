const fs = require('fs');
let archetypesText = fs.readFileSync('src/data/archetypes.ts', 'utf8');
const parsed = JSON.parse(fs.readFileSync('parsed_archetypes.json', 'utf8'));

const nameMap = {
  '机器本质主义': '机器本体论'
};

const regex = /\{\s*name:\s*"(.*?)",\s*description:\s*"(.*?)",\s*coordinates:\s*(\{.*?\})\s*\}/g;

let newArchetypesText = archetypesText.replace(regex, (match, name, desc, coords) => {
  const mappedName = nameMap[name] || name;
  const data = parsed[mappedName];
  
  let result = "{\n    name: " + JSON.stringify(mappedName) + ",\n    description: " + JSON.stringify(desc) + ",\n    coordinates: " + coords;

  if (data) {
    result += ",\n    quote: " + JSON.stringify(data.quote) + ",\n    subtitle: " + JSON.stringify(data.subtitle) + ",\n    detailedContent: " + JSON.stringify(data.detailedContent);
  }
  
  result += "\n  }";
  
  return result;
});

fs.writeFileSync('src/data/archetypes.ts', newArchetypesText);
console.log('Updated archetypes.ts');
