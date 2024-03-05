interface TaskCardProps {
  id: number;
  title: string;
  status: "Backlog" | "In Progress" | "Done";
}

function TaskCard({ id, title, status }: TaskCardProps) {
  function handleOnDragStart(e: React.DragEvent<HTMLDivElement>) {
    e.dataTransfer.setData(
      "task-details",
      JSON.stringify({ id, title, status })
    );
  }

  return (
    <div
      className="task-card"
      draggable
      onDragStart={(e) => handleOnDragStart(e)}
    >
      <div className="card card-body bg-white shadow-sm">
        <div className="task-card-details">
          <div>
            <h4>{title}</h4>
            <p>{status}</p>
          </div>
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
