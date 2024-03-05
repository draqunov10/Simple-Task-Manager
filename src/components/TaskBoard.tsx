interface TaskCardProps {
  title: "Backlog" | "In Progress" | "Done";
  taskCards?: JSX.Element[] | null;
  handleOnDrop: Function;
}

function TaskBoard({ title, taskCards = null, handleOnDrop }: TaskCardProps) {
  return (
    <>
      <div
        className="task-board rounded"
        onDrop={(e) => handleOnDrop(e, title)}
        onDragOver={(e) => e.preventDefault()}
      >
        <h1 className="task-board-title">{title} Board</h1>
        {taskCards}
      </div>
    </>
  );
}

export default TaskBoard;
