import TaskCard from "./TaskCard";

interface TaskCardProps {
  taskCards: JSX.Element[];
}

function TaskBoard({ taskCards }: TaskCardProps) {
  return (
    <>
      <h1>Task Board</h1>
    </>
  );
}

export default TaskBoard;
