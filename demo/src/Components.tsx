import * as React from 'react';
import styled from 'styled-components';
import { copyTextToClipboard } from './lib';

export const SearchBox = styled.div`
height: 36px;
margin: 10px 10px 0 10px;
position: relative;
input {
    border: 1px solid #ccc;
    border-radius: 1px;
    font-size: 16px;
    padding: 3px 30px 3px 10px;
    width: 100%;
    display: block;
}
input + svg {
    position: absolute;
    margin: 3px 10px;
    cursor: pointer;
    padding: 3px;
    height: 26px;
    width: 26px;
    border-radius: 2px;
    top: -3px;
    right: -10px;
    fill: #999;
}
input + svg:hover {
    fill: red;
    background-color: rgba(0,0,0,0.1);
}
input:focus {
    outline: none;
    border-color: #47c;
}
& + small {
    display: block;
    padding: 10px;
    color: #777;
    border-bottom: dashed 1px #aaa;
}
`;

export const Item = styled.div.attrs({ tabIndex: 1 })`
padding: 0 5px;
margin: 10px;
color: #444;
border-radius: 2px;
cursor: default;
transition: all 0.2s;
outline: none;
&:hover {
    background-color: #5e5e8e;
    color: #dcdcf1;
    svg { fill: white; }
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

export const CategoryList = styled.ul`
padding-top: 10px;
`;

export const CategoryButton = styled.li`
display: inline-block;
margin: 3px;
padding: 3px 6px;
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



type SearchFn = (value :string) => void

export const CopyButton = (props :{
    value :string
    children: React.ReactElement
}) => React.cloneElement(props.children, {
    onClick: ()=> copyTextToClipboard(props.value)
})

export const SearchButton = (props :{
    value :string
    search :SearchFn
    children: React.ReactElement
}) => React.cloneElement(props.children, {
    onClick: ()=> props.search(props.value)
})

export const CategoryItem = (props :{
    search :SearchFn
    name :string
}) => (
    <CategoryButton onClick={() => props.search(props.name)}>
    {props.name}
    </CategoryButton>
)

export const IconMap = (props :{
    icons :{name :string; Icon: any}[]
    search :SearchFn
}) => (
    <>
    {props.icons.map(({ name, Icon }) =>
        <CopyButton value={name} key={name}>
            <SearchButton search={props.search} value={name}>
                <Icon className='inline' title={name} />
            </SearchButton>
        </CopyButton>
    )}
    </>
)


export const Categories = (props :{
    categories :string[]
    searchFor :SearchFn
}) => (
    <CategoryList>
    {props.categories.map(name =>
        <CategoryItem key={name} name={name} search={props.searchFor} />
    )}
    </CategoryList>
)
