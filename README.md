# react-zondicons

[![npm package][npm-badge]][npm]

React Components for Zondicons : http://www.zondicons.com/

```bash
npm install react-zondicons
```

``` jsx
import React from 'react'
import { Airplane } from 'react-zondicons'
export default () => <Airplane />
```

Options:
> size (in pixels, default 20), className, style, etc.
``` jsx
import React from 'react'
import { Airplane } from 'react-zondicons'
export default () => <Airplane
                       size={100}
                       onClick={()=>alert('clicked')}
                       style={{fill:'blue'}}
                       className='my-class'
                     />
```

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package
