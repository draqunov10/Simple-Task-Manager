import "./App.css";
import TaskCard from "./components/TaskCard";

function App() {
  return (
    <>
      <h1>This is the app</h1>
      <TaskCard title="This is done" status="Done" />
    </>
  );
}

export default App;
