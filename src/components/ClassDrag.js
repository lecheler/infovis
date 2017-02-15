import React from 'react';
import {Motion, spring} from 'react-motion';
import range from 'lodash.range';

const springSetting1 = {stiffness: 180, damping: 10};
const springSetting2 = {stiffness: 120, damping: 17};

// function clamp(n, min, max) {
//   return Math.max(Math.min(n, max), min);
// }

const allColors = [
  '#AAD219', '#20A8CC', '#C80054', '#AAD219', '#20A8CC', '#C80054', '#AAD219',
  '#20A8CC', '#C80054', '#20A8CC', '#AAD219',
];
const [count, width, height] = [11, 70, 90];

const students = [
  {
    name:'A',
    score: 0.8,
    position: {
      x: 10, 
      y: 10
    }
  },
  {
    name:'B',
    score: 0.6,
    position: {
      x: 100, 
      y: 100
    }
  },
  {
    name:'C',
    score: 0.95,
    position: {
      x: 10, 
      y: 100
    }
  },
  {
    name:'D',
    score: 0.86,
    position: {
      x: 200, 
      y: 100
    }
  },
  {
    name:'E',
    score: 0.6,
    position: {
      x: 100, 
      y: 100
    }
  },
  {
    name:'F',
    score: 0.6,
    position: {
      x: 100, 
      y: 100
    }
  },{
    name:'G',
    score: 0.8,
    position: {
      x: 10, 
      y: 10
    }
  },
  {
    name:'H',
    score: 0.6,
    position: {
      x: 100, 
      y: 100
    }
  },
  {
    name:'I',
    score: 0.6,
    position: {
      x: 100, 
      y: 100
    }
  },
  {
    name:'J',
    score: 0.6,
    position: {
      x: 100, 
      y: 100
    }
  },
  {
    name:'K',
    score: 0.6,
    position: {
      x: 100, 
      y: 100
    }
  },
  {
    name:'L',
    score: 0.6,
    position: {
      x: 100, 
      y: 100
    }
  },
  {
    name:'M',
    score: 0.6,
    position: {
      x: 100, 
      y: 100
    }
  },
  {
    name:'N',
    score: 0.6,
    position: {
      x: 100, 
      y: 100
    }
  }
]

const Demo = React.createClass({
  getInitialState() {
    return {
      mouse: [0, 0],
      delta: [0, 0], // difference between mouse and circle pos, for dragging
      lastPress: null, // key of the last pressed component
      isPressed: false,
      order: range(count), // index: visual position. value: component key/id
    };
  },

  componentDidMount() {
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
  },

  handleTouchStart(key, pressLocation, e) {
    this.handleMouseDown(key, pressLocation, e.touches[0]);
  },

  handleTouchMove(e) {
    e.preventDefault();
    this.handleMouseMove(e.touches[0]);
  },

  handleMouseMove({pageX, pageY}) {
    const {order, lastPress, isPressed, delta: [dx, dy]} = this.state;
  //  console.log('moving::(' + pageX + ', ' + pageY + ')');
    if (isPressed) {
      const mouse = [pageX - dx, pageY - dy];
      // const col = clamp(Math.floor(mouse[0] / width), 0, 2);
      // const row = clamp(Math.floor(mouse[1] / height), 0, Math.floor(count / 3));
      // const index = row * 3 + col;
      // const newOrder = reinsert(order, order.indexOf(lastPress), index);
      this.setState({mouse: mouse});
    }
  },

  handleMouseDown(key, [pressX, pressY], {pageX, pageY}) {
    this.setState({
      lastPress: key,
      isPressed: true,
      delta: [pageX - pressX, pageY - pressY],
      mouse: [pressX, pressY],
    });

    console.log('key:' + key + '::(pressX: ' + pressX + ', pressY: '+ pressY + ')::(pageX: ' + pageX + ', pageY: ' + pageY + ')');
  },

  handleMouseUp() {
    this.setState({isPressed: false});
  },

  render() {
    const {order, lastPress, isPressed, mouse} = this.state;

    return (
      <div className="demo2">
        <div className="demo2-main" />
  
          {students.map((student, key) => {

            // http://stackoverflow.com/questions/24273990/calculating-evenly-spaced-points-on-the-perimeter-of-a-circle
            // http://stackoverflow.com/questions/12742802/algorithm-to-spread-dots-evenly-on-a-circle-shell-model-chemistry
            const radius =  200// student.score > 0.7 ? 100 : 250;
            const col = student.score > 0.6 ? '#AAD219' : '#20A8CC';
            const testX  = radius * Math.cos(key * 2 * Math.PI / students.length) + 950/2 - 20;
            const testY  = radius * Math.sin(key * 2 * Math.PI / students.length) - 20;
            return (
              <div 
                onMouseDown={this.handleMouseDown.bind(null, key, [testX, testY])}
                onTouchStart={this.handleTouchStart.bind(null, key, [testX, testY])}
                key={key}
                className="student-ball"
                style={
                  {
                    backgroundColor: col,
                    WebkitTransform: `translate3d(${testX}px, ${testY}px, 0) scale(1)`,
                    transform: `translate3d(${testX}px, ${testY}px, 0) scale(1)`,
                  }}>

                {student.name}

              </div>
            );
          })}

        {/*order.map((_, key) => {
          let style;
          let x;
          let y;
          const visualPosition = order.indexOf(key);
          [x, y] = mouse;

          if (key === lastPress && isPressed) {
            style = {
              translateX: x,
              translateY: y,
              scale: spring(1.1, springSetting1),
            };
          } else {
            
            style = {
              // translateX: x,
              // translateY: y,
              scale: spring(1, springSetting1),   
            };
          }
          return (
            <Motion key={key} style={style}>
              {({translateX, translateY, scale}) =>
                <div
                  onMouseDown={this.handleMouseDown.bind(null, key, [x, y])}
                  onTouchStart={this.handleTouchStart.bind(null, key, [x, y])}
                  className="demo2-ball"
                  style={{
                    backgroundColor: allColors[key],
                    WebkitTransform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                    transform: `translate3d(${translateX}px, ${translateY}px, 0) scale(${scale})`,
                    zIndex: key === lastPress ? 99 : visualPosition,
                  }}
                />
              }
            </Motion>
          );
        }) */}
      </div>
    );
  },
});

export default Demo;
