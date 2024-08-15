"use client";
import React, { useEffect, useState } from "react";
import { selectProjectDetailsData } from "@/Redux/slice/getAllProjectSlice";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";

const Project = ({ name }) => {
  const [selectedData, setSelectedData] = useState([]);
  const [userData, setUserData] = useState("");
  const dispatch = useDispatch();
  const ProjectDetail = useSelector(selectProjectDetailsData);
  const user =
    typeof window !== "undefined" && JSON.parse(localStorage.getItem("user"));
  if (user && userData === "") {
    setUserData(user.id);
  }

  useEffect(() => {
    if (userData) {
      if (ProjectDetail.length === 0) {
        dispatch({ type: "FETCH_ALL_PROJECT_DETAILS_DATA", payload: userData });
      } else {
        const newData = ProjectDetail?.filter(
          (data) => data?.name === name?.replace(/%20/g, " ")
        );
        setSelectedData(newData);
      }
    }
  }, [userData, ProjectDetail, name]);
  let newSetData;
  if (name) {
    newSetData = ProjectDetail.filter(
      (data) => data.name === name.replace(/%20/g, " ")
    );
  }

  useEffect(() => {
    console.log(selectedData);
    console.log(ProjectDetail);
  }, [selectedData, ProjectDetail]);

  return (
    <div className=" flex flex-col gap-10 p-4">
      <p>View Project</p>
      <hr className=" border-blue-600 h-[0.5px]" />
      <div className=" flex gap-3 w-full shadow-md p-2 bg-gray-200">
        <div className=" w-1/2 flex flex-col gap-7">
          <div>
            <p className=" underline">Project Name</p>
            <p>{selectedData[0]?.name ?? ""}</p>
          </div>
          <div>
            <p className=" underline">Description</p>
            <p>{selectedData[0]?.description}</p>
          </div>
        </div>
        <div className=" w-1/2 flex flex-col gap-3">
          <div>
            <p className=" underline">Start Date</p>
            <p>
              {new Date(selectedData[0]?.startDate).toLocaleDateString(
                "en-US",
                {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                }
              )}
            </p>
          </div>
          <div>
            <p className=" underline">End Date</p>
            <p>
              {new Date(selectedData[0]?.endDate).toLocaleDateString("en-US", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>
          <div>
            <p className=" underline">Status</p>
            <p>{selectedData[0]?.status}</p>
          </div>
          <div>
            <p className=" underline">Project Manager</p>
            <p>{selectedData[0]?.projectMangaer}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-2 w-full">
        <div className=" w-1/3 shadow-md">
          <p>Team Members</p>
          <p>{selectedData[0]?.projectTeamMembers}</p>
        </div>
        <div className=" w-2/3 shadow-md">
          <div className=" flex justify-between">
            <p>Task List</p>
            <Link
              href={{
                pathname: "/task/add",
                query: {
                  name: selectedData[0]?.name,
                  status: selectedData[0]?.status,
                },
              }}
            >
              <button className=" p-1 bg-blue-700 rounded">New task</button>
            </Link>
          </div>
          <table className=" border-black border">
            <thead>
              <tr>
                <th>#</th>
                <th>Task</th>
                <th>Description</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Project;
