import TaskBoard from "./TaskBoard";
import TaskCard from "./TaskCard";
import { useState, useEffect } from "react";

type Status = "Backlog" | "In Progress" | "Done";

function TaskManager() {
  function handleOnDrop(
    e: React.DragEvent<HTMLDivElement>,
    boardTitle: Status
  ) {
    let taskDetails = JSON.parse(e.dataTransfer.getData("task-details"));
    taskDetails.newStatus = boardTitle;

    if (boardTitle === "Backlog") {
      addTask(setBacklogTasks, backlogTasks, taskDetails);
      removeTask(setInProgressTasks, inProgressTasks, taskDetails.id);
      removeTask(setDoneTasks, doneTasks, taskDetails.id);
    } else if (boardTitle === "In Progress") {
      addTask(setInProgressTasks, inProgressTasks, taskDetails);
      removeTask(setBacklogTasks, backlogTasks, taskDetails.id);
      removeTask(setDoneTasks, doneTasks, taskDetails.id);
    } else if (boardTitle === "Done") {
      addTask(setDoneTasks, doneTasks, taskDetails);
      removeTask(setBacklogTasks, backlogTasks, taskDetails.id);
      removeTask(setInProgressTasks, inProgressTasks, taskDetails.id);
    }
  }

  const [backlogTasks, setBacklogTasks] = useState<JSX.Element[]>([]);
  const [inProgressTasks, setInProgressTasks] = useState<JSX.Element[]>([]);
  const [doneTasks, setDoneTasks] = useState<JSX.Element[]>([]);

  useEffect(() => {
    fetch("http://localhost:8081/tasks")
      .then((response: Response) => response.json())
      .then((data: Array<any>) => {
        setBacklogTasks(
          data
            .filter((task) => task.task_status === "Backlog")
            .map((task) => (
              <TaskCard
                id={task.task_id}
                title={task.task_desc}
                status="Backlog"
              />
            ))
        );
        setInProgressTasks(
          data
            .filter((task) => task.task_status === "In Progress")
            .map((task) => (
              <TaskCard
                id={task.task_id}
                title={task.task_desc}
                status="In Progress"
              />
            ))
        );
        setDoneTasks(
          data
            .filter((task) => task.task_status === "Done")
            .map((task) => (
              <TaskCard
                id={task.task_id}
                title={task.task_desc}
                status="Done"
              />
            ))
        );
      });
  }, []);

  return (
    <>
      <div className="task-manager">
        <TaskBoard
          title="Backlog"
          taskCards={backlogTasks}
          handleOnDrop={handleOnDrop}
        />
        <TaskBoard
          title="In Progress"
          taskCards={inProgressTasks}
          handleOnDrop={handleOnDrop}
        />
        <TaskBoard
          title="Done"
          taskCards={doneTasks}
          handleOnDrop={handleOnDrop}
        />
      </div>
    </>
  );
}

function addTask(
  setter: Function,
  taskCardsArray: JSX.Element[],
  taskDetails: {
    id: number;
    title: string;
    newStatus: Status;
  }
) {
  setter([
    ...taskCardsArray,
    <TaskCard
      id={taskDetails.id}
      title={taskDetails.title}
      status={taskDetails.newStatus}
    />,
  ]);
}

function removeTask(
  setter: Function,
  taskCardsArray: JSX.Element[],
  id: number
) {
  setter(taskCardsArray.filter((task) => task.props.id !== id));
}

export default TaskManager;
