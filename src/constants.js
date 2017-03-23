const demographic = {
 pages: 
  [
    {
      name: "page1",
      questions: [

        // 1. Email
        {
          name: "email",
          type: "text",
          inputType: "email",
          title: "Email",
        },

        // 2. Age
        {
          name: "age",
          type: "text",
          inputType: "number",
          title: "Age",
        },

        // 3. Gender
        {
          name: "gender",
          title: "Gender",
          type: "dropdown",
          isRequired: true,
          choices: [
            {
             value: "male",
             text: "Male"
            },
            {
             value: "female",
             text: "Female"
            },
          ],
        },

        // 4. Education
        {
          name: "education",
          title: "Education",
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
        },

        // 5. Experience
        {
          name: "experience",
          type: "matrix",
          columns: [
            {
              value: "1",
              text: "disagree"
            },
            {
              value: "2",
              text: "somewhat disagree"
            },
            {
              value: "3",
              text: "neutral"
            },
            {
              value: "4",
              text: "somewhat agree"
            },
            {
              value: "6",
              text: "agree"
            }
          ],
          
          rows: [
            {
              value: "stats",
              text: "I have experience with statistics",
            },
            {
              value: "charts",
              text: "I have experience using charts or graphs to solve problems",
            },
            {
              value: "cbm",
              text: "I am familiar with progress monitoring and Curriculum Based Measures (CBM)",
            },
          ],
          isRequired: true
        },
      ]
    }
  ],
  completedHtml: '<p>woo hoo</p>'
}

const GREEN = '#AAD219';
const BLUE = '#20A8CC';
const RED = '#C80054';

const constants = {
  SURVEY_DEMOGRAPHIC: demographic,
  GREEN: GREEN,
  BLUE: BLUE,
  RED: RED
};

export default constants;
