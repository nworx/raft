"use client"
import axios from "axios";

 const fetchTask = async ({projectId}) => {
    console.log(name,description,"name,description")
//   const taskData = {
//     name: name,
//     description_text: description,
//     description_fileLink: [
     
//     ],
//     createAt: new Date().toISOString(),
//     createdBy: "Raju",
//     status: "Pending"
//   };

  try {
    const response = await axios.get("http://localhost:8080/fetchTask", {
      headers: {
        "Content-Type": "application/json"
      }
    });

    console.log("Task created successfully:", response.data);
  } catch (error) {
    console.error("Error creating task:", error.response ? error.response.data : error.message);
  }
};

export default  createTask;
