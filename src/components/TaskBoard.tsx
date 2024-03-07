import { handleOnDrop, handleOnCreateTask } from "./TaskManager";

interface TaskCardProps {
  className?: string;
  title: "Backlog" | "In Progress" | "Done";
  taskCards?: JSX.Element[] | null;
}

function TaskBoard({ className = "", title, taskCards = null }: TaskCardProps) {
  return (
    <>
      <div
        className={`task-board rounded ${className}`}
        onDrop={(e) => handleOnDrop(e, title)}
        onDragOver={(e) => e.preventDefault()}
      >
        <div>
          <h1 className="card card-title task-board-title">{title} Board</h1>
          {taskCards}
          <div
            className="card card-body add-task-card"
            onClick={() => handleOnCreateTask(title)}
          >
            <div className="d-flex justify-content-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 2a.5.5 0 0 1 .5.5v5h5a.5.5 0 0 1 0 1h-5v5a.5.5 0 0 1-1 0v-5h-5a.5.5 0 0 1 0-1h5v-5A.5.5 0 0 1 8 2"
                />
              </svg>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskBoard;
