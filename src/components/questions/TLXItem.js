import React from 'react';

const TLXItem = React.createClass({
  getInitialState() {
    return {
      mental: 0,
      physical: 0,
      temporal: 0,
      performance: 0,
      effort: 0,
      frustration: 0,
      selectedKey: -1,
    };
  },

  handleCellClick(key) {
    this.setState({ selectedKey: key });
    this.props.scaleClick(key);
  },

  render() {
    return (
      <div style={{ width: '100%', overflow: 'hidden', paddingTop: '10px' }}>
        <h4>{this.props.title}</h4>
        <div style={{ paddingBottom: '10px'}}>
          <em>{this.props.description}</em>
        </div>
        <div style={{paddingBottom: '5px'}}>
          <table style={{ width: '100%', overflow: 'hidden', paddingBottom: '10px' }}>
            <tbody>
              <tr>
                {
                  Array.from(Array(20).keys()).map((key) => {
                    return (
                      <td
                        style={{ 
                          backgroundColor: (this.state.selectedKey === key ? '#AAD219' : '#ffffff')
                        }}
                        onClick={this.handleCellClick.bind(null, key)}
                        className={key % 2 === 0 ? "top1": 'top2' } 
                        key={key} 
                      />
                    );
                  })
                }
              </tr>
              <tr>
                {
                  Array.from(Array(20).keys()).map((key) => {
                    return (
                      <td
                        style={{ 
                          backgroundColor: (this.state.selectedKey === key ? '#AAD219' : '#ffffff')
                        }}
                        onClick={this.handleCellClick.bind(null, key)}
                        className="bottom" 
                        key={key}
                      />
                    );
                  })
                }
              </tr>
            </tbody>
          </table>
        </div>
        <div style={{ float: 'left', fontSize: '12px'}}><em>Low</em></div>
        <div style={{ float: 'right', fontSize: '12px'}}><em>High</em></div>
      </div>
    );
  },
});

export default TLXItem;