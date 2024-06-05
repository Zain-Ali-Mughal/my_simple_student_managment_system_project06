#! /usr/bin/env node

// Making Student Managment System.

import inquirer from "inquirer";
import chalk from "chalk";

// Creating a class for the student
class Student {
  static counter = 10000; // Setting the counter to 5 digits for id.
  id: number;
  name: string;
  courses: string[]; // Initializing an empty array of courses.
  balance: number;

  // Constructor for the Student class
  constructor(name: string) {
    this.id = Student.counter++; // Adding increment to the counter for every new student.
    this.name = name;
    this.courses = [];
    this.balance = 100; // Setting the default balance for the student.
  }

  // Method to get the courses array from the student.
  addCourse(course: string) {
    this.courses.push(course); // Simply pushing the courses to array.
  }

  // Method to view student balance
  viewBalance() {
    console.log("-".repeat(50));
    console.log(
      chalk.bgBlue.white.bold(`Balance for ${this.name}: $${this.balance}`)
    );
    console.log("-".repeat(50));
  }

  // Method to pay tuition fee
  payTuitionFee(amount: number) {
    this.balance -= amount; // Subtracting paid amount from default balance of student.
    console.log("-".repeat(50));
    console.log(
      chalk.green.bold(`$${amount} fees paid successfully for ${this.name}`)
    );
    console.log(chalk.bgBlue.white.bold(`Remaining Balance: $${this.balance}`));
    console.log("-".repeat(50));
  }

  // Method to show all the details of the student including name, id, courses enrolled and balance.
  showDetails() {
    console.log("-".repeat(50));
    console.log(chalk.bold(`Name: ${this.name}`));
    console.log(chalk.bold(`ID: ${this.id}`));
    console.log(chalk.bold(`Courses: ${this.courses.join(", ")}`));
    console.log(chalk.bold(`Balance: $${this.balance}`));
    console.log("-".repeat(50));
  }
}

// Now let's make a class to manage the students.
class StudentManager {
  students: Student[];

  constructor() {
    this.students = [];
  }

  // Method to add a new student to the student array.
  addStudent(name: string) {
    let student = new Student(name);
    this.students.push(student);
    console.log("-".repeat(50));
    console.log(
      chalk.green.bold(
        `Student: ${name} added successfully. Student ID: ${student.id}`
      )
    );
    console.log("-".repeat(50));
  }

  // Method to enroll a student in a course.
  enrollStudent(studentId: number, course: string) {
    let student = this.findStudentById(studentId);
    if (student) {
      student.addCourse(course);
      console.log("-".repeat(50));
      console.log(
        chalk.green.bold(`Student ${student.name} enrolled in ${course}`)
      );
      console.log("-".repeat(50));
    } else {
      console.log("-".repeat(50));
      console.log(
        chalk.red.bold("Student not found. Please enter a correct student ID.")
      );
      console.log("-".repeat(50));
    }
  }

  // Method to view a student balance.
  viewBalance(studentId: number) {
    let student = this.findStudentById(studentId);
    if (student) {
      student.viewBalance();
    } else {
      console.log("-".repeat(50));
      console.log(
        chalk.red.bold("Student not found. Please enter a correct student ID.")
      );
      console.log("-".repeat(50));
    }
  }

  // Method to pay tuition fee.
  payTuitionFee(studentId: number, amount: number) {
    let student = this.findStudentById(studentId);
    if (student) {
      student.payTuitionFee(amount);
    } else {
      console.log("-".repeat(50));
      console.log(
        chalk.red.bold("Student not found. Please enter a correct student ID.")
      );
      console.log("-".repeat(50));
    }
  }

  // Method to show details of a student.
  showDetails(studentId: number) {
    let student = this.findStudentById(studentId);
    if (student) {
      student.showDetails();
    } else {
      console.log("-".repeat(50));
      console.log(
        chalk.red.bold("Student not found. Please enter a correct student ID.")
      );
      console.log("-".repeat(50));
    }
  }

  // Making a general method to find a student by id.
  findStudentById(studentId: number) {
    return this.students.find((std) => std.id === studentId);
  }
}

// Now creating the main function that will run the whole program.
async function main() {
  console.log("=".repeat(50));
  console.log(chalk.bgCyan.black.bold("\tStudent Management System"));
  console.log("=".repeat(50));

  let studentManager = new StudentManager();

  //   while loop to keep program running.
  while (true) {
    let choice = await inquirer.prompt([
      {
        type: "list",
        name: "choice",
        message: "What do you want to do?",
        choices: [
          "Add Student",
          "Enroll Student",
          "View Balance",
          "Pay Tuition Fee",
          "Show Details",
          "Exit",
        ],
      },
    ]);
    // Using switch case for user choice.
    switch (choice.choice) {
      case "Add Student": {
        let nameInput = await inquirer.prompt([
          {
            name: "name",
            message: "Enter student name",
            type: "input",
          },
        ]);
        studentManager.addStudent(nameInput.name);
        break;
      }
      case "Enroll Student": {
        let courseInput = await inquirer.prompt([
          {
            name: "studentId",
            message: "Enter student ID",
            type: "number",
          },
          {
            name: "course",
            message: "Enter course name",
            type: "input",
          },
        ]);
        studentManager.enrollStudent(
          parseInt(courseInput.studentId),
          courseInput.course
        );
        break;
      }
      case "View Balance": {
        let balanceInput = await inquirer.prompt([
          {
            name: "studentId",
            message: "Enter student ID",
            type: "number",
          },
        ]);
        studentManager.viewBalance(parseInt(balanceInput.studentId));
        break;
      }
      case "Pay Tuition Fee": {
        let feeInput = await inquirer.prompt([
          {
            name: "studentId",
            message: "Enter student ID",
            type: "input",
          },
          {
            name: "amount",
            message: "Enter amount to pay",
            type: "input",
          },
        ]);
        studentManager.payTuitionFee(
          parseInt(feeInput.studentId),
          parseFloat(feeInput.amount)
        );
        break;
      }
      case "Show Details": {
        let detailsInput = await inquirer.prompt([
          {
            name: "studentId",
            message: "Enter student ID",
            type: "input",
          },
        ]);
        studentManager.showDetails(parseInt(detailsInput.studentId));
        break;
      }
      case "Exit": {
        console.log("-".repeat(50));
        console.log(chalk.bgRed.black.bold("Exiting the program..."));
        console.log("-".repeat(50));
        process.exit();
      }
    }
  }
}

// Calling main function
main();
