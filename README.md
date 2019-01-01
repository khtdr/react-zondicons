[![NPM version](https://img.shields.io/npm/v/react-zondicons.svg)](https://www.npmjs.com/package/react-zondicons)
[![npm](https://img.shields.io/npm/dm/react-zondicons.svg)](https://www.npmjs.com/package/react-zondicons)
[![npm](https://img.shields.io/npm/dt/react-zondicons.svg)](https://www.npmjs.com/package/react-zondicons)

# react-zondicons

See: http://khtdr.com/react-zondicons/ search the icons

React Components for Zondicons : http://www.zondicons.com/

## Live Example

Example JSFiddle: https://jsfiddle.net/zbtd8rv5/

> documents the various options and class names for customizing an icon

## Module Usage
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

## UMD Script Usage:

``` html
<script type="text/javascript" src="https://gitcdn.link/repo/khtdr/react-zondicons/master/umd/react-zondicons.min.js"></script>
<!-- globally available as ReactZondicons -->
```

## License and Info

[![NPM](https://nodei.co/npm/react-zondicons.png)](https://npmjs.org/package/react-zondicons)
