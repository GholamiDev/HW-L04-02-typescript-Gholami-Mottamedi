export const isDeadlineNear = (deadline: string, hours = 24) => {
  const now = new Date().getTime();
  const deadlineTime = new Date(deadline).getTime();

  const diff = deadlineTime - now;
  return diff > 0 && diff <= hours * 60 * 60 * 1000;
};

export const hasBeenNotified = (taskId: string) => {
  return localStorage.getItem(`notified_deadline_${taskId}`) === "true";
};

export const markAsNotified = (taskId: string) => {
  localStorage.setItem(`notified_deadline_${taskId}`, "true");
};
