/*
# The MIT License (MIT)
#
# Copyright (c) 2016 khtdr.com@gmail.com
#
# Permission is hereby granted, free of charge, to any person obtaining a
# copy of this software and associated documentation files (the "Software"),
# to deal in the Software without restriction, including without limitation
# the rights to use, copy, modify, merge, publish, distribute, sublicense,
# and/or sell copies of the Software, and to permit persons to whom the
# Software is furnished to do so, subject to the following conditions:
#
# The above copyright notice and this permission notice shall be included
# in all copies or substantial portions of the Software.
#
# THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
# OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
# FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
# AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
# LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
# OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
# IN THE SOFTWARE.
*/

const fs = require('fs');
const up = s => `${s.charAt(0).toUpperCase()}${s.slice(1)}`;

console.log('compiling to javscript...');
(() => {
  let index_js = `
  import React from 'react'
  const _ = {}
  export default _
  function Svg(p) {
    return (
      <svg {...p}
          xmlns='http://www.w3.org/2000/svg' viewBox='0 0 20 20'
          width={p.size||20} height={p.size||20} style={p.style}
          className={\`-zondicon $\{p.className}\`}
      >{p.title?<title>{p.title}</title>:null}{p.children}</svg>
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
      vars.SHAPE = text.replace(/fill\-rule/g, 'fillRule').match(/<svg[^>]*>(<.*>)<\/svg>/)[1];
      index_js += `${vars.NAME}=$('${vars.NAME}', ${vars.SHAPE}),\n`;
    }
  });
  index_js += 'version="1.1.0"';
  fs.writeFileSync(`./src/index.js`, index_js);
})();


console.log('building type declarations...');
(() => {
  let index_dts = `
declare module 'react-zondicons' {
  import {SFC} from 'react';
  namespace ReactZondicons {
`;
  fs.readdirSync('./scripts/zondicons').forEach(file => {
    if (file.match(/\.svg$/)) {
      file = file.replace(/\s+/g, '-');
      const words = file.split('.')[0].split('-');
      const name = words.map(up).join('');
      index_dts += `    export const ${name} :(props :{ className? :string; size? :number; style? :any } & React.HTMLProps<SVGSVGElement>) => JSX.Element\n`;
    }
  });
  index_dts += '  }\n  export = ReactZondicons\n}';
  fs.writeFileSync(`./types/index.d.ts`, index_dts);
})();

console.log('done')
