import "./App.css";
import { TitleBar } from "./components/TitleBar";
import { TodoCanvas } from "./components/TodoCanvas/TodoCanvas";
import { useCallback, useMemo, useState } from "react";
import { Filter } from "./components/ActionBar/Filter";
import { Analytics } from "./components/ActionBar/Analytics";
import { CreateTodo } from "./components/ActionBar/CreateTodo";
import { Backdrop } from "./UI/Backdrop/Backdrop";
import { TodoForm } from "./UI/TodoForm/TodoForm";

import { useTodos } from "./hooks/useTodos";
import { getFilteredTodos } from "./helper";
import { useFilters } from "./hooks/useFilters";

const App = () => {
  const {
    todoList,
    selectedTodos,
    addTodo,
    toggleSingleComplete,
    toggleSingleSelect,
    toggleBatchComplete,
    deleteSingleTodo,
    deleteBatchTodo,
    editTodo,
  } = useTodos();

  const { filters, toggleFilter } = useFilters();

  const [editMode, setEditMode] = useState(false);
  const [editIndex, setEditIndex] = useState(-1);

  const toggleEditMode = useCallback(
    (id) => {
      setEditMode((e) => !e);
      if (id) setEditIndex(todoList.findIndex((t) => t.id === id));
    },
    [todoList]
  );
  const editTodoHandler = useCallback(
    (title, urgency, category) => {
      editTodo(editIndex, title, urgency, category);
      toggleEditMode();
    },
    [editTodo, toggleEditMode, editIndex]
  );

  const filteredTodos = useMemo(() => getFilteredTodos(todoList, filters), [
    todoList,
    filters,
  ]);

  return (
    <div className="App">
      {editMode && (
        <Backdrop>
          <div className="backdrop-form-container">
            <TodoForm
              onSubmit={editTodoHandler}
              initValues={todoList[editIndex]}
              showButtons={true}
              onCancel={toggleEditMode}
            />
          </div>
        </Backdrop>
      )}
      <TitleBar />
      <div className="container-body">
        <TodoCanvas
          todoList={filteredTodos}
          selectedTodos={selectedTodos}
          onToggleSelect={toggleSingleSelect}
          onToggleComplete={toggleSingleComplete}
          onDeleteTodo={deleteSingleTodo}
          onSetEditMode={toggleEditMode}
          onBatchComplete={toggleBatchComplete.bind(null, true)}
          onBatchUndo={toggleBatchComplete.bind(null, false)}
          onBatchDelete={deleteBatchTodo}
        />

        <div className="actionbar">
          <Filter filters={filters} onToggle={toggleFilter} />
          <Analytics todoList={filteredTodos} />
          <CreateTodo onSubmit={addTodo} />
        </div>
      </div>
    </div>
  );
};

export default App;
