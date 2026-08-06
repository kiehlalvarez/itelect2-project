export const mockTasks = [
  { id: 1, title: "Finish GT4 assignment", dueDate: "2026-07-22", completed: false },
  { id: 2, title: "Review Express routing", dueDate: "2026-07-29", completed: false },
  { id: 3, title: "Push GT5 to GitHub", dueDate: "2026-08-06", completed: true },
];

export const formatDate = (date) => `Due: ${date.toLocaleDateString('en-US')}`;

export const validateTask = ({ title, dueDate } = {}) => {
  return !!(title && dueDate);
};

export const mergeTaskUpdate = (original, ...updates) => {
  return updates.reduce((acc, curr) => ({ ...acc, ...curr }), { ...original });
};

export class TaskValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "TaskValidationError";
  }
}

export const createTask = (taskData) => {
  if (!validateTask(taskData)) {
    throw new TaskValidationError("Invalid task data");
  }
  return { id: Date.now(), completed: false, ...taskData };
};