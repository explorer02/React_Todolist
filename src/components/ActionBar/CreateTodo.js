import React from "react";
import { TodoForm } from "../../UI/TodoForm/TodoForm";

export const CreateTodo = React.memo(({ onSubmit }) => {
  return (
    <div className="block createtodo">
      <div className="createtodo-heading">
        <div>Create Todo</div>
      </div>
      <div className="createtodo-form">
        <TodoForm onSubmit={onSubmit} />
      </div>
    </div>
  );
});
