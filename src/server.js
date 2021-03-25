const DELAY = 0;

const _getTodoListFromLS = () => {
  const res = localStorage.getItem("todoList");
  if (res) return JSON.parse(res);
  return [];
};

const _setTodoListintoLS = (todoList) => {
  localStorage.setItem("todoList", JSON.stringify(todoList));
};

export const getAllTodos = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(_getTodoListFromLS());
    }, 1000);
  });
};

export const addNewTodo = (title, urgency, category) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const date = new Date().toLocaleDateString("en-uk");
      const time = new Date()
        .toLocaleDateString("en-us", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
        .split(",")[1]
        .trim();
      const todo = {
        title,
        urgency,
        category,
        date,
        time,
        isComplete: false,
        id: date + time + Math.random(),
      };
      const todoList = _getTodoListFromLS();
      todoList.push(todo);
      _setTodoListintoLS(todoList);
      resolve(todo);
    }, DELAY);
  });
};
export const toggleTodosComplete = (ids, markComplete) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const idSet = new Set(ids);
      const todoList = _getTodoListFromLS().map((t) => {
        if (idSet.has(t.id)) t.isComplete = markComplete ?? !t.isComplete;
        return t;
      });
      _setTodoListintoLS(todoList);
      resolve(todoList);
    }, DELAY);
  });
};

export const deleteTodos = (ids) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const idSet = new Set(ids);
      const todoList = _getTodoListFromLS().filter((t) => !idSet.has(t.id));
      _setTodoListintoLS(todoList);
      resolve(todoList);
    }, DELAY);
  });
};

export const editTodo = (id, title, urgency, category) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const todoList = _getTodoListFromLS();
      const index = todoList.findIndex((t) => t.id === id);
      todoList[index] = {
        ...todoList[index],
        title,
        urgency,
        category,
      };

      _setTodoListintoLS(todoList);
      resolve(todoList[index]);
    }, DELAY);
  });
};
