[![NPM version](https://img.shields.io/npm/v/react-zondicons.svg)](https://www.npmjs.com/package/react-zondicons)
[![npm](https://img.shields.io/npm/dm/react-zondicons.svg)](https://www.npmjs.com/package/react-zondicons)
[![npm](https://img.shields.io/npm/dt/react-zondicons.svg)](https://www.npmjs.com/package/react-zondicons)

# react-zondicons

See: http://khtdr.com/react-zondicons/ search the icons

React Components for Zondicons : http://www.zondicons.com/

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

## Script Usage:

``` html
<!DOCTYPE html>
<html>
  <head>
    <title>React Zondicons example</title>
    <script type="text/javascript" src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script type="text/javascript" src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script type="text/javascript" src="https://gitcdn.link/repo/khtdr/react-zondicons/master/umd/react-zondicons.min.js"></script>
  </head>
  <body>
    <div id='root'></div>
    <script type="text/jsx"
    data-presets="es2017,react,stage-0"
    data-plugins="transform-decorators-legacy">
      ReactDOM.render(
        <div>
            <ReactZondicons.AddSolid />
            <ReactZondicons.AddSolid size={40} style={{fill:'red'}} />
        </div>,
        document.getElementById('root')
      );
    </script>
  </body>
</html>
```

Example JSFiddle: https://jsfiddle.net/sgrbexm6/

## License and Info

[![NPM](https://nodei.co/npm/react-zondicons.png)](https://npmjs.org/package/react-zondicons)
