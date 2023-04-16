// const { Configuration, OpenAIApi } = require("openai");
// const fs = require("fs");
import { Configuration, OpenAIApi } from "openai";

// require("dotenv").config();

const configuration = new Configuration({
  apiKey: "REPLACE THIS",
});
const openai = new OpenAIApi(configuration);

var initial_prompt = [
  {
    role: "system",
    content:
      "You are a career advisor that will help edit resumes for your client, the user.",
  },
  {
    role: "user",
    content: `Act as a career advisor whose purpose to help maximize my chances of receiving an offer from a company I will tell you.
 You will first check my resume for grammar issues and replace words you see fit that will make the resume stronger. Please provide all the feedback after the revised resume and maintain that the first line of your response of the revised resume matches the first line of the inputted resume.
Afterwards, I will prompt you with more information about the company, and revise my resume more to make the resume a better fit for the company.
`,
  },
];

var resume_prompt = [
  {
    role: "user",
    content:
      "I will now provide you with the pdf in text format. Check for grammatical errors and if possible reword or rewrite sentences to make it stronger.",
  },
  { role: "user", content: test_resume },
];

export async function runResponse(resume) {
  var initial_prompt = [
    {
      role: "system",
      content:
        "You are a career advisor that will help edit resumes for your client, the user.",
    },
    {
      role: "user",
      content: `Act as a career advisor whose purpose to help maximize my chances of receiving an offer from a company I will tell you.
   You will first check my resume for grammar issues and replace words you see fit that will make the resume stronger. Please provide all the feedback after the revised resume and maintain that the first line of your response of the revised resume matches the first line of the inputted resume.
  Afterwards, I will prompt you with more information about the company, and revise my resume more to make the resume a better fit for the company.
  `,
    },
  ];

  var resume_prompt = [
    {
      role: "user",
      content:
        "I will now provide you with the pdf in text format. Check for grammatical errors and if possible reword or rewrite sentences to make it stronger.",
    },
    { role: "user", content: resume },
  ];

  prompt = initial_prompt.concat(resume_prompt)

  const response = await openai.createChatCompletion({
    model: "gpt-3.5-turbo",
    messages: prompt,
  });
  //   console.log(response.data.choices[0].message);
  var response_string = response.data.choices[0];
  // initial_prompt.push({role: "assistant", content: response_string});
  return response_string;
}

export function findResumeDiff(resume_string, old_resume_string) {
  var split_new_resume = resume_string.split("\n"); //Split the string into lines and then check the difference
  var split_old_resume = old_resume_string.split("\n");
  var i = 0;
  while (i < split_old_resume.length) {
    var old_line = split_old_resume[i];
    var new_line = split_new_resume[i];
    var old_line_split = old_line.split(" ");
    var new_line_split = new_line.split(" ");
    // console.log(old_line, new_line);
    for (var j = 0; j < old_line_split.length; j++) {
      if (old_line_split[j] != new_line_split[j]) {
        //diff exists
        // console.log(old_line_split[j], new_line_split[j])
        console.log(strikeThrough(old_line_split[j]), new_line_split[j]);
      }
    }
    i++;
  }
}
function strikeThrough(text) {
  return text
    .split("")
    .map((char) => char + "\u0336")
    .join("");
}

// runResponse(initial_prompt.concat(resume_prompt)).then((res) => {
//   resume_string = res["message"]["content"];
//   console.log(resume_string);
//   findResumeDiff(resume_string, test_resume);

//   // Write edited resume to 'updated_resume.txt' .
//   // fs.writeFile("updated_resume.txt", resume_string, (err) => {
//   //   // In case of a error throw err.
//   //   if (err) throw err;
//   // });
// });
// console.log(response_string);
// findResumeDiff(response_string, test_resume);
// const response = await openai.listEngines();
