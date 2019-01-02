import React, {Component} from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import {render} from 'react-dom';
import icons from '../../src';
import { CloseOutline } from '../../src';

const GlobalStyle = createGlobalStyle`
  html { background-color: white; }
  html, body, ul, li { margin: 0; padding: 0; }
  * { box-sizing: border-box; }
`;

const Page = styled.div`
  font-family: sans-serif;
  text-align: left;
  font-size: 13px;
  background-color: white;
  > main {
    padding: 20px;
    padding-left: 320px;
    max-width: 950px;
    > p:last-child {
      padding-top: 40px;
      padding-bottom: 40px;
      text-align: center;
    }
  }
  > aside {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 300px;
    background: linear-gradient(to right, #f3f5f6 90%,rgba(0,0,0,0) 100%);
    height: 100vh;
    overflow: hidden;
  }
  pre {
    white-space: pre-wrap;
    background-color: #f3f5f6;
    padding: 6px;
    color: #333840;
  }
  .-zondicon.inline {
    height: 19px;
    width: 19px;
    border: solid 3px white;
    display: inline-block;
    fill: #345;
    transition: all 0.3s;
  }
  .-zondicon.inline:hover {
    transform: scale(3);
    fill: #923;
    background-color: white;
  }
`;

const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  height: 40px;
  padding: 10px 0 0 10px;
  input {
    border: 1px solid #47a;
    border-radius: 1px;
    font-size: 16px;
    padding: 3px 10px;
    flex: 1px;
  }
  input + svg {
    margin: 4px 0 0 10px;
    cursor: pointer;
  }
  input + svg:hover {
    fill: red;
  }
  & + small {
    display: block;
    padding: 10px;
    color: #777;
  }
`;

const List = styled.ul`
  padding: 4px;
  height: calc(100% - 80px);
  overflow: auto;
  list-style-type: none;
  &::-webkit-scrollbar {
    width: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
  &::-webkit-scrollbar-track:hover {
    border-radius: 5px;
    background-color: #f3f5f6;
  }
  &::-webkit-scrollbar-thumb {
    border-radius: 5px;
    background-color: #e3e7e9;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #e0e4e5;
  }
`;

const Item = styled.li`
  padding: 0 5px;
  margin: 10px;
  color: #444;
  background-color: inherit;
  border-radius: 2px;
  cursor: default;
  transition: all 0.2s;
  &:hover {
    filter: invert(1);
    background-color: white;
  }
  svg {
    display: inline-block;
    position: relative;
    top: 4px;
    margin-right: 10px;
  }
  input {
    outline: none;
    background-color: transparent;
    cursor: pointer;
    border: none;
    font-family: Verdana, sans-serif;
    font-size: 14px;
    line-height: 23px;
  }
`;

const Cate = styled.ul`
  padding-top: 10px;
`;
const Gory = styled.li`
  display: inline-block;
  margin: 1px;
  padding: 3px;
  border-radius: 5px;
  font-size: 10px;
  text-transform: uppercase;
  border: 1px solid #e4e4e6;
  background-color: #eef;
  cursor: pointer;
  &:hover {
    background-color: #ddf;
  }
`;

class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {value:''}
    }
    categories() {
        const tallies = {};
        for (const name in icons) {
            name.match(/[A-Z][a-z]+/g).forEach(word => {
                tallies[word] = tallies[word] || 0;
                tallies[word]++;
            })
        }
        return Object.keys(tallies).filter(name => tallies[name] >= 3).sort();
    }
    icons(filter) {
        return Object.keys(icons).filter(
            name => !filter || name.toLowerCase().indexOf(filter.toLowerCase()) >= 0
        ).map(name => {
            const Icon = icons[name];
            return { Icon, name };
        });
    }
    toClipboard(e) {
        let li = e.target;
        while(li.nodeName != 'LI') li = li.parentElement;
        const input = li.querySelector('input');
        input.select();
        document.execCommand("copy");
        setTimeout(() => {
            if (window.getSelection) {window.getSelection().removeAllRanges();}
            else if (document.selection) {document.selection.empty();}
        }, 10)
    }
    render() {
        return (
            <React.Fragment>
              <GlobalStyle />
              <Page>
                <main>

                  <p><a href="https://npmjs.org/package/react-zondicons"><img alt="NPM" src="https://nodei.co/npm/react-zondicons.png"/></a></p>

                  <h1>react-zondicons</h1>

                  <p>A small, fast, customizable, and great looking SVG icon set for React apps.</p>

                  {this.icons().map(({ name, Icon }) => (
                      <Icon className='inline' alt={name} onClick={() => this.setState({ value: name })} />
                  ))}

                  <Cate>
                  {this.categories().map(name => <Gory onClick={() => this.setState({ value: name })}>{name}</Gory>)}
                  </Cate>

                  <p>file sizes before compression:</p>
                  <pre>{`  61K es/index.js\n  76K lib/index.js\n 113K umd/react-zondicons.js\n  68K umd/react-zondicons.min.js\n  79K umd/react-zondicons.min.js.map`}</pre>
                  <p>Download size is under 20K after GZIP compression.</p>

                  <h2>Getting Started</h2>

                  <p><strong>Installation:</strong></p>
                  <pre>{`npm install react-zondicons`}</pre>

                  <p><strong>Code Example:</strong></p>
                  <pre>{`import React from 'react';\nimport { YinYang } from 'react-zondicons';\nexport default () => (\n  <YinYang\n    // Only custom property (optional)\n    size={50} // default 20, all icons have square proportions\n    // All additional props are passed to the <svg ... />\n    className='my-icon'\n    onClick={e => console.log('clicked', e)}\n    // etc...\n  />\n);`}</pre>

                  <h3>CDN/UMD Usage (script tag):</h3>

                  <pre>{`<script type="text/javascript" src="https://gitcdn.link/repo/khtdr/react-zondicons/master/umd/react-zondicons.min.js"></script>`}</pre>

                  <p>After including the script, the icons will be available in the global variable <code>ReactZondicons</code>.</p>

                  <h3>Live Example</h3>

                  <p><a href="https://jsfiddle.net/zbtd8rv5/2/">https://jsfiddle.net/zbtd8rv5/2</a> <em>shown below</em></p>

                  <iframe width="100%" height="325" src="//jsfiddle.net/zbtd8rv5/2/embedded/js,css,result/" allowFullScreen="allowfullscreen" frameBorder="0"></iframe>

                  <h2>License and Info</h2>

                  <p>The icons are available at <a href="https://www.zondicons.com/">https://www.zondicons.com/</a> and are created and provided by <a href="https://twitter.com/steveschoger">https://twitter.com/steveschoger</a></p>

                  <p>zondicons.com describes the icon set as "free" and shows the Creative Commons logo.</p>

                  <p>The source code at <a href="https://github.com/khtdr/react-zondicons">https://github.com/khtdr/react-zondicons</a> bundles the said icons into a React library. That build script is MIT licensed.</p>

                  <p>back to <a href="https://khtdr.com/">khtdr.com</a></p>

                </main>
                <aside>
                  <SearchBox>
                    <input
                      placeholder='filter...'
                      type='text'
                      onChange={e => this.setState({value: e.target.value})}
                      value={this.state.value}
                      ref={_ => this.ref = _}
                    />
                    <CloseOutline
                      style={{visibility:this.state.value?'visible':'hidden'}}
                      onClick={()=>this.setState({value:''})}
                    />
                  </SearchBox>
                  <small>click to copy the component name</small>
                  <List>
                  {this.icons(this.state.value).map(({ name, Icon }) => (
                    <Item key={name} onClick={this.toClipboard}>
                      <Icon /><input value={name} readOnly />
                    </Item>
                  ))}
                  </List>
                </aside>
              </Page>
            </React.Fragment>
        );
    }
}
render(<Demo/>, document.querySelector('#demo'));
