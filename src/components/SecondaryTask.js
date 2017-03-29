import React from 'react';
import { StickyContainer, Sticky } from 'react-sticky';

const SecondaryTask = React.createClass({
  render() {
    return (
      <div style={{ textAlign: 'center' }}>
        <StickyContainer>
          <div style={{ backgroundColor: '#fff' }}>
            <p>Start Scrolling!</p>
          </div>
          <Sticky className="foo">
            <header>
              <h1 className="pull-left">react-sticky | basic demo</h1>
              <div className="pull-right">
                <a href="http://www.captivationsoftware.com" target="_blank">
                  <img src="http://www.captivationsoftware.com/images/logo-white.png" className="hidden-xs hidden-sm" alt="Captivation Software" />
                  <img src="http://www.captivationsoftware.com/images/symbol-white.png" className="hidden-md hidden-lg" alt="Captivation Software" />
                </a>
              </div>
            </header>
          </Sticky>
          <div style={{ fontSize: 40, fontWeight: 'bold' }}>
            <p>Keep Going!</p>
            <p>Still More!</p>
            <p>Not Done Yet!</p>
            <p>The End Is Near...</p>
          </div>
        </StickyContainer>
        <div style={{ backgroundColor: '#fff' }}>
          <p>
            Okay, Now Scroll Back Up!<br />
            <small>(Oh, and check the console too...)</small>
          </p>
        </div>
      </div>
    );
  }
});

export default SecondaryTask;
