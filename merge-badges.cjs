const fs = require('fs');
let badgesText = fs.readFileSync('src/data/badges.ts', 'utf8');
const parsed = JSON.parse(fs.readFileSync('parsed_archetypes.json', 'utf8'));

const regex = /\{\s*id:\s*'(.*?)',\s*name:\s*"(.*?)",\s*description:\s*"(.*?)",\s*iconName:\s*'(.*?)'\s*\}/g;

let newBadgesText = badgesText.replace(regex, (match, id, name, desc, iconName) => {
  const data = parsed[name];
  
  let result = "{\n    id: '" + id + "',\n    name: " + JSON.stringify(name) + ",\n    description: " + JSON.stringify(desc) + ",\n    iconName: '" + iconName + "'";

  if (data) {
    result += ",\n    quote: " + JSON.stringify(data.quote) + ",\n    subtitle: " + JSON.stringify(data.subtitle) + ",\n    detailedContent: " + JSON.stringify(data.detailedContent);
  }
  
  result += "\n  }";
  
  return result;
});

fs.writeFileSync('src/data/badges.ts', newBadgesText);
console.log('Updated badges.ts');
