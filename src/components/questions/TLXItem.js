import React from 'react';

const TLXItem = React.createClass({
  getInitialState() {
    return {
      selectedKey: -1,
      hoveredKey: -1,
    };
  },

  handleCellClick(key) {
    this.setState({ selectedKey: key });
    this.props.scaleClick(key);
  },

  handleMouseOver(key) {
    this.setState({ hoveredKey: key });
  },

  handleMouseOut() {
    this.setState({ hoveredKey: -1 });
  },

  getColor(key) {
    let color = '#ffffff';

    if (this.state.selectedKey === key) {
      color = '#AAD219';
    } else if (this.state.hoveredKey === key) {
      color = '#e6e6e6';
    }
    return color;
  },

  render() {

    return (
      <div style={{ width: '100%', overflow: 'hidden', paddingTop: '10px', textAlign: 'left' }}>
        <b>{this.props.title}</b>
        <div style={{ paddingBottom: '10px'}}>
          <em>{this.props.description}</em>
        </div>
        <div style={{paddingBottom: '5px'}}>
          <table 
            style={{ width: '100%', overflow: 'hidden', paddingBottom: '10px' }}
            onMouseOut={this.handleMouseOut}>
            <tbody>
              <tr>
                {
                  Array.from(Array(20).keys()).map((key) => {
                    return (
                      <td
                        style={{ 
                          backgroundColor: this.getColor(key),
                        }}
                        onClick={this.handleCellClick.bind(null, key)}
                        onMouseOver={this.handleMouseOver.bind(null, key)}
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
                          backgroundColor: this.getColor(key)
                        }}
                        onClick={this.handleCellClick.bind(null, key)}
                        onMouseOver={this.handleMouseOver.bind(null, key)}
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
        <div style={{ float: 'left', fontSize: '11px'}}><em>Low</em></div>
        <div style={{ float: 'right', fontSize: '11px'}}><em>High</em></div>
      </div>
    );
  },
});

export default TLXItem;