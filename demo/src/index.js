import React from 'react'
import {render} from 'react-dom'
import zondicons from '../../src'
import DemoPage from './DemoPage'
import * as ReactGA from 'react-ga';

ReactGA.initialize('UA-290558-11');
ReactGA.pageview(window.location.pathname + window.location.search);

render(
  <DemoPage
    categories={(() => {
        const tallies = {};
        for (const name in zondicons) {
            name.match(/[A-Z][a-z]+/g).forEach(word => {
                tallies[word] = tallies[word] || 0;
                tallies[word]++;
            })
        }
        return Object.keys(tallies).filter(name => tallies[name] >= 3).sort();
    })()}
    icons={(() => Object.keys(zondicons).map(name => ({
      name,
      Icon: zondicons[name]
    })))()}
  />,
  document.querySelector('#demo')
)
