import * as React from 'react';
import styled, { createGlobalStyle } from 'styled-components';
import SyntaxHighlighter from 'react-syntax-highlighter';
//@ts-ignore
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';
//@ts-ignore
import { FixedSizeList, FixedSizeGrid as List } from "react-window";
//@ts-ignore
import AutoSizer from "react-virtualized-auto-sizer";

import { CloseOutline } from '../../src';
import { Categories, CopyButton, IconMap, Item, SearchBox } from './Components';

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
    padding-left: 400px;
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
    width: 375px;
    background: linear-gradient(to right, #f3f5f6 90%,rgba(0,0,0,0) 100%);
    height: 100vh;
    overflow: hidden;
    padding-top: 30px;
  }
  pre {
    white-space: pre-wrap;
    background-color: #f8f8ff;
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
  }
`;

export default class Demo extends React.Component<{
    categories :string[]
    icons :{name :string, Icon :any}[]

},{
    search_term :string
}> {
    icons = (filter? :string) => this.props.icons.filter(
        (icon :any) => !filter || icon.name.toLowerCase().indexOf(filter.toLowerCase()) >= 0
    )
    searchFor = (search_term = '') => {
        this.setState({ search_term });
        if (this.page_ref.current && search_term && window.innerWidth <= 760) {
            this.page_ref.current.querySelector('aside')!.scrollIntoView()
        }
    }
    input_ref :React.RefObject<HTMLInputElement>
    page_ref :React.RefObject<HTMLDivElement>
    constructor(props :never) {
        super(props)
        this.state = {search_term:''}
        this.input_ref = React.createRef()
        this.page_ref = React.createRef()
    }
    componentDidMount() {
        if (this.input_ref.current && window.innerWidth > 760) {
            this.input_ref.current.focus()
        }
    }
    render() {
        return (
            <React.Fragment>
                <GlobalStyle />
                <Page ref={this.page_ref}>
                    <main>

                        <h1>react-zondicons</h1>

                        <p>A small, fast, customizable, and great looking SVG icon set for React apps.</p>

                        <p style={{paddingTop: '20px'}}>
                            <IconMap icons={this.props.icons} search={this.searchFor} />
                        </p>

                        <h2>quick categories</h2>
                        <Categories searchFor={this.searchFor} categories={this.props.categories}/>

                        <h3>Customizable:</h3>
                        <p><strong>Code Example:</strong></p>
                        <SyntaxHighlighter language='javascript' style={docco}>
                            {`import React from 'react';\nimport { YinYang } from 'react-zondicons';\nexport default () => (\n  <YinYang\n    // Only custom property (optional)\n    size={50} // default 20, all icons have square proportions\n    // All additional props are passed to the <svg ... />\n    className='my-icon'\n    onClick={e => console.log('clicked', e)}\n    // etc...\n  />\n);`}
                        </SyntaxHighlighter>


                        <h3>Small:</h3>
                        <p>file sizes before compression:</p>
                        <pre>{`  61K es/index.js\n  76K lib/index.js\n 113K umd/react-zondicons.js\n  68K umd/react-zondicons.min.js\n  79K umd/react-zondicons.min.js.map`}</pre>
                        <p>Download size is under 20K after GZIP compression.</p>

                        <h2>Getting Started</h2>

                        <p><strong>Installation:</strong></p>

                        <pre>{`npm install react-zondicons`}</pre>

                        <p><strong>Importing:</strong></p>
                        <SyntaxHighlighter language='javascript' style={docco}>
                            {`import React from 'react';\nimport { YinYang } from 'react-zondicons';`}
                        </SyntaxHighlighter>

                        <h3>CDN/UMD Usage (script tag):</h3>

                        <SyntaxHighlighter language='javascript' style={docco}>
                            {`<script type="text/javascript" src="https://gitcdn.link/repo/khtdr/react-zondicons/master/umd/react-zondicons.min.js"></script>`}
                        </SyntaxHighlighter>

                        <p>After including the script, the icons will be available in the global variable <code>ReactZondicons</code>.</p>

                        <p><a href="https://npmjs.org/package/react-zondicons"><img style={{maxWidth:'100%',display:'inline-block'}} alt="NPM" src="https://nodei.co/npm/react-zondicons.png"/></a></p>

                        <h3>Live Example</h3>

                        <p><a href="https://jsfiddle.net/zbtd8rv5/2/">https://jsfiddle.net/zbtd8rv5/2</a> <em>shown below</em></p>

                        <iframe width="100%" height="325" src="//jsfiddle.net/zbtd8rv5/2/embedded/js,css,result/" allowFullScreen={true} frameBorder="0"></iframe>

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
                                value={this.state.search_term}
                                ref={this.input_ref}
                            />
                            <CloseOutline
                                style={{visibility:this.state.search_term?'visible':'hidden', overflow:'visible'}}
                                onClick={()=>this.searchFor()}
                            />
                        </SearchBox>
                        <small>click to copy the component name</small>
                        <AutoSizer style={{backgroundColor:'rgba(0, 0, 0, 0.03)',width:'100%',height:'100%'}}>
                            {(props :{ height :number, width :number }) => (
                                <List
                                    columnCount={2}
                                    columnWidth={props.width/2}
                                    rowCount={(this.icons(this.state.search_term).length)/2}
                                    rowHeight={35}
                                    height={props.height - 80}
                                    width={props.width}
                                >
                                    {(props :{ rowIndex :number, columnIndex :number, style :any}) => {
                                        const { name, Icon } = this.icons(this.state.search_term)[props.rowIndex * 2 + props.columnIndex];
                                        return (
                                            <div style={props.style}>
                                                <CopyButton key={name} value={name}>
                                                    <Item><Icon /><span>{name}</span></Item>
                                                </CopyButton>
                                            </div>
                                        )
                                    }}
                                </List>
                            )}
                        </AutoSizer>
                    </aside>
                </Page>
            </React.Fragment>
        );
    }
}
