"use client"
import axios from "axios";

 const createTask = async ({name,description}) => {
    console.log(name,description,"name,description")
  const taskData = {
    name: name,
    description_text: description,
    description_fileLink: [
     
    ],
    createAt: new Date().toISOString(),
    createdBy: "Raju",
    status: "Pending"
  };

  try {
    const response = await axios.post("http://localhost:8080/createTask", taskData, {
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
