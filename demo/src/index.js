import React, {Component} from 'react';
import styled from 'styled-components';
import {render} from 'react-dom';
import icons from '../../src';
import { CloseOutline } from '../../src';

const Page = styled.div`
  height: 100vh;
  width: 100%;
  font-family: sans-serif;
  text-align: center;
  font-size: 13px;
`;

const SearchBox = styled.div`
  display: flex;
  justify-content: center;
  margin: 20px;
  input {
    border: 2px solid #47a;
    border-radius: 5px;
    font-size: 16px;
    padding: 3px 10px;
    margin-left: 30px;
  }
  input + svg {
    margin: 4px 0 0 10px;
  }
`;

const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  font-family: monospace;
  justify-content: space-around;
  color: #555;
`;

const Item = styled.div`
  text-align: center;
  padding: 5px;
  margin: 10px;
  color: #444;
  border-radius: 8px;
  border: 1px solid transparent;
  min-width: 60px;
  &:hover {
    background-color: #eecdff;
    border-color: purple;
    fill: red;
  }
`;
class Demo extends Component {
  constructor(props) {
    super(props);
    this.state = {value:''}
  }
  render() {
    return <Page>
             <SearchBox>
               <input
                 placeholder='find...'
                 type='text'
                 onChange={e => this.setState({value: e.target.value})}
                 value={this.state.value}
               />
               <CloseOutline
                 style={{visibility:this.state.value?'visible':'hidden'}}
                 onClick={()=>this.setState({value:''})}
               />
             </SearchBox>
             icons from: <a href='http://www.zondicons.com/'>http://www.zondicons.com/</a>
             <List>
               {Object.keys(icons).filter(
                 name => !this.state.value || name.toLowerCase().indexOf(this.state.value.toLowerCase()) >= 0
               ).map(name => {
                 const Icon = icons[name];
                 return <Item key={name} >
                          <Icon size={40} /><br />{name}
                        </Item>;
               })}
             </List>
           </Page>;
  }
}
render(<Demo/>, document.querySelector('#demo'));
