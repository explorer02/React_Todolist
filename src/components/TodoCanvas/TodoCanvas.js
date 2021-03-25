import { faCheck, faSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import TodoCard from "../../UI/TodoCard/TodoCard";
import "./TodoCanvas.css";

export const TodoCanvas = React.memo(
  ({
    todoList,
    selectedTodos,
    onToggleSelect,
    onToggleComplete,
    onDeleteTodo,
    onSetEditMode,
    onBatchComplete,
    onBatchUndo,
    onBatchDelete,
  }) => {
    const iconStyle = { height: "100%", width: "100%", color: "white" };
    return (
      <div className="block todocanvas">
        <div className="todocanvas-display">
          {todoList.map((t) => (
            <TodoCard
              todo={{ ...t, isSelected: selectedTodos.has(t.id) }}
              styles={{ flex: "0 0 25%", height: "40%" }}
              key={t.id}
              onToggleSelection={onToggleSelect}
              onToggleComplete={onToggleComplete}
              onDeleteTodo={onDeleteTodo}
              onSetEditMode={onSetEditMode}
            />
          ))}
        </div>
        <div className="todocanvas-option-menu">
          <div className="todocanvas-option" onClick={onBatchComplete}>
            <FontAwesomeIcon icon={faCheck} style={iconStyle} />
          </div>
          <div className="todocanvas-option" onClick={onBatchUndo}>
            <FontAwesomeIcon icon={faSquare} style={iconStyle} />
          </div>
          <div className="todocanvas-option" onClick={onBatchDelete}>
            <FontAwesomeIcon icon={faTrash} style={iconStyle} />
          </div>
        </div>
      </div>
    );
  }
);
