"use client";
import { selectTaskDetailsData } from "@/Redux/slice/getAllTaskSlice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllTask = () => {
  const dispatch = useDispatch();
  const TaskDetail = useSelector(selectTaskDetailsData);

  const [modalOpen, setModalOpen] = useState(false);
  const [alldata, setAllData] = useState([]);
  const [userData, setUserData] = useState("");
  const [selectedData, setSelectedData] = useState([]);
  const [taskStatus, setTaskStatus] = useState("Select Task Status");
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [description, setDescription] = useState("");
  const [count,setCount]=useState(0);
  const user =
    typeof window !== "undefined" && JSON.parse(localStorage.getItem("user"));
  if (user && userData === "") {
    setUserData(user.id);
  }

  useEffect(() => {
    if (userData) {
      if (TaskDetail?.length === 0 && count<5) {
        console.log("dispatching data");
        dispatch({ type: "FETCH_ALL_TASK_DETAILS_DATA", payload: userData });
        setCount(count+1);
      } else {
        setAllData(TaskDetail);
      }
    }
  }, [userData, TaskDetail]);

  const handleClickUpdate = (title) => {
    setModalOpen(true);
    setTitle(title);
  };

  const handleUpdateData = async (event) => {
    event.preventDefault();
    let body = {
      userId: user?.id,
      title: title,
    };

    if (description !== "") {
      body.description = description;
    }
    if (startDate !== "") {
      body.startDate = new Date(startDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    }
    if (endDate !== "") {
      body.endDate = new Date(endDate).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "long",
        year: "numeric",
      });
    }
    if (taskStatus !== "Select Task Status") {
      body.taskStatus = taskStatus;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/task`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      if (response.ok) {
        toast.success("Task updated successfully");
        setDescription("");
        setEndDate("");
        setStartDate("");
        setTaskStatus("Select Task Status");
        dispatch({ type: "FETCH_ALL_TASK_DETAILS_DATA", payload: userData });
        setModalOpen(false);
      } else {
        toast.error("Task not updated");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  const handleClickDelete = async (itemtitle) => {
    let body = {
      userId: user?.id,
      title: itemtitle,
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/task`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      if (response.ok) {
        toast.success("Task deleted successfully");
        dispatch({ type: "FETCH_ALL_TASK_DETAILS_DATA", payload: userData });
      } else {
        toast.error("Task not deleted");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className=" p-3">
      <div className=" flex justify-between">
        <p>All Task</p>
        <Link href={"/task/add"}>
          <button className=" bg-blue-400 rounded">Add Task</button>
        </Link>
      </div>
      <div className=" border-green-400 border-t-2 rounded">
        <table className=" border-black border">
          <thead>
            <tr>
              <th>#</th>
              <th>Project</th>
              <th>Task</th>
              <th>Task Started</th>
              <th>Task Due Date</th>
              <th>Project status</th>
              <th>Task status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className=" divide-y divide-gray-200">
            {TaskDetail.map((row, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm ">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm ">
                  <p>{row?.projectName ?? ""}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm ">
                  <p className=" font-bold">{row?.title}</p>
                  <p>{row?.description}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm ">
                  <p className=" text-xs">
                    <span>Due:</span>
                    <span>
                      {new Date(row?.startDate).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm ">
                  <p className=" text-xs">
                    <span>Due:</span>
                    <span>
                      {new Date(row?.endDate).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm ">
                  {row?.status ?? ""}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm ">
                  {row?.taskStatus}
                </td>
                <td className=" flex flex-col gap-2">
                  <button
                    onClick={() => handleClickUpdate(row?.title)}
                    className=" bg-green-400 p-1 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleClickDelete(row?.title)}
                    className=" bg-red-400 p-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modalOpen && (
        <div className="z-30 bg-[rgba(2,2,2,0.27)] fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-full w-full flex justify-center items-center">
          <div className="  text-center  bg-gray-500 opacity-100 border-[1px] border-Grey-8 px-32 py-6 rounded 2xl:p-4 flex flex-col gap-2">
            <form onSubmit={handleUpdateData} className=" flex flex-col gap-3">
              <div className="flex flex-col gap-2 border-black rounded">
                <label>Task Status</label>
                <select
                  value={taskStatus}
                  onChange={(e) => setTaskStatus(e.target.value)}
                  name="taskStatus"
                  id="taskStatus"
                >
                  <option value="Select Status">Select Task status</option>
                  <option value="pending">pending</option>
                  <option value="started">started</option>
                  <option value="done">done</option>
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
              <div className="  flex flex-col gap-2 border-black rounded">
                <label>Start Date</label>
                <input
                  id="startDate"
                  name="startDate"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  type="date"
                  placeholder="e.g. 7 july 2024"
                />
              </div>
              <div className="  flex flex-col gap-2 border-black rounded">
                <label>End Date</label>
                <input
                  id="endDate"
                  name="endDate"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                  type="date"
                  placeholder="e.g. 7 august 2024"
                />
              </div>
              <button
                type="submit"
                className=" bg-rose-500 rounded w-fit p-1.5"
              >
                Update Data
              </button>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default AllTask;
