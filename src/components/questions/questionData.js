
// iv_type = view, drag, hypothetical
// question_level = sense(0), decision(0)
// display_type = tabular, pm, custom
// each iv_type (3) * each question_level (2) * controls (3) = 18
// for each iv_type, show control (table), traditional (pm), or custom (iv) at each question_level


// 
const questions = [
{
  ivType: 1,
  name: 'questions',
  questions: [{ 
    type: "checkbox",
    name: "answer", 
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
  ivType: 1,
  name: 'questions',
  questions: [{ 
    type: "checkbox", 
    name: "answer", 
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
  ivType: 2,
  name: 'questions',
  questions: [{
    title: "Who is the best?",
    type: "radiogroup",
    name: 'answer',
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
  ivType: 2,
  name: 'questions',
  questions: [{
    title: "Who is the absolute worst ever?",
    type: "radiogroup",
    name: 'answer',
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
},
{
  ivType: 3,
  name: 'questions',
  questions: [
  {
    title: "What is an achievable next-measure goal for Sang that keeps him on track to be within 10% of his end-of-year goal?",
    name: "answer",
    isRequired: true,
    type: "text",
    inputType: "number"
  }]
},
{
  ivType: 3,
  name: 'questions',
  questions: [{
    title: "Who is the absolute worst ever?",
    type: "radiogroup",
    name: 'answer',
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
      "1",
      "2",
      "3",
      "4",
      "5"
    ],  
  },
  {
    type: "rating",
    isRequired: true,
    maxRateDescription: "very confident",
    minRateDescription: "not at all confident",
    name: "confidence",
    rateValues: [
      "1",
      "2",
      "3",
      "4",
      "5"
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
      "1",
      "2",
      "3",
      "4",
      "5"
    ],
    title: "How much did you enjoy answering this question?"
  },
  {
    type: "rating",
    isRequired: true,
    maxRateDescription: "very much",
    minRateDescription: "not at all",
    name: "experience",
    rateValues: [
      "1",
      "2",
      "3",
      "4",
      "5",
      "6",
      "7",
      "8",
      "8",
      "9",
      "10",
      "11",
      "12",
      "13",
      "14",
      "15",
      "16",
      "17",
      "18",
      "19",
      "20"
    ],
    title: "How much mental and perceptual activity was required (e.g. thinking, deciding, calculating, remembering, looking, searching, etc)? Was the task easy or demanding, simple or complex, exacting or forgiving?"
  }
]};

const answers = [
  {
    questionID: 1,
    answer: ['Allegra', 'Sang', 'Shayla', 'Damaris', 'Reagan', 'Corinne'],
    type: 'array',
  },
  {
    questionID: 2,
    answer: ['Allegra', 'Sang', 'Shayla', 'Damaris', 'Reagan'],
    type: 'array',
  },
  {
    questionID: 3,
    answer: ['Allegra', 'Sang', 'Shayla', 'Damaris', 'Reagan'],
    type: 'array',
  },
  {
    questionID: 4,
    answer: ['Allegra', 'Sang', 'Shayla', 'Damaris', 'Reagan'],
    type: 'array',
  },
  {
    questionID: 5,
    answer: 97,
    type: 'numeric',
  },
  {
    questionID: 6,
    answer: ['Allegra', 'Sang', 'Shayla', 'Damaris', 'Reagan'],
    type: 'array',
  },
  {
    questionID: 7,
    answer: ['Allegra', 'Sang', 'Shayla', 'Damaris', 'Reagan'],
    type: 'array',
  },
  {
    questionID: 8,
    answer: ['Allegra', 'Sang', 'Shayla', 'Damaris', 'Reagan'],
    type: 'array',
  }
];

const testModel = [
  {
    blockId: 0,
    type: 0,
    title: 'Which student are struggling (identify)?',
    choices: [
      'Elene, Arlinda, Joseph, Shiela, Leota', 
      'Dennis, Tegan, Anette, Justa', 
      'Shayla, Allegra, Corinne, Reagan, Damaris, Sang, Dennis', 
      'None of the above',
    ],
  },
  {
    blockId: 0,
    type: 0,
    title: 'Which student are doing really well (identify)?',
    choices: [
      'Elene, Arlinda, Joseph, Shiela, Leota', 
      'Dennis, Tegan', 
      'Shayla, Allegra, Corinne, Reagan, Damaris, Sang, Dennis', 
      'None of the above',
    ],
  },
  {
    blockId: 0,
    type: 1,
    title: 'Which student are within 20% of their end of year goal (decide)?',
    choices: [
      'Elene, Arlinda, Joseph, Shiela, Leota', 
      'Dennis, Tegan, Anette, Justa', 
      'Shayla, Allegra, Corinne, Reagan, Damaris, Sang, Dennis', 
      'None of the above',
    ],
  },
  {
    blockId: 0,
    type: 1,
    title: 'Which student are struggling (decide)?',
    choices: [
      'Elene, Arlinda, Joseph, Shiela, Leota', 
      'Dennis, Tegan, Anette, Justa', 
      'Shayla, Allegra, Corinne, Reagan, Damaris, Sang, Dennis', 
      'None of the above',
    ],
  },
  {
    blockId: 0,
    type: 2,
    title: 'Which student are doing really well (evaluate)?',
    choices: [
      'Elene, Arlinda, Joseph, Shiela, Leota', 
      'Dennis, Tegan', 
      'Shayla, Allegra, Corinne, Reagan, Damaris, Sang, Dennis', 
      'None of the above',
    ],
  },
  {
    blockId: 0,
    type: 2,
    title: 'Which student are within 20% of their end of year goal (evaluate)?',
    choices: [
      'Elene, Arlinda, Joseph, Shiela, Leota', 
      'Dennis, Tegan, Anette, Justa', 
      'Shayla, Allegra, Corinne, Reagan, Damaris, Sang, Dennis', 
      'None of the above',
    ],
  },


  {
    blockId: 1,
    type: 0,
    title: 'Which student are struggling (identify)?',
    choices: [
      'Elene, Arlinda, Joseph, Shiela, Leota', 
      'Dennis, Tegan, Anette, Justa', 
      'Shayla, Allegra, Corinne, Reagan, Damaris, Sang, Dennis', 
      'None of the above',
    ],
  },
  {
    blockId: 1,
    type: 0,
    title: 'Which student are doing really well (identify)?',
    choices: [
      'Elene, Arlinda, Joseph, Shiela, Leota', 
      'Dennis, Tegan', 
      'Shayla, Allegra, Corinne, Reagan, Damaris, Sang, Dennis', 
      'None of the above',
    ],
  },
  {
    blockId: 1,
    type: 1,
    title: 'Which student are within 20% of their end of year goal (decide)?',
    choices: [
      'Elene, Arlinda, Joseph, Shiela, Leota', 
      'Dennis, Tegan, Anette, Justa', 
      'Shayla, Allegra, Corinne, Reagan, Damaris, Sang, Dennis', 
      'None of the above',
    ],
  },
  {
    blockId: 1,
    type: 1,
    title: 'Which student are struggling (decide)?',
    choices: [
      'Elene, Arlinda, Joseph, Shiela, Leota', 
      'Dennis, Tegan, Anette, Justa', 
      'Shayla, Allegra, Corinne, Reagan, Damaris, Sang, Dennis', 
      'None of the above',
    ],
  },
  {
    blockId: 1,
    type: 2,
    title: 'Which student are doing really well (evaluate)?',
    choices: [
      'Elene, Arlinda, Joseph, Shiela, Leota', 
      'Dennis, Tegan', 
      'Shayla, Allegra, Corinne, Reagan, Damaris, Sang, Dennis', 
      'None of the above',
    ],
  },
  {
    blockId: 1,
    type: 2,
    title: 'Which student are within 20% of their end of year goal (evaluate)?',
    choices: [
      'Elene, Arlinda, Joseph, Shiela, Leota', 
      'Dennis, Tegan, Anette, Justa', 
      'Shayla, Allegra, Corinne, Reagan, Damaris, Sang, Dennis', 
      'None of the above',
    ],
  },


  {
    blockId: 2,
    type: 0,
    title: 'Which student are struggling (identify)?',
    choices: [
      'Elene, Arlinda, Joseph, Shiela, Leota', 
      'Dennis, Tegan, Anette, Justa', 
      'Shayla, Allegra, Corinne, Reagan, Damaris, Sang, Dennis', 
      'None of the above',
    ],
  },
  {
    blockId: 2,
    type: 0,
    title: 'Which student are doing really well (identify)?',
    choices: [
      'Elene, Arlinda, Joseph, Shiela, Leota', 
      'Dennis, Tegan', 
      'Shayla, Allegra, Corinne, Reagan, Damaris, Sang, Dennis', 
      'None of the above',
    ],
  },
  {
    blockId: 2,
    type: 1,
    title: 'Which student are within 20% of their end of year goal (decide)?',
    choices: [
      'Elene, Arlinda, Joseph, Shiela, Leota', 
      'Dennis, Tegan, Anette, Justa', 
      'Shayla, Allegra, Corinne, Reagan, Damaris, Sang, Dennis', 
      'None of the above',
    ],
  },
  {
    blockId: 2,
    type: 1,
    title: 'Which student are struggling (decide)?',
    choices: [
      'Elene, Arlinda, Joseph, Shiela, Leota', 
      'Dennis, Tegan, Anette, Justa', 
      'Shayla, Allegra, Corinne, Reagan, Damaris, Sang, Dennis', 
      'None of the above',
    ],
  },
  {
    blockId: 2,
    type: 2,
    title: 'Which student are doing really well (evaluate)?',
    choices: [
      'Elene, Arlinda, Joseph, Shiela, Leota', 
      'Dennis, Tegan', 
      'Shayla, Allegra, Corinne, Reagan, Damaris, Sang, Dennis', 
      'None of the above',
    ],
  },
  {
    blockId: 2,
    type: 2,
    title: 'Which student are within 20% of their end of year goal (evaluate)?',
    choices: [
      'Elene, Arlinda, Joseph, Shiela, Leota', 
      'Dennis, Tegan, Anette, Justa', 
      'Shayla, Allegra, Corinne, Reagan, Damaris, Sang, Dennis', 
      'None of the above',
    ],
  },
];

const questionData = {
  questions: questions,
  ratings: ratings,
  answers: answers,
  testModel: testModel,
};

export default questionData;
