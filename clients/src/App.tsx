import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store/store";
import {
  fetchTasks,
  addTask,
  toggleTask,
  deleteTask,
  type Task,
  updateTask,
} from "./store/slice/taskSlice";

import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import FilterControls from "./components/FilterControls";

const App = () => {
  const [editingTask, setEditingTask] = useState<Task | null>(null);

  const handleUpdate = (task: Task) => {
    dispatch(updateTask(task));
    setEditingTask(null);
  };

  const dispatch = useDispatch<AppDispatch>();
  const { tasks, loading, error } = useSelector(
    (state: RootState) => state.tasks
  );

  const [filters, setFilters] = useState({
    status: "all",
    priority: "all",
    search: "",
  });

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleAdd = (taskName: string, priority: "LOW" | "MEDIUM" | "HIGH") => {
    dispatch(addTask({ taskName, priority, completed: false }));
  };

  const handleToggle = (id: number) => {
    const task = tasks.find((t: Task) => t.id === id);
    if (task) dispatch(toggleTask(task));
  };
  const handleDelete = (id: number) => {
    dispatch(deleteTask(id));
  };

  const filteredTasks = tasks.filter((t: Task) => {
    const matchStatus =
      filters.status === "all" ||
      (filters.status === "completed" && t.completed) ||
      (filters.status === "active" && !t.completed);

    const matchPriority =
      filters.priority === "all" ||
      t.priority === filters.priority.toUpperCase();

    const matchSearch = t.taskName
      .toLowerCase()
      .includes(filters.search.toLowerCase());

    return matchStatus && matchPriority && matchSearch;
  });

  return (
    <div className="max-w-2xl mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-center">📝 Task Manager</h1>

      <TaskForm
        onAdd={handleAdd}
        editingTask={editingTask}
        onUpdate={handleUpdate}
        onCancelEdit={() => setEditingTask(null)}
      />

      <FilterControls
        status={filters.status}
        priority={filters.priority}
        search={filters.search}
        onStatusChange={(status) => setFilters({ ...filters, status })}
        onPriorityChange={(priority) => setFilters({ ...filters, priority })}
        onSearchChange={(search) => setFilters({ ...filters, search })}
      />

      <div>
        {loading && <p>Đang tải...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {filteredTasks.map((task) => (
          <TaskItem
            key={task.id}
            id={task.id}
            taskName={task.taskName}
            completed={task.completed}
            priority={task.priority}
            onToggle={handleToggle}
            onDelete={handleDelete}
            onEdit={(id:any) =>
              setEditingTask(tasks.find((t) => t.id === id) || null)
            }
          />
        ))}
      </div>
    </div>
  );
};

export default App;
