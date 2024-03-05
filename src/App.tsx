import "./App.css";
import TaskManager from "./components/TaskManager";

function App() {
  // let data: { task_id: number; task_desc: string; task_status: string }[] = ;
  return (
    <>
      <h1 className="app-title">Simple TaskBoard Manager</h1>
      <TaskManager />
    </>
  );
}

export default App;
