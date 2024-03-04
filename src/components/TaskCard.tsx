interface TaskCardProps {
  title: string;
  status: "Backlog" | "In Progress" | "Done";
}

function TaskCard({ title, status }: TaskCardProps) {
  return (
    <>
      <div className="task-card">
        <div className="card card-body bg-white shadow-sm">
          <h4>{title}</h4>
          <p>{status}</p>
        </div>
      </div>
    </>
  );
}

export default TaskCard;
