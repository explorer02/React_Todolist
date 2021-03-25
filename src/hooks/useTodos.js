import { useCallback, useEffect, useState } from "react";
import {
  addNewTodo,
  deleteTodos,
  editTodo,
  getAllTodos,
  toggleTodosComplete,
} from "../server";

export const useTodos = () => {
  const [todoList, setTodoList] = useState([]);
  const [selectedTodos, setSelectedTodos] = useState(new Set());

  useEffect(() => {
    getAllTodos()
      .then((res) => {
        setTodoList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addTodoHandler = useCallback((title, urgency, category) => {
    addNewTodo(title, urgency, category)
      .then((res) => {
        setTodoList((tl) => [...tl, res]);
      })
      .catch((err) => console.log(err));
  }, []);

  const toggleSingleCompleteHandler = useCallback((id) => {
    toggleTodosComplete([id])
      .then(setTodoList)
      .catch((err) => console.log(err));
  }, []);

  const toggleSingleSelectHandler = useCallback(
    (id) => {
      const updatedSet = new Set(selectedTodos);
      if (updatedSet.has(id)) {
        updatedSet.delete(id);
      } else updatedSet.add(id);

      setSelectedTodos(updatedSet);
    },
    [selectedTodos]
  );

  const toggleBatchCompleteHandler = useCallback(
    (markComplete = true) => {
      toggleTodosComplete([...selectedTodos], markComplete)
        .then((res) => {
          setTodoList(res);
          setSelectedTodos(new Set());
        })
        .catch((err) => console.log(err));
    },
    [selectedTodos]
  );

  const deleteSingleTodoHandler = useCallback((id) => {
    deleteTodos([id])
      .then((res) => {
        setTodoList(res);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteBatchTodoHandler = useCallback(() => {
    deleteTodos([...selectedTodos])
      .then((res) => {
        setTodoList(res);
        setSelectedTodos(new Set());
      })
      .catch((err) => console.log(err));
  }, [selectedTodos]);

  const editTodoHandler = useCallback(
    (editIndex, title, urgency, category) => {
      editTodo(todoList[editIndex].id, title, urgency, category)
        .then((res) => {
          setTodoList((tl) => {
            const updatedList = [...tl];
            updatedList[editIndex] = res;
            return updatedList;
          });
        })
        .catch((err) => console.log(err));
    },
    [todoList]
  );

  return {
      todoList,
      selectedTodos,
    addTodo: addTodoHandler,
    toggleSingleComplete: toggleSingleCompleteHandler,
    toggleSingleSelect: toggleSingleSelectHandler,
    toggleBatchComplete: toggleBatchCompleteHandler,
    deleteSingleTodo: deleteSingleTodoHandler,
    deleteBatchTodo: deleteBatchTodoHandler,
    editTodo: editTodoHandler,
  };
};
