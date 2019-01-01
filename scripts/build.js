const fs = require('fs');

const up = s => `${s.charAt(0).toUpperCase()}${s.slice(1)}`;
/*
const expand = (vars, template) => Object.keys(vars).reduce((tmpl,name) => {
  const value = vars[name];
  const regex = new RegExp(`\\^\\^${name}\\^\\^`, 'g');
  return tmpl.replace(regex, value);
}, template);
const svg_template = `${fs.readFileSync('./scripts/template.jsx')}`;
*/
let index = `
import React from 'react'
const _ = {}
export default _
function Svg(p) {
  return (
    <svg {...p}
         xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'
         width={p.size||20} height={p.size||20} style={p.style}
         className={\`-zondicon $\{p.className}\`}
    >{p.children}</svg>
  )
}
function $(name, shape) {
  let new_name = name.match(/[A-Z][a-z]+/g).map(w => w.toLowerCase()).join('-')
  return _[name] = p => (
    <Svg {...p} className={\`-zondicon-\${new_name} \${p.className}\`}>{shape}</Svg>
  )
}
export const `;
fs.readdirSync('./scripts/zondicons').forEach(file => {
  if (file.match(/\.svg$/)) {
    const vars = { };
    const text = `${fs.readFileSync(`./scripts/zondicons/${file}`)}`;
    file = file.replace(/\s+/g, '-');
    const words = file.split('.')[0].split('-');
    vars.NAME = words.map(up).join('');
    //vars.CLASSNAME = `-zondicon-${words.join('-')}`;
    vars.SHAPE = text.replace(/fill\-rule/g, 'fillRule').match(/<svg[^>]*>(<.*>)<\/svg>/)[1];
    //index += expand(vars, svg_template);
    index += `${vars.NAME}=$('${vars.NAME}', ${vars.SHAPE}),\n`
  }
});
index += 'version="1.1.0"';
fs.writeFileSync(`./src/index.js`, index);
console.log('done');
