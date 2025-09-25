import { Checkbox, Chip, IconButton } from "@mui/material";
import { Delete, Edit } from "@mui/icons-material";
import React from "react";
import type { Task } from "../store/slice/taskSlice";

interface TaskItemProps extends Task {
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
  onEdit?: (task: Task) => void;
}

const priorityColor = {
  LOW: "success",
  MEDIUM: "warning",
  HIGH: "error",
} as const;

const TaskItem: React.FC<TaskItemProps> = ({
  id,
  taskName,
  completed,
  priority,
  onToggle,
  onDelete,
  onEdit,
}) => {
  return (
    <div className="flex items-center justify-between bg-white p-3 rounded-xl shadow-sm mb-2">
      <div className="flex items-center gap-3">
        <Checkbox
          checked={completed}
          onChange={() => onToggle(id)}
          inputProps={{ "aria-label": "Toggle task" }}
        />
        <span
          className={`text-sm ${
            completed ? "line-through text-gray-400" : ""
          }`}
        >
          {taskName}
        </span>
        <Chip
          label={priority}
          color={priorityColor[priority]}
          size="small"
          className="ml-2"
        />
      </div>
      <div>
        <IconButton
          onClick={() => onDelete(id)}
          color="error"
          aria-label="Delete task"
        >
          <Delete />
        </IconButton>
        <IconButton
          onClick={() => onEdit && onEdit({ id, taskName, completed, priority })}
          color="primary"
          aria-label="Edit task"
        >
          <Edit />
        </IconButton>
      </div>
    </div>
  );
};

export default TaskItem;
