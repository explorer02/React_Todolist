import React from "react";

export const Analytics = React.memo(({ todoList }) => {
  const count = todoList.filter((t) => t.isComplete).length;
  const total = todoList.length;
  return (
    <div className="block analytics">
      <div>
        <p>{`${Math.round((count * 100) / (total ? total : 1))} %`}</p>
        <br />
        <p>{`${count} / ${total}`}</p>
      </div>
      <p>Analytics</p>
    </div>
  );
});
