export const handlePriorityColors = (priority: string | undefined) => {
  switch (priority) {
    case "urgent":
      return "red";
    case "high":
      return "red";
    case "medium":
      return "orange";
    default:
      return "gray";
  }
};

export const handleStatusColors = (status: string | undefined) => {
  switch (status) {
    case "closed":
      return "red";
    default:
      return "green";
  }
};
