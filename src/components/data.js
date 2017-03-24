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
      name: "Dennis",
      data: [65, 74, 75, 78, 74, 80, 84, 83, 89, 91]
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
      data: [70, 77, 84, 83, 82, 84, 92, 89, 90, 94]
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
      data: [75, 75, 80, 77, 80, 86, 94, 96, 98, 101]
    },
    {
      name: "Joseph",
      data: [80, 83, 78, 84, 97, 92, 93, 99, 108, 112]
    },
    {
      name: "Shiela",
      data: [73, 74, 76, 75, 79, 84, 92, 96, 101, 106]
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

const getRegressionLine = function(points) {
  const d = points.map((student, key) => {
    return([key, student]);
  });

  const result = regression('linear', d); 
  const m = result.equation[0];
  const y = result.equation[1];

  let val = [];
  for (var index = 0; index < studentCharts.labels.length; index++) {
    val.push(m*index + y);
  }

  return val;
}

const getAimLine = function(points) {
  const interval = (115 - points[0])/(studentCharts.labels.length-1);

  let start = points[0];
  let val = [start];

  for (var index = 1; index < studentCharts.labels.length; index++) {
    val.push(start+=interval);
  }

  return val;
}

const data = {
  STUDENT_CHARTS: studentCharts,
  getRegressionLine: getRegressionLine,
  getAimLine: getAimLine
};

export default data;
