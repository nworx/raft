"use client";

import { useEffect, useState } from "react";
import LeftNavbar from "../common/LeftNavbar";
import { Button } from "../ui/button";
import RichTextEditor from "../common/RichTextEditor";

export default function TicketDetails() {
    const id = typeof window !== "undefined" ? window.location.pathname.split("/").pop() : null; 

    const [task,setTask]=useState({
        title:"",
        descripion:"",
        environment:"",
        attachments:[],
        comments:[
            { id: 1, user: "Tech Team", text: "15 hours ago" },
        ],
        currentComment:""
    });

    const [editState,setEditState]=useState({
        title:false,
        descripion:false,
        environment:false,
        attachments:false
    });
    const [textEditorContent,setTextEditorContent]=useState("");


    // const [currentComments, setCurrentComments] = useState([
      
    // ]);
   

    const handleEditState=(e)=>{

    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setTask((prev) => ({ ...prev, [name]: value }));
    };
    
    
    const handleFileUpload = (e) => {
        const files = Array.from(e.target.files);
        setTask((prev) => ({ ...prev, attachments: [...prev.attachments, ...files] }));
    };


    useEffect(()=>{
        setTask({
             title:"In Dstudio > Collection > 'Add Sequence' Tab - After adding 9 steps > Not able to scroll and add more steps",
             descripion:"Screenshot attached for reference",
             environment:"Staging",
             comments:[
                { id: 1, user: "Tech Team", text: "15 hours ago" },
            ],
            currentComment:""
        })
    }
    ,[])

    return (
        <div className="p-6 bg-gray-100 min-h-screen min-w-screen">
            {/* Breadcrumb */}
            <div className="text-sm text-gray-600">
                <span className="text-blue-600 cursor-pointer">Projects</span> /
                <span className="text-blue-600 cursor-pointer"> NWORX4</span> /
                <span className="text-blue-600 cursor-pointer"> Add Parent</span> /
                <span className="text-red-600 font-semibold">{id}</span>
            </div>

            {/* Ticket Header */}
            <div className="bg-white p-4 rounded-md mt-4 shadow">
            {editState?.isEditing ? (
                <input
                    type="text"
                    className="w-full text-xl font-semibold border rounded px-2 py-1 focus:outline-none focus:ring focus:border-blue-400"
                    value={title}
                    onChange={handleChange}
                    onBlur={handleBlur} // Save when losing focus
                    onKeyDown={handleKeyDown} // Save when pressing Enter
                    autoFocus
                />
            ) : (
                <h1
                    className="text-xl font-semibold cursor-pointer hover:bg-gray-100 px-2"
                    onClick={handleEditState}
                >
                    {task?.title}
                </h1>
            )}
                <button className="mt-2 px-4 py-1 bg-blue-600 text-white rounded">+ Add</button>
            </div>

            
            <div className="flex flex-col md:flex-row gap-4 mt-4">
               
                <div className="flex-1 bg-white p-4 rounded-md shadow">
                    {/* Description */}
                    <h2 className="text-lg font-semibold">Description</h2>
                    <div className="p-4 border rounded-md mt-2">
                        <p>
                            {task?.descripion}
                        </p>
                        <img src="/ticket-screenshot.png" alt="Ticket Screenshot" className="mt-2 w-full h-auto border rounded-md" />
                    </div>

                    {/* Environment */}
                    <h2 className="text-lg font-semibold mt-4">Environment</h2>
                    <p className="p-4 border rounded-md mt-2 text-gray-500">{task?.environment}</p>

                    {/* Attachments */}
                    <h2 className="text-lg font-semibold mt-4">Attachments</h2>
                    <div className="p-4 border rounded-md mt-2">
                        <div className="flex items-center space-x-2">
                            <img src="/attachment.png" alt="Attachment" className="w-12 h-12 border rounded-md" />
                            <p className="text-blue-600 cursor-pointer">image-202502...056.png</p>
                        </div>
                    </div>
                </div>

                {/* Right Side - Ticket Metadata */}
                <div className="w-full md:w-1/3 bg-white p-4 rounded-md shadow">
                    <h2 className="text-lg font-semibold">Details</h2>
                    <div className="mt-2">
                        <p><strong>Assignee:</strong> <span className="text-blue-600 cursor-pointer">Deepak</span></p>
                        <p><strong>Reporter:</strong> <span className="text-blue-600 cursor-pointer">Shenbaga Priya</span></p>
                        <p><strong>Priority:</strong> <span className="text-yellow-500">Medium</span></p>
                    </div>

                    <Button
                    //  className="mt-4 px-4 py-1 bg-blue-600 text-white rounded w-full"
                     >Assign to me</Button>

                    {/* Automation Section */}
                    <h2 className="text-lg font-semibold mt-4">Automation</h2>
                    <p className="text-gray-500">Rule executions</p>

                    {/* Meta Info */}
                    <p className="mt-4 text-gray-500 text-sm">
                        Created February 13, 2025 at 3:51 PM
                    </p>
                    <p className="text-gray-500 text-sm">
                        Updated February 13, 2025 at 3:51 PM
                    </p>
                </div>
            </div>

            {/* Comments Section */}
            <div className="bg-white p-4 rounded-md shadow mt-4">
                <h2 className="text-lg font-semibold">Activity</h2>
                <div className="flex mt-2">
                    <button className="px-4 py-1 text-blue-600 border-b-2 border-blue-600">All</button>
                    <button className="px-4 py-1 text-gray-600">Comments</button>
                    <button className="px-4 py-1 text-gray-600">History</button>
                    <button className="px-4 py-1 text-gray-600">Work log</button>
                </div>

                {/* Comment Input */}
                <div className="mt-4">
                <RichTextEditor
               
                setTextEditorContent={setTextEditorContent}
                onSend
                />
                    {/* <textarea
                        placeholder="Add a comment..."
                        className="w-full p-2 border rounded-md"
                        name="currentComment"
                        onChange={handleChange}
                        value={task?.currentComment}
                    /> */}
                    <div className="mt-2 flex space-x-2">
                        {task?.currentComment?.length <1 ?
                        <>
                        <button className="bg-green-500 px-4 py-1 text-white rounded" 
                        onClick={()=> setTask((prev)=>({
                            ...prev,
                            currentComment:"✅ This is on track"})
                        )} 
                            >✅ This is on track</button>
                        <button className="bg-red-500 px-4 py-1 text-white rounded"
                         onClick={()=> setTask((prev)=>({
                            ...prev,
                            currentComment:"🚫 This is blocked"})
                        )} 
                        >🚫 This is blocked</button>
                        <button className="bg-yellow-500 px-4 py-1 text-white rounded"
                        onClick={()=> setTask((prev)=>({
                            ...prev,
                            currentComment:"🤔 Can you clarify...?"})
                        )} 
                        >🤔 Can you clarify...?</button>
                        </>
                        :<></>
                        }
                    </div>
                </div>

                {/* Display Comments */}
                <div className="mt-4">
                    {task?.comments?.map((comment) => (
                        <p key={comment.id} className="text-gray-600">{comment.user} - {comment.text}</p>
                    ))}
                </div>
            </div>
        </div>
       
    );
}
