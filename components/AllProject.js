"use client";
import { selectProjectDetailsData } from "@/Redux/slice/getAllProjectSlice";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AllProject = () => {
  const dispatch = useDispatch();
  const ProjectDetail = useSelector(selectProjectDetailsData);
  console.log(ProjectDetail);

  const [alldata, setAllData] = useState([]);
  const [userData, setUserData] = useState("");
  const [selectedData, setSelectedData] = useState([]);
  const [name, setName] = useState("");
  const [status, setStatus] = useState("Select Status");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  const [projectteamMebers, setProjectTeamMembers] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [count, setCount] = useState(0);
  const user =
    typeof window !== "undefined" && JSON.parse(localStorage.getItem("user"));
  if (user && userData === "") {
    setUserData(user.id);
  }

  useEffect(() => {
    console.log("userdata", userData);

    if (userData) {
      if (ProjectDetail.length === 0 && count < 5) {
        console.log("dispatching data");
        dispatch({ type: "FETCH_ALL_PROJECT_DETAILS_DATA", payload: userData });
        setCount(count + 1);
      } else {
        setAllData(ProjectDetail);
      }
    }
  }, [userData, ProjectDetail]);

  const handleClickUpdate = (title) => {
    setModalOpen(true);
    setName(title);
  };

  const handleUpdateData = async (event) => {
    event.preventDefault();
    let body = {
      userId: user?.id,
      name: name,
    };

    if (description !== "") {
      body.description = description;
    }
    if (status !== "Select Status") {
      body.status = status;
    }
    if (priority !== "") {
      body.priority = priority;
    }
    if (projectteamMebers !== "") {
      body.projectTeamMembers = projectteamMebers;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/project`,
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
        setName("");
        setPriority("");
        setProjectTeamMembers("");
        setStatus("Select Status");
        dispatch({ type: "FETCH_ALL_PROJECT_DETAILS_DATA", payload: userData });
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
      name: itemtitle,
    };
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_API_URL}/project`,
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
        dispatch({ type: "FETCH_ALL_PROJECT_DETAILS_DATA", payload: userData });
      } else {
        toast.error("Task not deleted");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div className=" p-10">
      <div className=" flex justify-between">
        <p>AllProject</p>
        <Link href={"/project/add"}>
          <button className=" bg-blue-400 rounded">Add Project</button>
        </Link>
      </div>
      <div className=" border-green-400 border-t-2 rounded">
        <table className=" border-black border">
          <thead>
            <tr>
              <th>#</th>
              <th>Project</th>
              <th>Progress</th>
              <th>Status</th>
              <th>Details</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className=" divide-y divide-gray-200">
            {ProjectDetail.map((row, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap text-sm ">
                  {index + 1}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm ">
                  <p>{row.name}</p>
                  <p className=" text-xs">
                    <span>Due:</span>
                    <span>
                      {new Date(row.endDate).toLocaleDateString("en-US", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                  </p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm ">0%</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm ">
                  {row.status}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm ">
                  <Link href={`/project/${row.name}`}>
                    <button className=" bg-blue-500 p-2 rounded">view</button>
                  </Link>
                </td>
                <td className=" flex flex-col gap-2">
                  <button
                    onClick={() => handleClickUpdate(row?.name)}
                    className=" bg-green-400 p-1 rounded"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleClickDelete(row?.name)}
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
                <label>Project Status</label>
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
              <div className=" flex flex-col gap-2 border-black rounded">
                <label>Priority</label>
                <input
                  id="priority"
                  name="priority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  type="text"
                  placeholder="priority"
                />
              </div>
              <div className=" flex flex-col gap-2 border-black rounded">
                <label>ProjectTeamMembers</label>
                <input
                  id="projectteamMebers"
                  name="projectteamMebers"
                  value={projectteamMebers}
                  onChange={(e) => setProjectTeamMembers(e.target.value)}
                  type="text"
                  placeholder="projectteamMebers"
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

export default AllProject;
