import TaskBoard from "./TaskBoard";
import TaskCard from "./TaskCard";
import { useState, useEffect } from "react";

type Status = "Backlog" | "In Progress" | "Done";
let taskStateMap: {};

function TaskManager() {
  const [backlogTasks, setBacklogTasks] = useState<JSX.Element[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<JSX.Element[]>([]);
  const [doneTasks, setDoneTasks] = useState<JSX.Element[]>([]);

  taskStateMap = {
    Backlog: setBacklogTasks,
    "In Progress": setInProgressTasks,
    Done: setDoneTasks,
  };

  setTasks();

  return (
    <>
      <div className="task-manager">
        <TaskBoard title="Backlog" taskCards={backlogTasks} />
        <TaskBoard title="In Progress" taskCards={inProgressTasks} />
        <TaskBoard title="Done" taskCards={doneTasks} />
      </div>
    </>
  );
}

export function handleOnDrop(
  e: React.DragEvent<HTMLDivElement>,
  boardTitle: Status
) {
  const taskDetails = JSON.parse(e.dataTransfer.getData("task-details"));

  const oldStatus = taskDetails.status;
  taskDetails.status = boardTitle;
  switchTaskStatus(oldStatus, taskDetails);
}

export function handleOnCreateTask(taskStatus: Status) {
  createTask(taskStatus);
}

function setTasks() {
  useEffect(() => {
    fetch("http://localhost:8081/tasks")
      .then((response: Response) => response.json())
      .then((data: Array<any>) => {
        taskStateMap["Backlog"](
          data
            .filter((task) => task.task_status === "Backlog")
            .map((task) => (
              <TaskCard
                key={task.task_id}
                id={task.task_id}
                title={task.task_desc}
                status="Backlog"
              />
            ))
        );
        taskStateMap["In Progress"](
          data
            .filter((task) => task.task_status === "In Progress")
            .map((task) => (
              <TaskCard
                key={task.task_id}
                id={task.task_id}
                title={task.task_desc}
                status="In Progress"
              />
            ))
        );
        taskStateMap["Done"](
          data
            .filter((task) => task.task_status === "Done")
            .map((task) => (
              <TaskCard
                key={task.task_id}
                id={task.task_id}
                title={task.task_desc}
                status="Done"
              />
            ))
        );
      });
  }, []);
}

function createTask(taskStatus: Status) {
  console.log("ASDAS");
  fetch(
    `http://localhost:8081/create/${encodeURIComponent(
      " "
    )}/${encodeURIComponent(taskStatus)}`
  )
    .then((response: Response) => response.json())
    .then((data: {}) => {
      console.log("3333333");
      taskStateMap[taskStatus]((taskCardsArray) => [
        ...taskCardsArray,
        <TaskCard id={data["lastID"]} status={taskStatus} isNew={true} />,
      ]);
    });
}

function switchTaskStatus(
  oldStatus: Status,
  taskDetails: {
    id: number;
    title: string;
    status: Status;
  }
) {
  fetch(
    `http://localhost:8081/update/status/${taskDetails.id}/${encodeURIComponent(
      taskDetails.status
    )}`
  );

  taskStateMap[oldStatus]((taskCardsArray) =>
    taskCardsArray.filter((task) => task.props.id !== taskDetails.id)
  );
  taskStateMap[taskDetails.status]((taskCardsArray) => [
    ...taskCardsArray,
    <TaskCard
      key={taskDetails.id}
      id={taskDetails.id}
      title={taskDetails.title}
      status={taskDetails.status}
    />,
  ]);
}

export function changeTaskDescription(taskDetails: {
  id: number;
  title: string;
  status: Status;
}) {
  fetch(
    `http://localhost:8081/update/desc/${taskDetails.id}/${encodeURIComponent(
      taskDetails.title
    )}`
  );
  taskStateMap[taskDetails.status]((taskCardsArray) => [
    ...taskCardsArray.filter((task) => task.props.id !== taskDetails.id),
    <TaskCard
      id={taskDetails.id}
      title={taskDetails.title}
      status={taskDetails.status}
    />,
  ]);
}

export function deleteTask(
  taskId: number,
  taskStatus: "Backlog" | "In Progress" | "Done"
) {
  fetch(`http://localhost:8081/delete/${taskId}`);
  taskStateMap[taskStatus]((taskCardsArray) =>
    taskCardsArray.filter((task) => task.props.id !== taskId)
  );
}

export default TaskManager;
