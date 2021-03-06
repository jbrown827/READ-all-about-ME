const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");
const markdownTemplate = require("./markdownTemplate");

const writeFileAsync = util.promisify(fs.writeFile);

// * Function to grab user input
const getUserInfo = () => {
  return inquirer.prompt([
    {
      type: "input",
      name: "username",
      message: "What is your GitHub username?",
    },
    {
      type: "input",
      name: "email",
      message: "What is your email address?",
    },
    {
      type: "input",
      name: "title",
      message: "What is the name of your project?",
    },
    {
      type: "input",
      name: "description",
      message: "Write a description of your project.",
    },
    {
      type: "checkbox",
      name: "license",
      message: "What type of license does your project use?",
      choices: ["MIT", "Apache 2.0", "GNU GPLv3", "BSD-3", "MPL 2.0", "None"],
    },
    {
      type: "input",
      name: "install",
      message: "What command should be run to install the dependencies?",
    },
    {
      type: "input",
      name: "test",
      message: "What command should be run to run test?",
    },
    {
      type: "input",
      name: "usage",
      message: "What does the user need to know about using the repo?",
    },
    {
      type: "input",
      name: "contribute",
      message: "Who are the contributors to the project?",
    },
  ]);
};

// * Function to create README
const generateReadMe = async () => {
  try {
    const answers = await getUserInfo();
    const markDown = markdownTemplate(answers);

    writeFileAsync("TELLME.md", markDown);
    console.log("Success generating TELLME.md");
  } catch (err) {
    console.log(err);
  }
};

generateReadMe();
