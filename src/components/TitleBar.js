import React from "react";
import { getDateString } from "../helper";
export const TitleBar = () => {
  const dateString = getDateString();

  return (
    <div className="block titlebar">
      <span className="date">{dateString}</span>
      <span>To-Do App</span>
    </div>
  );
};
