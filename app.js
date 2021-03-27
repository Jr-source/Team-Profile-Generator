const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");

const employeeList = [];

function askUserForManagerInfo() {
  console.log("ASK FOR MANAGER INFO!");
  return inquirer
    .prompt([
      {
        type: "input",
        message: "Please provide Manager's Name!",
        name: "name",
      },
      {
        type: "number",
        message: "Enter Manager's ID!",
        name: "id",
      },
      {
        type: "input",
        message: "Enter Manager's Email!",
        name: "email",
      },
      {
        type: "number",
        message: "Enter Manager's Office Number!",
        name: "officeNumber",
      },
    ])
    .then((managerData) => {
      const newManager = new Manager(
        managerData.name,
        managerData.id,
        managerData.email,
        managerData.officeNumber
      );

      employeeList.push(newManager);

      askUserForEmployeeType();
    });
}

function askUserForEmployeeType() {
  console.log(" ");
  console.log("EMPLOYEE TYPE!");

  return inquirer
    .prompt([
      {
        type: "list",
        message: "Which type of team member would you like to add?",
        choices: ["Engineer", "Intern", "I don't have any more member to add!"],
        name: "employeeType",
      },
    ])
    .then((newEmployeeChoiceData) => {
      if (newEmployeeChoiceData.employeeType === "Engineer") {
        askUserForEngineerInfo();
      } else if (newEmployeeChoiceData.employeeType === "Intern") {
        askUserForInternInfo();
      } else {
        createHTML();
      }
    });
}

function askUserForEngineerInfo() {
  console.log(" ");
  console.log("ENGINEER INFO!");
  return inquirer
    .prompt([
      {
        type: "input",
        message: "Please provide Engineer's Name!",
        name: "name",
      },
      {
        type: "number",
        message: "Enter Engineer's ID!",
        name: "id",
      },
      {
        type: "input",
        message: "Enter Engineer's Email!",
        name: "email",
      },
      {
        type: "input",
        message: "Enter Engineer's GitHub Username!",
        name: "github",
      },
    ])
    .then((engineerData) => {
      const newEngineer = new Engineer(
        engineerData.name,
        engineerData.id,
        engineerData.email,
        engineerData.github
      );

      employeeList.push(newEngineer);

      askUserForEmployeeType();
    });
}

function askUserForInternInfo() {
  console.log(" ");
  console.log("INTERN INFO!");
  return inquirer
    .prompt([
      {
        type: "input",
        message: "Please provide Intern's Name!",
        name: "name",
      },
      {
        type: "number",
        message: "Enter Intern's ID!",
        name: "id",
      },
      {
        type: "input",
        message: "Enter Intern's Email!",
        name: "email",
      },
      {
        type: "input",
        message: "Enter Intern's school!",
        name: "school",
      },
    ])
    .then((internData) => {
      const newInter = new Intern(
        internData.name,
        internData.id,
        internData.email,
        internData.school
      );

      employeeList.push(newInter);

      askUserForEmployeeType();
    });
}

function createHTML() {
  const htmlContent = render(employeeList);

  fs.writeFile(outputPath, htmlContent, function (err) {
    if (err) {
      console.log(err);
    }
    console.log("HTML file created");
  });
}

askUserForManagerInfo();
