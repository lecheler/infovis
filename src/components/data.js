import regression from 'regression';


const studentCharts = 

{
  labels: ["Sept", "PM1", "PM2", "PM3", "Oct", "PM4", "PM5", "Jan", "PM7", "PM8", "PM9", "Mar", "PM10", "PM11", "PM12", "MAY"],
  datasets:
  [
    {
      name: "Elene",
      data: [45, 66, 71, 72, 85, 75, 91, 89, 111, 110]
    },
    {
      name: "Reagan",
      data: [76, 79, 82, 80, 81, 84, 87, 86, 86, 89]
    },
    {
      name: "Zackary",
      data: [65, 74, 75, 78, 74, 80, 84, 83, 89, 89]
    },
    {
      name: "Justa",
      data: [63, 61, 61, 70, 68, 82, 80, 81, 87, 95]
    },
    {
      name: "Corinne",
      data: [73, 74, 78, 79, 78, 79, 81, 84, 84, 85]
    },
    {
      name: "Tegan",
      data: [70, 77, 84, 83, 78, 93, 92, 89, 99, 99]
    },
    {
      name: "Damaris",
      data: [57, 65, 60, 71, 72, 76, 72, 80, 76, 84]
    },
    {
      name: "Shayla",
      data: [62, 58, 60, 69, 66, 69, 70, 75, 77, 76]
    },
    {
      name: "Sang",
      data: [68, 72, 71, 72, 75, 80, 77, 83, 85, 87]
    },
    {
      name: "Anette",
      data: [64, 66, 68, 67, 70, 76, 84, 85, 88, 93]
    },
    {
      name: "Leota",
      data: [75, 75, 80, 77, 80, 88, 99, 102, 102, 107]
    },
    {
      name: "Joseph",
      data: [80, 83, 78, 84, 97, 92, 93, 99, 108, 112]
    },
    {
      name: "Shiela",
      data: [73, 74, 81, 73, 79, 90, 97, 104, 101, 114]
    },
    {
      name: "Arlinda",
      data: [72, 79, 82, 90, 89, 99, 101, 104, 103, 113]
    },
    {
      name: "Allegra",
      data: [71, 71, 72, 70, 75, 80, 76, 80, 81, 84]
    },
  ]
};

// iv_type = view, drag, hypothetical
// question_level = sense(0), decision(0)
// display_type = tabular, pm, custom
// each iv_type (3) * each question_level (2) * controls (3) = 18
// for each iv_type, show control (table), traditional (pm), or custom (iv) at each question_level

const questions = 
[
  {
    id: 0,
    ivType: 0,
    level: 0,
    text: 'Leota’s goal for the next measure is 101, based on the goal line calculated at the beginning of the year. Since he is projected to exceed that score, you decide to set a new goal for his next measure that is achievable, yet motivating.',
  },
  {
    id: 1,
    ivType: 0,
    level: 0,
    text: 'Is Joseph meeting or exceeding his goal?',
  },
  {
    id: 2,
    ivType: 0,
    level: 0,
    text: 'Is Allegra meeting or exceeding her goal?',
  },
  {
    id: 3,
    ivType: 0,
    level: 1,
    text: "By how much would you adjust Elena's goal for the next task to make her end of term performance goal attainable?",
  },
  {
    id: 4,
    ivType: 0,
    level: 1,
    text: "By how much would you adjust Joseph's goal for the next task to make her end of term performance goal attainable?",
  },
  {
    id: 5,
    ivType: 0,
    level: 1,
    text: "By how much would you adjust Allegra's goal for the next task to make her end of term performance goal attainable?",
  },
  {
    id: 6,
    ivType: 1,
    level: 0,
    text: 'Look at the visualization below and select all students that are on track to be within 10% of reaching their goals by the end of the term.',
  },
  {
    id: 7,
    ivType: 1,
    level: 0,
    text: 'Look at the visualization below and select all students that are on track to be within 10% of reaching their goals by the end of the term.',
  },
  {
    id: 8,
    ivType: 1,
    level: 0,
    text: 'Look at the visualization below and select all students that are on track to be within 10% of reaching their goals by the end of the term.',
  },
  {
    id: 9,
    ivType: 1,
    level: 1,
    text: 'Look at the visualization below and select all students that are on track to be within 10% of reaching their goals by the end of the term.',
  },
  {
    id: 10,
    ivType: 1,
    level: 1,
    text: 'Look at the visualization below and select all students that are on track to be within 10% of reaching their goals by the end of the term.',
  },
  {
    id: 11,
    ivType: 1,
    level: 1,
    text: 'Look at the visualization below and select all students that are on track to be within 10% of reaching their goals by the end of the term.',
  },
  {
    id: 12,
    ivType: 2,
    level: 0,
    text: 'Look at the visualization below and select all students that are on track to be within 10% of reaching their goals by the end of the term.',
  },
  {
    id: 13,
    ivType: 2,
    level: 0,
    text: 'Look at the visualization below and select all students that are on track to be within 10% of reaching their goals by the end of the term.',
  },
  {
    id: 14,
    ivType: 2,
    level: 0,
    text: 'Look at the visualization below and select all students that are on track to be within 10% of reaching their goals by the end of the term.',
  },
  {
    id: 15,
    ivType: 2,
    level: 1,
    text: 'Look at the visualization below and select all students that are on track to be within 10% of reaching their goals by the end of the term.',
  },
  {
    id: 16,
    ivType: 2,
    level: 1,
    text: 'Look at the visualization below and select all students that are on track to be within 10% of reaching their goals by the end of the term.',
  },
  {
    id: 17,
    ivType: 2,
    level: 1,
    text: 'Look at the visualization below and select all students that are on track to be within 10% of reaching their goals by the end of the term.',
  }
]


const getRegressionLine = function(points) {
  const d = points.map((student, key) => {
    return([key, student]);
  });

  const result = regression('linear', d); 
  const m = result.equation[0];
  const y = result.equation[1];

  let val = [];
  for (var index = 0; index < data.STUDENT_CHARTS.labels.length; index++) {
    val.push(m*index + y);
  }

  return val;
}

const getAimLine = function(points) {
  const interval = (115 - points[0])/(data.STUDENT_CHARTS.labels.length-1);

  let start = points[0];
  let val = [start];

  for (var index = 1; index < data.STUDENT_CHARTS.labels.length; index++) {
    val.push(start+=interval);
  }

  return val;
}

const data = {
  STUDENT_CHARTS: studentCharts,
  QUESTIONS: questions,
  getRegressionLine: getRegressionLine,
  getAimLine: getAimLine
};

export default data;
