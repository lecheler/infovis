import React from 'react';
import { Button, Well } from 'react-bootstrap';

import questionData from './questionData';

// const choices = ['Elene', 'Corrine', 'Both', 'None'];

const ResponseItem = React.createClass({
  getInitialState() {
    return {
      selectedKey: -1,
      hoveredKey: -1,
    };
  },

  handleCellClick(key) {
    this.setState({ 
      selectedKey: key 
    });
  },

  submit() {
    this.setState({
      selectedKey: -1,
    });
    this.props.goToNext();
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
    let btn = <Button className="pull-right" bsStyle="primary" onClick={this.submit} disabled>Submit</Button>;
    if (this.state.selectedKey > -1) {
      btn = <Button className="pull-right" bsStyle="primary" onClick={this.submit}>Submit</Button>;
    }
    return (
      <div>
        <h4 style={{ textAlign: 'left' }}>{this.props.question}. { questionData.testModel[this.props.question-1].title }</h4>
        <Well 
          style={{ 
            display: 'inline-block',
            marginBottom: '10px',
            padding: '10px',
          }}>
          <div>
            {
              questionData.testModel[this.props.question-1].choices.map((choice, key) => {
                return(
                  <div 
                    key={key}
                    onClick={this.handleCellClick.bind(null, key)}
                    onMouseOver={this.handleMouseOver.bind(null, key)}
                    onMouseOut={this.handleMouseOut}
                    style={{
                      float: 'left',
                      padding: '5px',
                      cursor: 'pointer',
                      textAlign: 'left',
                    }}>
                    <div
                      style={{ 
                        float: 'left',
                        backgroundColor: this.getColor(key),
                        width: '25px',
                        height: '25px',
                        borderRadius: '99px',
                        borderWidth: '0px',
                        marginRight: '15px',
                      }}
                      className={key % 2 === 0 ? "top1": 'top2' } 
                      key={key} 
                    />
                    <div style={{ 
                      float: 'left',
                      lineHeight: '25px'
                    }}>
                      { choice }
                    </div>
                  </div>
                )
              })
            }
          </div>
        </Well>
        {btn}
      </div>
    );
  },
});

export default ResponseItem;