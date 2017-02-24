const exampleSurvey = {
 pages: [
  {
   name: "page1",
   questions: [
    {
     type: "matrix",
     columns: [
      {
       value: "1",
       text: "very disatisfied"
      },
      {
       value: "2 ",
       text: "somewhat disatisfied"
      },
      {
       value: "3",
       text: "neutral"
      },
      {
       value: "4",
       text: "somewhat satisfied"
      },
      {
       value: "5",
       text: "satisfied"
      }
     ],
     name: "question1",
     rows: [
      "1"
     ],
     title: "How confident are you in your answer?"
    },
    {
     type: "matrix",
     columns: [
      {
       value: "1",
       text: "very disatisfied"
      },
      {
       value: "2 ",
       text: "somewhat disatisfied"
      },
      {
       value: "3",
       text: "neutral"
      },
      {
       value: "4",
       text: "somewhat satisfied"
      },
      {
       value: "5",
       text: "satisfied"
      }
     ],
     name: "question2",
     rows: [
      "1"
     ],
     title: "Satisfaction"
    }
   ]
  }
 ]
};


const demographic = {
 pages: 
  [
    {
      name: "page1",
      questions: [
      {
        type: "text",
        inputType: "email",
        name: "question1",
        title: "Email"
      },
      {
        type: "text",
        inputType: "number",
        name: "question2",
        title: "Age"
      },
      {
        type: "dropdown",
        isRequired: true,
        choices: [
        {
         value: "1",
         text: "High School"
        },
        {
         value: "2",
         text: "Some College"
        },
        {
         value: "3",
         text: "Bachelor’s Degree"
        },
        {
         value: "4",
         text: "Master's Degree"
        },
        {
         value: "5",
         text: "Professional Degree"
        },
        {
         value: "6",
         text: "Doctorate Degree"
        },
        {
         value: "7",
         text: "other"
        }
        ],
        name: "question1",
        title: "Education"
        }
      ]
    }
  ],
  completedHtml: '<p>woo hoo</p>'
}

const constants = {
  SURVEY_DEMOGRAPHIC: demographic,
  SURVEY_EXAMPLE: exampleSurvey,
};

export default constants;
