import { changeTaskDescription, deleteTask } from "./TaskManager";
import { useEffect, useState, useRef } from "react";

interface TaskCardProps {
  id: number;
  title?: string;
  status: "Backlog" | "In Progress" | "Done";
  isNew?: boolean;
}

function TaskCard({ id, title = "", status, isNew = false }: TaskCardProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [displayTitle, setDisplayTitle] = useState<string>(title);
  const [onEdit, setOnEdit] = useState<boolean>(isNew);
  const [currentTitle, setTitle] = useState(
    TitleCode(
      onEdit,
      setOnEdit,
      displayTitle,
      setDisplayTitle,
      inputRef,
      id,
      status
    )
  );
  useEffect(() => {
    setTitle(
      TitleCode(
        onEdit,
        setOnEdit,
        displayTitle,
        setDisplayTitle,
        inputRef,
        id,
        status
      )
    );
  }, [onEdit]);

  return (
    <div
      className="task-card"
      draggable
      onDragStart={(e) => handleOnDragStart(e, { id, title, status })}
    >
      <div className="card card-body">
        <div className="task-card-details">
          <div>
            {currentTitle}
            <p>{status}</p>
          </div>
          <button
            onClick={() => deleteTask(id, status)}
            type="button"
            className="btn-close"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  );
}

function TitleCode(
  onEdit: boolean,
  setOnEdit: Function,
  title: string,
  setDisplayTitle: Function,
  inputRef: React.RefObject<HTMLInputElement>,
  id: number,
  status: "Backlog" | "In Progress" | "Done"
) {
  return onEdit ? (
    <input
      type="text"
      ref={inputRef}
      defaultValue={title}
      onMouseEnter={() => inputRef.current.focus()}
      onBlur={(e) => {
        if (e.target.value === "") e.target.value = "Untitled";
        setOnEdit(false);
        setDisplayTitle(e.target.value);
        changeTaskDescription({
          id: id,
          title: e.target.value,
          status: status,
        });
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          setOnEdit(false);
          const target = e.target as HTMLInputElement;
          if (target.value === "") target.value = "Untitled";
          setDisplayTitle(target.value);
          changeTaskDescription({
            id: id,
            title: target.value,
            status: status,
          });
        }
      }}
    />
  ) : (
    <h4 onClick={() => setOnEdit(true)}>{title}</h4>
  );
}

function handleOnDragStart(
  e: React.DragEvent<HTMLDivElement>,
  { id, title, status }
) {
  e.dataTransfer.setData("task-details", JSON.stringify({ id, title, status }));
}

export default TaskCard;
