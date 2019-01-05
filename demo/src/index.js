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
    margin: 3px 10px;
    cursor: pointer;
    padding: 3px;
    height: 26px;
    width: 26px;
    border-radius: 2px;
  }
  input + svg:hover {
    fill: red;
    background-color: rgba(0,0,0,0.1);
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

const Item = styled.li.attrs({ tabIndex: 1 })`
  padding: 0 5px;
  margin: 10px;
  color: #444;
  background-color: inherit;
  border-radius: 2px;
  cursor: default;
  transition: all 0.2s;
  outline: none;
  &:hover {
    filter: invert(1);
    background-color: white;
  }
  &:focus {
    background-color: rgba(0,0,0,0.1);
  }
  svg {
    display: inline-block;
    position: relative;
    top: 4px;
    margin-right: 10px;
    fill: #578;
  }
  span {
    line-height: 23px;
  }
  input {
    outline: none;
    background-color: transparent;
    cursor: pointer;
    border: none;
    font-family: Verdana, sans-serif;
    font-size: 14px;
    line-height: 23px;
    color: #222;
    display: inline;
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
    height: 22px;
    width: 22px;
    display: inline-block;
    padding: 0px 5px;
    fill: #345;
    transition: all 0.3s;
    cursor: pointer;
  }
  .-zondicon.inline:hover {
    fill: #923;
    background-color: #e3e5e6;
    transform: scale(1.5);
  }
  @media (max-width: 760px) {
    /* tablet/mobile styles */
    > main {
      padding-left: 20px;
    }
    > aside {
      position: relative;
      background-color: #f3f5f6;
      height: auto;
      width: 100%;
      min-height: 100vh;
    }
    ${List} {
      display: flex;
      flex-wrap: wrap;
    }
    ${Item} {
      flex: 1;
      padding: 20px;
      text-align: center;
      * { text-align: center; }
      svg {
        display: block;
        margin: 10px auto;
        height: 40px;
        width: 40px;
      }
    }
  }
`;

// https://stackoverflow.com/questions/400212/how-do-i-copy-to-the-clipboard-in-javascript
function copyTextToClipboard(text) {
  var textArea = document.createElement("textarea");

  //
  // *** This styling is an extra step which is likely not required. ***
  //
  // Why is it here? To ensure:
  // 1. the element is able to have focus and selection.
  // 2. if element was to flash render it has minimal visual impact.
  // 3. less flakyness with selection and copying which **might** occur if
  //    the textarea element is not visible.
  //
  // The likelihood is the element won't even render, not even a flash,
  // so some of these are just precautions. However in IE the element
  // is visible whilst the popup box asking the user for permission for
  // the web page to copy to the clipboard.
  //

  // Place in top-left corner of screen regardless of scroll position.
  textArea.style.position = 'fixed';
  textArea.style.top = 0;
  textArea.style.left = 0;

  // Ensure it has a small width and height. Setting to 1px / 1em
  // doesn't work as this gives a negative w/h on some browsers.
  textArea.style.width = '2em';
  textArea.style.height = '2em';

  // We don't need padding, reducing the size if it does flash render.
  textArea.style.padding = 0;

  // Clean up any borders.
  textArea.style.border = 'none';
  textArea.style.outline = 'none';
  textArea.style.boxShadow = 'none';

  // Avoid flash of white box if rendered for any reason.
  textArea.style.background = 'transparent';


  textArea.value = text;

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
  } catch (err) {
      // what do ya do?
  }

  document.body.removeChild(textArea);
}

class CopyButton extends React.PureComponent {
    constructor(props) {
        super(props);
        this.copy = this.copy.bind(this);
    }
    copy() {
        copyTextToClipboard(this.props.value)
    }
    render() {
        return React.Children.map(
            React.Children.only(this.props.children),
            child => React.cloneElement(
                child,
                {
                    onClick : e => {
                        this.copy(e)
                        this.props.onClick && this.props.onClick(e)
                    }
                }
            )
        )
    }
}

class SearchButton extends React.PureComponent {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
    }
    search() {
        this.props.search(this.props.value);
    }
    render() {
        return React.Children.map(
            React.Children.only(this.props.children),
            child => React.cloneElement(
                child,
                {
                    onClick : e => {
                        this.search(e)
                        this.props.onClick && this.props.onClick(e)
                    }
                }
            )
        )
    }
}

class IconMap extends React.PureComponent {
    render() {
        return this.props.icons.map(
            ({ name, Icon }) => <CopyButton value={name} key={name}>
                                  <SearchButton search={this.props.search} value={name}>
                                    <Icon className='inline' title={name} />
                                  </SearchButton>
                                </CopyButton>
        );
    }
}

class CategoryButton extends React.PureComponent {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);
    }
    search() {
        this.props.searchFor(this.props.name);
    }
    render() {
        return <Gory onClick={this.search}>{this.props.name}</Gory>
    }
}

class Categories extends React.PureComponent {
    render() {
        return (
            <Cate>
              {this.props.categories.map(
                  name => <CategoryButton key={name} name={name} searchFor={this.props.searchFor} />
              )}
            </Cate>
        );
    }
}

class Demo extends Component {
    constructor(props) {
        super(props);
        this.state = {value:''}
        this.searchFor = this.searchFor.bind(this);
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
    searchFor(value = '') {
        this.setState({ value });
        if (value && window.innerWidth <= 760) {
            this.page.querySelector('aside').scrollIntoView()
        }
    }
    componentDidMount() {
        if (this.ref && window.innerWidth > 760) {
            this.ref.focus()
        }
    }
    render() {
        return (
            <React.Fragment>
              <GlobalStyle />
              <Page ref={_ => this.page = _}>
                <main>

                  <p><a href="https://npmjs.org/package/react-zondicons"><img style={{maxWidth:'100%',display:'inline-block'}} alt="NPM" src="https://nodei.co/npm/react-zondicons.png"/></a></p>

                  <h1>react-zondicons</h1>

                  <p>A small, fast, customizable, and great looking SVG icon set for React apps.</p>

                  <p style={{paddingTop: '20px'}}>
                    <IconMap icons={this.icons()} search={this.searchFor} />
                  </p>

                  <Categories searchFor={this.searchFor} categories={this.categories()}/>

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
                      onChange={e => this.searchFor(e.target.value)}
                      value={this.state.value}
                      ref={_ => this.ref = _}
                    />
                    <CloseOutline
                      style={{visibility:this.state.value?'visible':'hidden', overflow:'visible'}}
                      onClick={()=>this.searchFor()}
                    />
                  </SearchBox>
                  <small>click to copy the component name</small>
                  <List>
                  {this.icons(this.state.value).map(({ name, Icon }) => (
                    <CopyButton key={name} name={name}>
                      <Item><Icon /><span>{name}</span></Item>
                    </CopyButton>
                  ))}
                  </List>
                </aside>
              </Page>
            </React.Fragment>
        );
    }
}
render(<Demo/>, document.querySelector('#demo'));
