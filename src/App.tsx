import "./App.css";
import TaskManager from "./components/TaskManager";

function App() {
  // let data: { task_id: number; task_desc: string; task_status: string }[] = ;
  return (
    <>
      <h1 className="app-title">Simple TaskBoard Manager</h1>
      <TaskManager />
      <div className="instructions">
        <h5 className="app-subtitle">Click the + sign to ADD tasks</h5>
        <h5 className="app-subtitle">Click the x sign to DELETE tasks</h5>
        <h5 className="app-subtitle">
          Click the title of a task to UPDATE title
        </h5>
        <h5 className="app-subtitle">
          Drag and drop tasks between boards to UPDATE status
        </h5>
      </div>
    </>
  );
}

export default App;
