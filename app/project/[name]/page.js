import Project from "@/components/Project";
import React from "react";

export default async function Page({ params }) {
  const decoded = decodeURIComponent(params.name);

  return <Project name={decoded} />;
}
