import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import React from "react";

interface FilterControlsProps {
  status: "all" | "completed" | "active";
  priority: "all" | "low" | "medium" | "high";
  search: string;
  onStatusChange: (status: "all" | "completed" | "active") => void;
  onPriorityChange: (priority: "all" | "low" | "medium" | "high") => void;
  onSearchChange: (search: string) => void;
}

const FilterControls: React.FC<FilterControlsProps> = ({
  status,
  priority,
  search,
  onStatusChange,
  onPriorityChange,
  onSearchChange,
}) => {
  return (
    <div className="mt-[15px] flex gap-4 items-center bg-white p-4 rounded-2xl shadow-md mb-4">
      <FormControl size="small" className="w-40">
        <InputLabel id="status-label">Trạng thái</InputLabel>
        <Select
          labelId="status-label"
          value={status}
          label="Trạng thái"
          onChange={(e) =>
            onStatusChange(e.target.value as "all" | "completed" | "active")
          }
        >
          <MenuItem value="all">Tất cả</MenuItem>
          <MenuItem value="completed">Hoàn thành</MenuItem>
          <MenuItem value="active">Chưa hoàn thành</MenuItem>
        </Select>
      </FormControl>

      <FormControl size="small" className="w-40">
        <InputLabel id="priority-label">Ưu tiên</InputLabel>
        <Select
          labelId="priority-label"
          value={priority}
          label="Ưu tiên"
          onChange={(e) =>
            onPriorityChange(
              e.target.value as "all" | "low" | "medium" | "high"
            )
          }
        >
          <MenuItem value="all">Tất cả</MenuItem>
          <MenuItem value="low">Thấp</MenuItem>
          <MenuItem value="medium">Trung bình</MenuItem>
          <MenuItem value="high">Cao</MenuItem>
        </Select>
      </FormControl>

      <TextField
        label="Tìm kiếm"
        placeholder="Nhập tên công việc..."
        variant="outlined"
        size="small"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        className="flex-1"
        inputProps={{ "aria-label": "Tìm kiếm công việc" }}
      />
    </div>
  );
};

export default FilterControls;
