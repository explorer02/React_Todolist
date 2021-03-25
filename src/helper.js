export const getFilteredTodos = (todos, filters) => {
  if (filters.every((f) => f.isSelected === false)) return todos;
  return todos.filter((t) =>
    filters.some(
      (f) => f.isSelected && (t.urgency === f.name || t.category === f.name)
    )
  );
};

export const getDateString = () => {
    return new Date()
      .toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "2-digit",
        year: "numeric",
      })
      .split(" ")
      .slice(0, 4)
      .join(" ");
}