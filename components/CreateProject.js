"use client";
import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateProject = () => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Select Status");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [projectManager, setProjectManager] = useState("");
  const [projectMembers, setProjectMembers] = useState("");
  const [priority, setPriority] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user =
      typeof window !== "undefined" && JSON.parse(localStorage.getItem("user"));

    const formData = new FormData();
    formData.append("userId", user?.id);
    formData.append("name", name);
    formData.append("status", status);
    formData.append("description", description);
    formData.append(
      "startDate",
      new Date(startDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    );
    formData.append(
      "endDate",
      new Date(endDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      })
    );
    formData.append("priority", priority);
    formData.append("projectMangaer", projectManager);
    formData.append("projectTeamMembers", projectMembers);

    let body = {
      userId: user?.id,
      name: name,
      status: status,
      description: description,
      startDate: new Date(startDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      endDate: new Date(endDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }),
      priority: priority,
      projectMangaer: projectManager,
      projectTeamMembers: projectMembers,
    };

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/project`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      if (response.ok) {
        toast.success("Project created successfully");
        setDescription("");
        setName("");
        setPriority("");
        setProjectManager("");
        setProjectMembers("");
        setEndDate("");
        setStartDate("");
        setStatus("Select Status");
      } else {
        toast.error("Failed to create project");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className=" flex flex-col gap-10 p-4">
      <p>New Project</p>
      <hr className=" h-[0.1px] border-blue-600 b w-full" />

      <div className=" rounded p-4 border-blue-600 border-t-2 shadow-md ">
        <form onSubmit={handleSubmit}>
          <div className=" flex flex-col gap-5">
            <div className=" w-full flex gap-3">
              <div className=" w-1/2 flex flex-col gap-2 border-black rounded">
                <label>Name</label>
                <input
                  id="name"
                  name="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="project name"
                  required
                />
              </div>
              <div className=" w-1/2 flex flex-col gap-2 border-black rounded">
                <label>Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  name="status"
                  id="status"
                  required
                >
                  <option value="Select Status">Select status</option>
                  <option value="on-progress">on-progress</option>
                  <option value="started">started</option>
                  <option value="completed">completed</option>
                </select>
              </div>
            </div>
            <div className=" w-full flex gap-3">
              <div className=" w-1/2 flex flex-col gap-2 border-black rounded">
                <label>Start Date</label>
                <input
                  id="startDate"
                  name="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  type="date"
                  placeholder="e.g. 7 july 2024"
                  required
                />
              </div>
              <div className=" w-1/2 flex flex-col gap-2 border-black rounded">
                <label>End Date</label>
                <input
                  id="endDate"
                  name="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  type="date"
                  placeholder="e.g. 7 august 2024"
                  required
                />
              </div>
            </div>
            <div className=" w-full flex gap-3">
              <div className=" w-1/2 flex flex-col gap-2 border-black rounded">
                <label>Project Manager</label>
                <input
                  id="projectManager"
                  name="projectManager"
                  value={projectManager}
                  onChange={(e) => setProjectManager(e.target.value)}
                  type="text"
                  placeholder="project manager"
                />
              </div>
              <div className=" w-1/2 flex flex-col gap-2 border-black rounded">
                <label>Project member</label>
                <input
                  id="projectMembers"
                  name="projectMembers"
                  value={projectMembers}
                  onChange={(e) => setProjectMembers(e.target.value)}
                  type="text"
                  placeholder="project members"
                />
              </div>
            </div>
            <div className=" w-1/2 flex flex-col gap-2 border-black rounded">
              <label>Priority</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                name="priority"
                id="priority"
                required
              >
                <option value="Select Priority">Select Priority</option>
                <option value="low">low</option>
                <option value="medium">medium</option>
                <option value="high">high</option>
              </select>
            </div>
            <div className=" flex flex-col gap-2 border-black rounded">
              <label>Description</label>
              <textarea
                id="description"
                name="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="description"
              />
            </div>
            <button
              type="submit"
              className=" bg-blue-600 text-white p-2 rounded"
            >
              Create Project
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateProject;
