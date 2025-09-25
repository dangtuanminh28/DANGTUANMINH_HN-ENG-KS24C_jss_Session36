import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

interface TaskFormProps {
  onAdd: (title: string, priority: "LOW" | "MEDIUM" | "HIGH") => void;
  onUpdate: (task: any) => void;
  editingTask: any;
  onCancelEdit: () => void;
}

const TaskForm: React.FC<TaskFormProps> = ({
  onAdd,
  onUpdate,
  editingTask,
  onCancelEdit,
}) => {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState<"LOW" | "MEDIUM" | "HIGH">("MEDIUM");

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.taskName);
      setPriority(editingTask.priority);
    }
  }, [editingTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    if (editingTask) {
      onUpdate({
        ...editingTask,
        taskName: title,
        priority,
      });
      onCancelEdit();
    } else {
      onAdd(title, priority);
    }

    setTitle("");
    setPriority("MEDIUM");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-4 items-center bg-white p-4 rounded-2xl shadow-md"
    >
      <TextField
        label="Công việc"
        variant="outlined"
        size="small"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="flex-1"
      />
      <FormControl size="small" className="w-36">
        <InputLabel>Ưu tiên</InputLabel>
        <Select
          value={priority}
          onChange={(e) =>
            setPriority(e.target.value as "LOW" | "MEDIUM" | "HIGH")
          }
          label="Ưu tiên"
        >
          <MenuItem value="LOW">Thấp</MenuItem>
          <MenuItem value="MEDIUM">Trung bình</MenuItem>
          <MenuItem value="HIGH">Cao</MenuItem>
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" color="primary">
        {editingTask ? "Cập nhật" : "Thêm"}
      </Button>
      {editingTask && (
        <Button variant="outlined" color="secondary" onClick={onCancelEdit}>
          Hủy
        </Button>
      )}
    </form>
  );
};

export default TaskForm;
