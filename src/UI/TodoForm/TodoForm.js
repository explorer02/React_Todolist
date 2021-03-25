import React, { useCallback, useState } from "react";
import {
  CATEGORY_LIST,
  CATEGORY_PERSONAL,
  URGENCY_LIST,
  URGENCY_LOW,
} from "../../constants";
import "./TodoForm.css";

export const TodoForm = React.memo(
  ({ onSubmit, onCancel, initValues, showButtons = false }) => {
    let initTitle = "",
      initCategory = CATEGORY_PERSONAL,
      initUrgency = URGENCY_LOW;
    if (initValues) {
      initTitle = initValues.title;
      initUrgency = initValues.urgency;
      initCategory = initValues.category;
    }

    const [title, setTitle] = useState(initTitle);
    const [urgency, setUrgency] = useState(initUrgency);
    const [category, setCategory] = useState(initCategory);

    const titleChangeHandler = useCallback(
      (ev) => setTitle(ev.target.value),
      []
    );
    const urgencyChangeHandler = useCallback(
      (ev) => setUrgency(ev.target.value),
      []
    );
    const categoryChangeHandler = useCallback(
      (ev) => setCategory(ev.target.value),
      []
    );

    const submitHandler = (ev) => {
      if (ev) ev.preventDefault();
      onSubmit(title, urgency, category);
      setTitle(initTitle);
      setUrgency(initUrgency);
      setCategory(initCategory);
    };
    const cancelHandler = useCallback(() => {
      onCancel();
    }, [onCancel]);

    let actionButtons = null;

    if (showButtons) {
      actionButtons = (
        <div className="todoform-buttons">
          <button onClick={cancelHandler}>Cancel</button>
          <button onClick={submitHandler} type="submit">
            Save
          </button>
        </div>
      );
    }

    return (
      <form onSubmit={submitHandler} className="todoform">
        <div className="todoform-input">
          <input
            type="text"
            placeholder="Add your Todo..."
            value={title}
            onChange={titleChangeHandler}
          />
        </div>
        <Option
          title="Urgency"
          optionList={URGENCY_LIST}
          value={urgency}
          onChange={urgencyChangeHandler}
        />
        <Option
          title="Category"
          optionList={CATEGORY_LIST}
          value={category}
          onChange={categoryChangeHandler}
        />
        {actionButtons}
      </form>
    );
  }
);

function Option({ title, optionList, value, onChange }) {
  return (
    <div className="todoform-option">
      <label>{title}</label>
      <br></br>
      <select value={value} onChange={onChange}>
        {optionList.map((op) => (
          <option value={op} key={op}>
            {op[0].toUpperCase() + op.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
