import React from "react";
import "./TodoCard.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBook,
  faEdit,
  faExclamationTriangle,
  faTrash,
  faUser,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import {
  CATEGORY_ACADEMIC,
  CATEGORY_SOCIAL,
  URGENCY_HIGH,
  URGENCY_MEDIUM,
} from "../../constants";

function TodoCard({
  todo,
  styles,
  onToggleSelection,
  onToggleComplete,
  onDeleteTodo,
  onSetEditMode,
}) {
  let urgencyIconColor = "gray";

  if (todo.urgency === URGENCY_MEDIUM) {
    urgencyIconColor = "yellow";
  } else if (todo.urgency === URGENCY_HIGH) {
    urgencyIconColor = "red";
  }

  let categoryIcon = faUser;
  let categoryIconColor = "cyan";

  if (todo.category === CATEGORY_ACADEMIC) {
    categoryIcon = faBook;
    categoryIconColor = "grey";
  } else if (todo.category === CATEGORY_SOCIAL) {
    categoryIcon = faUsers;
    categoryIconColor = "orange";
  }

  const iconStyle = {
    margin: "auto",
    height: "100%",
    width: "100%",
    display: "block",
  };

  return (
    <div
      style={{ ...styles }}
      className={
        "todocard" +
        (todo.isSelected ? " selected" : "") +
        (todo.isComplete ? " completed" : "")
      }
    >
      <div className="todocard-hoveroption">
        <div onClick={() => onSetEditMode(todo.id)}>
          <FontAwesomeIcon icon={faEdit} style={{ ...iconStyle }} />
        </div>
        <div onClick={() => onDeleteTodo(todo.id)}>
          <FontAwesomeIcon icon={faTrash} style={{ ...iconStyle }} />
        </div>
      </div>
      <p className="todocard-title">{todo.title}</p>
      <p className="todocard-datetime">{todo.date + ", " + todo.time}</p>
      <div className="todocard-statusicon">
        <div>
          <FontAwesomeIcon
            icon={faExclamationTriangle}
            style={{ color: urgencyIconColor, ...iconStyle }}
          />
        </div>
        <div>
          <FontAwesomeIcon
            icon={categoryIcon}
            style={{ color: categoryIconColor, ...iconStyle }}
          />
        </div>
      </div>
      <button
        className="todocard-btn-mark"
        onClick={() => onToggleComplete(todo.id)}
      >
        {!todo.isComplete ? "Mark Complete" : "Completed. Undo?"}
      </button>
      <div
        className={"todocard-select" + (todo.isSelected ? " red-bg" : "")}
        onClick={() => onToggleSelection(todo.id)}
      ></div>
    </div>
  );
}

export default TodoCard;
