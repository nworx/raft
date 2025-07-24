"use client"

import  React,{useEffect} from "react"

import { useState } from "react"
import { CalendarIcon } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { useToast } from "@/components/ui/use-toast";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useRouter } from 'next/navigation';
import { createProject } from "@/services/project/createProject"
import { updateProject } from "@/services/project/updateProject"
import useProjectStore from "@/zustand/projectStore"
import { SearchBox } from "@/utilities/searchBox"
import getAllUsers from "@/services/profile/getAllUsers"
import useUserStore from "@/zustand/userStore"

export function CreateProjectDialog({ open, onOpenChange,projectData,process, onProjectChange }) {

  const router = useRouter();
  const { toast } = useToast();
  const setProject = useProjectStore.getState().setCurrentProject;
  const user = useUserStore((state) => state.user);

  console.log(projectData,"rajj",process,open)
  const [formData, setFormData] = useState({
    id: null,
    name: "",
    priority: "",
    description: "",
    startDate: "",
    endDate: "",
    category: "",
    status: "",
    members: [],
    docs: [{ type: "", name: "", link: "" }],
  });


  const handleDocChange = (index, field, value) => {
    const updatedDocs = [...formData.docs];
    updatedDocs[index][field] = value;
    setFormData({ ...formData, docs: updatedDocs });
  };

  const addNewDocRow = () => {
    setFormData((prev) => ({
      ...prev,
      docs: [...(prev.docs || []), { type: "", name: "", link: "" }],
    }));
  };

  const removeDocRow = (index) => {
    setFormData((prev) => ({
      ...prev,
      docs: prev?.docs.filter((_, i) => i !== index),
    }));
  };



  const [errors, setErrors] = useState({})

  const [users, setUsers] = useState([]);
  const [selectedUsernames, setSelectedUsernames] = useState([]);

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSelectChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleNumberChange = (e) => {
    const { name, value } = e.target
    const numValue = Number.parseInt(value) || 0
    setFormData((prev) => ({ ...prev, [name]: numValue }))
  }

  const handleDateChange = (field, date) => {
    setFormData(prev => ({ ...prev, [field]: date }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.name?.trim()) {
      newErrors.name = "Project name is required";
    }

    if (!formData?.description?.trim()) {
      newErrors.description = "Description is required";
    }

    if (!formData?.priority?.trim()) {
      newErrors.priority = "Priority is required";
    }

    if (!formData?.startDate) {
      newErrors.startDate = "Start date is required";
    }

    if (!formData?.endDate) {
      newErrors.endDate = "End date is required";
    }

    if (formData.startDate && formData.endDate && new Date(formData.endDate) < new Date(formData.startDate)) {
      newErrors.endDate = "End date cannot be before start date";
    }

    if (!formData?.category?.trim()) {
      newErrors.category = "Category is required";
    }

    if (!formData?.status?.trim()) {
      newErrors.status = "Status is required";
    }

    if (!Array.isArray(selectedUsernames) || selectedUsernames?.length === 0) {
      newErrors.members = "At least one member is required";
    } 

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };


  const handleSubmit = async (e) => {
  console.log("handleSubmit called", formData);
  e.preventDefault();

  if (!validateForm()) {
    console.log("Please fill form properly" , errors);
    toast({
      title: "Form Incomplete",
      description: "Please fill out all required fields correctly.",
      variant: "destructive",
    });
    return;
  }

  setIsLoading(true);

  try {
    if (process === "UPDATE") {
      await updateProject(formData);
      toast({
        title: "Project Updated",
        description: "The project was updated successfully.",
      });
    } else {
      await createProject(formData);
      console.log(formData, "response9696");
      toast({
        title: "Project Created",
        description: "The project was created successfully.",
      });
    }

    if (onProjectChange) {
      await onProjectChange();
    }

    // Reset form
    setFormData({
      name: "",
      description: "",
      priority: "Medium",
      tasks: 0,
      createdBy: "",
      category: "Engineering",
      status: "Active",
    });
    setErrors({});
    onOpenChange(false);
  } catch (error) {
    console.error("Error in project submission:", error);
    toast({
      title: "Submission Failed",
      description: "Something went wrong. Please try again.",
      variant: "destructive",
    });
  } finally {
    setIsLoading(false);
  }
};


  const slugify = (text) => {
    return text
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, '-') // replace spaces/special chars with "-"
      .replace(/^-+|-+$/g, ''); // remove leading/trailing "-"
  }

  const handleViewAllTasks = () => {

    setProject(projectData);

    const projectName = slugify(projectData.name);
    const id = projectData.id;

    router.push(`/raft/project-dashboard?project=${projectName}&id=${id}`);
  };

  // Fetch all users on mount
  useEffect(() => {
    const getAllUsersFunc = async () => {
      try {
        const response = await getAllUsers();
        if (Array.isArray(response)) {
          setUsers(response);
        }
      } catch (err) {
        console.error(err);
      }
    };
    getAllUsersFunc();
  }, []);

  // Update formData.members whenever selectedUsernames change
  useEffect(() => {
    const selectedEmails = users
      .filter((user) => selectedUsernames.includes(user.username))
      .map((user) => ({ email: user.email }));
    console.log(selectedUsernames, "selectedUsernames");

    setFormData((prev) => ({
      ...prev,
      members: selectedUsernames,
    }));
  }, [selectedUsernames, users]);

  useEffect(()=>{console.log("raj")})

  useEffect(()=>{
    console.log(process,projectData,"useEEffect")
    if(process==="UPDATE"){
      setFormData(projectData);
      const userEmails = projectData?.members?.map(member => member.user.email) || [];
      console.log(projectData, userEmails, "projectData?.members");
      
      setSelectedUsernames(userEmails);
    }else{
      // setFormData({});

      setFormData({
        id: null,
        name: "",
        priority: "",
        description: "",
        startDate: "",
        endDate: "",
        category: "",
        status: "",
        members: [user?.email],
      });

      setSelectedUsernames([user?.email]);
    }
   },[open])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[90vw] max-w-4xl h-[90vh] overflow-hidden items-center">
        <form onSubmit={handleSubmit} className="h-[80vh] ">
          <DialogHeader>
            <DialogTitle>{process==="UPDATE"?"Update":"Create New"} Project</DialogTitle>
            <DialogDescription>
              Fill in the details to create a new project. Fields marked with * are required.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-[calc(100%-6rem)] pr-2 py-2">
          <div className="grid gap-4 py-4 p-1">
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="name" className="flex items-center">
                Project Name *
              </Label>
              <Input
                id="name"
                name="name"
                value={formData?.name}
                onChange={handleChange}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
            </div>

            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="description" className="flex items-center">
                Description *
              </Label>
              <Textarea
                id="description"
                name="description"
                value={formData?.description || ""}
                onChange={handleChange}
                rows={3}
                className={errors.description ? "border-red-500" : ""}
              />
              {errors.description && <p className="text-red-500 text-sm">{errors.description}</p>}
            </div>
            
            <div className="grid grid-cols-1 gap-2">
              <Label htmlFor="status" className="flex items-center">
                  Members *
                </Label>
                {/* <SearchBox/> */}
                <SearchBox
                  users={users}
                  selectedUsernames={selectedUsernames}
                  onChange={setSelectedUsernames}
                  currentUserEmail={user?.email}
                />
                {errors.members && <p className="text-red-500 text-sm">{errors.members}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* <div className="grid gap-2">
                <Label className="flex items-center">Start Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={`w-full justify-start text-left font-normal ${
                        !formData?.startDate && "text-muted-foreground"
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData?.startDate ? format(formData?.startDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar mode="single" selected={formData?.startDate} onSelect={(date) => handleDateChange('startDate', date)} />
                  </PopoverContent>
                </Popover>
                {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
              </div> */}

              <div className="grid gap-2">
                <Label className="flex items-center">Start Date</Label>
                <input
                  type="date"
                  value={formData?.startDate ? formData.startDate : ''}
                  onChange={(e) => handleDateChange('startDate', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                {errors.startDate && <p className="text-red-500 text-sm">{errors.startDate}</p>}
              </div>

              <div className="grid gap-2">
                <Label className="flex items-center">Due Date</Label>
                <input
                  type="date"
                  value={formData?.endDate ? formData.endDate : ''}
                  onChange={(e) => handleDateChange('endDate', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                {errors.endDate && <p className="text-red-500 text-sm">{errors.endDate}</p>}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="priority" className="flex items-center">
                  Priority *
                </Label>
                <Select value={formData?.priority} onValueChange={(value) => handleSelectChange("priority", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Low">Low</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Critical">Critical</SelectItem>
                  </SelectContent>
                </Select>
                {errors.priority && <p className="text-red-500 text-sm">{errors.priority}</p>}
              </div>

              <div className="grid gap-2">
                <Label htmlFor="category" className="flex items-center">
                  Team *
                </Label>
                <Select value={formData?.category} onValueChange={(value) => handleSelectChange("category", value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select team" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Engineering">Engineering</SelectItem>
                    <SelectItem value="Design">Design</SelectItem>
                    <SelectItem value="Marketing">Marketing</SelectItem>
                    <SelectItem value="Sales">Sales</SelectItem>
                    <SelectItem value="Support">Support</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-red-500 text-sm">{errors.category}</p>}
              </div>
            </div>
            

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="status" className="flex items-center">
                  Status *
                </Label>
                <Select value={formData?.status} onValueChange={(value) => handleSelectChange("status", value )}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ACTIVE">Active</SelectItem>
                    <SelectItem value="ON_HOLD">On Hold</SelectItem>
                    <SelectItem value="COMPLETED">Completed</SelectItem>
                  </SelectContent>
                </Select>
                {errors.status && <p className="text-red-500 text-sm">{errors.status}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 gap-2">
              <Label className="flex items-center">
                Project Documents
              </Label>

              <div className="overflow-x-auto">
                <table className="w-full text-sm border border-gray-300 rounded-md">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="w-[10%] text-left px-2 py-2">Type</th>
                      <th className="w-[60%] text-left px-2 py-2">Name</th>
                      <th className="w-[30%] text-left px-2 py-2">Link</th>
                    </tr>
                  </thead>
                  <tbody>
                    {formData.docs?.map((doc, index) => (
                      <tr key={index} className="border-t">
                        <td className="px-2 py-2">
                          <input
                            type="text"
                            value={doc.type}
                            onChange={(e) => handleDocChange(index, "type", e.target.value)}
                            className="w-full border px-2 py-1 rounded-md"
                          />
                        </td>
                        <td className="px-2 py-2">
                          <input
                            type="text"
                            value={doc.name}
                            onChange={(e) => handleDocChange(index, "name", e.target.value)}
                            className="w-full border px-2 py-1 rounded-md"
                          />
                        </td>
                        <td className="px-2 py-2 flex gap-2 items-center">
                          <input
                            type="url"
                            value={doc.link}
                            onChange={(e) => handleDocChange(index, "link", e.target.value)}
                            className="w-full border px-2 py-1 rounded-md"
                          />
                          {formData.docs.length > 1 && (
                            <button
                              type="button"
                              onClick={() => removeDocRow(index)}
                              className="text-red-500 hover:text-red-700"
                              title="Remove"
                            >
                              ✕
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                type="button"
                onClick={addNewDocRow}
                className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 text-sm bg-gray-100 border rounded hover:bg-gray-200"
              >
                ➕ Add Document
              </button>
            </div>


          </div>
          </ScrollArea>
          <DialogFooter>
            <div className="flex justify-between items-center w-full">
              {projectData?.id && <Button type="button" onClick={handleViewAllTasks} disabled={isLoading} >View All Tasks</Button>}

              <div className={`flex gap-2 ${!projectData?.id ? 'justify-between items-center w-full' : ''}`}>
                <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isLoading}>
                  Cancel
                </Button>
                <Button type="submit" className="w-36" disabled={isLoading}>
                  {/* {process === "UPDATE"?"Update ":"Create " }Project */}
                  {isLoading? (
                    <div className="w-4 h-4 border-2 border-[#999999] border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      {process === "UPDATE" ? "Update" : "Create"} Project
                    </>
                  )}
                </Button>
              </div>
            </div>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}

