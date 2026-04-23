const fs = require('fs');
let q = fs.readFileSync('src/data/questions.ts', 'utf8');
const map = {
  'vim_zealot': 'vim_ascetic',
  'ai_acolyte': 'ai_pilot',
  'tdd_templar': 'tdd_preacher',
  'legacy_warden': 'legacy_guardian',
  'blockchain_believer': 'web3_believer',
  'dark_mode_dweller': 'dark_mode_user',
  'tabs_heretic': 'indent_nazi',
  'spaces_orthodox': 'indent_nazi',
  'regex_wizard': 'regex_god',
  'windows_apologist': 'windows_fanboy',
  'linux_purist': 'copyleft_militant'
};

for (const [k, v] of Object.entries(map)) {
  q = q.replace(new RegExp("'" + k + "'", 'g'), "'" + v + "'");
}

fs.writeFileSync('src/data/questions.ts', q);
console.log('Fixed triggerIds');
