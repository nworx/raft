"use client"
import axios from "axios";

 const fetchTasksByProjectId = async ({projectId}) => {
    // console.log(name,description,"name,description")
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
    const response = await axios.get(`http://localhost:8080/fetchTaskByProjectId/${projectId}`, {
      headers: {
        "Content-Type": "application/json"
      }
    });

    console.log("fetchTaskByProjectId successfully:", response.data);
  } catch (error) {
    console.error("Error fetchTaskByProjectId:", error.response ? error.response.data : error.message);
  }
};

export default  fetchTasksByProjectId;
