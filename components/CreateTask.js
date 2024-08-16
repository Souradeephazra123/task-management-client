"use client";
import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CreateTask = ({search,searchStatus}) => {
  // const searchParams = useSearchParams();
  // const search = searchParams.get("name");
  // const searchStatus = searchParams.get("status");

  const [projectName, setProjectName] = useState("");
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("Select Status");
  const [taskStatus, setTaskStatus] = useState("Select Task Status");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (search) {
      setProjectName(search);
    }
    if (searchStatus) {
      setStatus(searchStatus);
    }
  }, [search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user =
      typeof window !== "undefined" && JSON.parse(localStorage.getItem("user"));

    let body = {
      userId: user?.id,
      projectName: projectName,
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
      title: title,
      taskStatus: taskStatus,
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/task`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      if (response.ok) {
        toast.success("Task created successfully");
        setDescription("");
        setProjectName("");
        setEndDate("");
        setStartDate("");
        setStatus("Select Status");
        setTaskStatus("Select Task Status");
        setTitle("");
      } else {
        toast.error("Failed to create task");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className=" flex flex-col gap-10 p-4">
      <p>New Task</p>
      <hr className=" h-[0.1px] border-blue-600 b w-full" />

      <div className=" rounded p-4 border-blue-600 border-t-2 shadow-md ">
        <form onSubmit={handleSubmit}>
          <div className=" flex flex-col gap-5">
            <div className=" w-full flex gap-3">
              <div className=" w-1/2 flex flex-col gap-2 border-black rounded">
                <label>Name</label>
                <input
                  id="projectName"
                  name="projectName"
                  value={projectName}
                  onChange={(e) => setProjectName(e.target.value)}
                  type="text"
                  placeholder="project name"
                />
              </div>
              <div className=" w-1/2 flex flex-col gap-2 border-black rounded">
                <label>Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  name="status"
                  id="status"
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
                <label>Title</label>
                <input
                  id="title"
                  name="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  type="text"
                  placeholder="task title"
                  required
                />
              </div>
              <div className=" w-1/2 flex flex-col gap-2 border-black rounded">
                <label>Task Status</label>
                <select
                  value={taskStatus}
                  onChange={(e) => setTaskStatus(e.target.value)}
                  name="taskStatus"
                  id="taskStatus"
                  required
                >
                  <option value="Select Status">Select Task status</option>
                  <option value="pending">pending</option>
                  <option value="started">started</option>
                  <option value="done">done</option>
                </select>
              </div>
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
              Create Task
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreateTask;
