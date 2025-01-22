// // const http = require("http");
// // const calculate=require('./calculator')

// // const server = http.createServer((req, res) => {
// //   res.writeHead(200, { "Content-Type": "text/html" });
// //   res.write("<h1>Addition : " + calculate.add(5, 7) + "</h1>");
// //   res.write("<h1>Subtraction : " + calculate.sub(10, 3) + "</h1>");
// //   res.end("<h1>Multiplication : " + calculate.mul(5, 7) + "</h1>");
// // });

// // server.listen(3000,()=>{
// //     console.log("Server is running on http://127.0.0.1.3000")
// // })


// const fs=require('fs');

// // //read
// // fs.readFile('sample1.text',"utf8",(err,data)=>{
// // if(err){
// //     console.error(err)
// //     return
// // }
// // console.log(data)
// // });

// // //write
// // fs.writeFile('sample.text',"Hello world",(err)=>{
// //     if(err){
// //         console.error(err);
       
// //         }
// //         });

// //json
// const newPerson={
//     name:"John",
//     age:25,
//     city:"New York"
// }
//         fs.readFile('sample.json','utf8',(err,data)=>{
//             if(err){
//                 console.error(err)
//                 return
//         }
//         const json=JSON.parse(data)
//         json.push(newPerson)

//         const updatedData=json.stringify(json)

//         fs.writeFile('sample.json',updatedData,(err)=>{
//             if(err){
//                 console.error(err)
//                 return;
//             }
//             console.log("updated successfully")
//         })
//         console.log(json)
//     })



const fs = require("fs");
const filePath = "sample.json";

function createStudent(newStudent) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }
    const json = JSON.parse(data);
    json.push(newStudent);
    fs.writeFile(filePath, JSON.stringify(json, null, 2), (err) => {
      if (err) {
        console.error("Error writing to the file:", err);
      } else {
        console.log("New student added successfully!");
      }
    });
  });
}

function readStudents() {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }
    const json = JSON.parse(data);
    console.log("Students List:", json);
  });
}

function updateStudent(rollNo, updatedData) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }
    const json = JSON.parse(data);
    const updatedJson = json.map((student) =>
      student.rollNo === rollNo ? { ...student, ...updatedData } : student
    );
    fs.writeFile(filePath, JSON.stringify(updatedJson, null, 2), (err) => {
      if (err) {
        console.error("Error writing to the file:", err);
      } else {
        console.log(`Student with roll number ${rollNo} updated successfully!`);
      }
    });
  });
}

function deleteStudent(rollNo) {
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error("Error reading the file:", err);
      return;
    }
    const json = JSON.parse(data);
    const updatedJson = json.filter((student) => student.rollNo !== rollNo);
    fs.writeFile(filePath, JSON.stringify(updatedJson, null, 2), (err) => {
      if (err) {
        console.error("Error writing to the file:", err);
      } else {
        console.log(`Student with roll number ${rollNo} deleted successfully!`);
      }
    });
  });
}

createStudent({
  studentName: "Dharun",
  rollNo: 104,
  dob: "2002-12-10",
  dept: "IT",
});

readStudents();

updateStudent(103, { studentName: "Alice Walker", dept: "Mechanical" });

deleteStudent(102);