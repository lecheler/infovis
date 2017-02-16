import React from 'react';
import {Motion, spring} from 'react-motion';

// http://chenglou.github.io/react-motion/demos/demo5-spring-parameters-chooser/
const springSetting1 = {stiffness: 180, damping: 20};

const students = [
  { name:'a', score: Math.round(Math.random()*100)}, // note: name treated as unique below...
  { name:'b', score: Math.round(Math.random()*100)},
  { name:'c', score: Math.round(Math.random()*100)},
  { name:'d', score: Math.round(Math.random()*100)},
  { name:'e', score: Math.round(Math.random()*100)},
  { name:'f', score: Math.round(Math.random()*100)},
  { name:'g', score: Math.round(Math.random()*100)},
  { name:'h', score: Math.round(Math.random()*100)},
  { name:'i', score: Math.round(Math.random()*100)},
  { name:'j', score: Math.round(Math.random()*100)},
  { name:'k', score: Math.round(Math.random()*100)},
  { name:'l', score: Math.round(Math.random()*100)},
  { name:'m', score: Math.round(Math.random()*100)},
  { name:'n', score: Math.round(Math.random()*100)},
  { name:'o', score: Math.round(Math.random()*100)},
  { name:'p', score: Math.round(Math.random()*100)},
  { name:'q', score: Math.round(Math.random()*100)},
  { name:'r', score: Math.round(Math.random()*100)},
  { name:'s', score: Math.round(Math.random()*100)},
  { name:'t', score: Math.round(Math.random()*100)},
  { name:'u', score: Math.round(Math.random()*100)},
  { name:'v', score: Math.round(Math.random()*100)},
];

const Demo = React.createClass({
  getInitialState() {
    return {
      mouse: [0, 0],
      delta: [0, 0], // difference between mouse and circle pos, for dragging
      lastPress: null, // key of the last pressed component
      isPressed: false,
      students: students,
      ready: false,
    };
  },

  componentDidMount() {
    window.addEventListener('touchmove', this.handleTouchMove);
    window.addEventListener('touchend', this.handleMouseUp);
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);

    this.setInitialLayout();
  },

  handleTouchStart(key, pressLocation, e) {
    this.handleMouseDown(key, pressLocation, e.touches[0]);
  },

  handleTouchMove(e) {
    e.preventDefault();
    this.handleMouseMove(e.touches[0]);
  },

  handleMouseMove({pageX, pageY}) {
    const {isPressed, delta: [dx, dy]} = this.state;
    if (isPressed) {
      const mouse = [pageX - dx, pageY - dy];
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

  setInitialLayout() {
    students.forEach((student, key) => {
     let radius =  300;
     let col = '#C80054';
     let s = students.filter(function(x){return x.score <= 30});

     if (student.score > 60) {
       radius = 100;
       col = '#AAD219';
       s = students.filter(function(x){return x.score > 60});
     } else if (student.score > 30) {
       radius = 200;
       col = '#20A8CC';
       s = students.filter(function(x){return x.score > 30 && x.score <= 60});
     }

     let testX  = radius * Math.cos(s.findIndex(x => x.name===student.name) * 2 * Math.PI / s.length) + 950/2 - 20;
     let testY  = radius * Math.sin(s.findIndex(x => x.name===student.name) * 2 * Math.PI / s.length) + 200/2 - 20;

     student.position = {x: testX, y: testY};
     student.color = col;
    });

    this.setState({ready: true});
  },
  render() {
    console.log(this.state.ready);
    const {lastPress, isPressed, mouse} = this.state;
    if (!this.state.ready) {
      return(
        <div>not ready</div>
      );
    }
    return (
      <div className="demo2">
        <div className="demo2-main" />
  
          {
            this.state.students.map((student, key) => {
              let scale = 1;
              let style = {
                scale: spring(1, springSetting1),
              };

              if (key === lastPress && isPressed) {
                scale = 1.2;
                student.position.x = mouse[0];
                student.position.y = mouse[1];
             
                const a = mouse[0] - 450; // why is (450, 80) the center?
                const b = mouse[1] - 80;
                const distance = Math.sqrt( a*a + b*b );

                if (distance >= 250) {
                  student.color = '#C80054';
                } else if (distance >= 150) {
                  student.color = '#20A8CC';
                } else {
                  student.color = '#AAD219';
                }

                style = {
                  scale: spring(1.3, springSetting1),
                };
              }

              return (
                <Motion key={key} style={style}>
                  {({scale}) =>
                    <div 
                      onMouseDown={this.handleMouseDown.bind(null, key, [student.position.x, student.position.y])}
                      onTouchStart={this.handleTouchStart.bind(null, key, [student.position.x, student.position.y])}
                      key={key}
                      className="student-ball"
                      style={
                        {
                          backgroundColor: student.color,
                          WebkitTransform: `translate3d(${student.position.x}px, ${student.position.y}px, 0) scale(${scale})`,
                          transform: `translate3d(${student.position.x}px, ${student.position.y}px, 0) scale(${scale})`,
                        }}>
                    </div>
                  }
                </Motion>
              );
            })
          }
      </div>
    );
  },
});

export default Demo;
