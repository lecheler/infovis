const questions = [
{
  blorp: 'ok',
  name: 'questions',
  questions: [{ 
    type: "checkbox", 
    name: "q1", 
    title: "Which student(s) should be given extra attention or modified instruction? ", 
    isRequired: true, 
    colCount: 3, 
    choices: [
      "Elene",
      "Reagan", 
      "Zackary", 
      "Justa", 
      "Corinne", 
      "Tegan", 
      "Damaris", 
      "Shayla", 
      "Sang", 
      "Anette", 
      "Leota",
      "Joseph",
      "Shiela",
      "Arlinda",
      "Allegra",
    ] 
  }]
},
{
  name: 'questions',
  questions: [{ 
    type: "checkbox", 
    name: "q2", 
    title: "Which student(s) are making adequate progress toward their goal?", 
    isRequired: true, 
    colCount: 3, 
    choices: [
      "Elene",
      "Reagan", 
      "Zackary", 
      "Justa", 
      "Corinne", 
      "Tegan", 
      "Damaris", 
      "Shayla", 
      "Sang", 
      "Anette", 
      "Leota",
      "Joseph",
      "Shiela",
      "Arlinda",
      "Allegra",
    ] 
  }]
},
{
  name: 'questions',
  questions: [{
    title: "Who is the best?",
    type: "radiogroup",
    name: 'q3',
    colCount: 4,
    isRequired: true,
    choices: [
      {
       value: 1,
       text: "Elene"
      },
      {
       value: "2",
       text: "Sang"
      },
      {
       value: "3",
       text: "Sheila"
      },
      {
       value: "4",
       text: "Justa"
      }
    ],
  }]
},
{
  name: 'questions',
  questions: [{
    title: "Who is the absolute worst ever?",
    type: "radiogroup",
    name: 'q4',
    colCount: 4,
    isRequired: true,
    choices: [
      {
       value: 1,
       text: "Bloop"
      },
      {
       value: "2",
       text: "Blorp"
      },
      {
       value: "3",
       text: "Sheila"
      },
      {
       value: "4",
       text: "Justa"
      }
    ],
  }]
}];

const ratings = 
{ 
  name: "feedback",
  questions: [
  {
    title: "How difficult was this question?",
    type: "rating",
    isRequired: true,
    maxRateDescription: "very difficult",
    minRateDescription: "very easy",
    name: "difficulty",
    rateValues: [
      "easy - 1",
      "2",
      "3",
      "4",
      "5 - difficult"
    ],  
  },
  {
    type: "rating",
    isRequired: true,
    maxRateDescription: "very confident",
    minRateDescription: "not at all confident",
    name: "confidence",
    rateValues: [
      "not confident - 1",
      "2",
      "3",
      "4",
      "5 - confident"
      ],
    title: "How confident are you in your answer?"
  },
  {
    type: "rating",
    isRequired: true,
    maxRateDescription: "very much",
    minRateDescription: "not at all",
    name: "experience",
    rateValues: [
      "not at all - 1",
      "2",
      "3",
      "4",
      "5 - very much"
    ],
    title: "How much did you enjoy answering this question?"
  }
]};

const questionData = {
  questions: questions,
  ratings: ratings,
};

export default questionData;
