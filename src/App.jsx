import { Header } from "./components/Header";
import { Tasks } from "./components/Tasks";
import { useTasks } from "./components/Hooks/useTasks";
import ClearTasks from "./components/Header/ClearTasks";
import './styles/global.css';

function App() {
  const { tasks, addTask, deleteTaskById, toggleTaskCompletedById, clearAllTasks, editTaskById } = useTasks();

  const clearAllTasksWithAnimation = () => {
    const taskElements = document.querySelectorAll('[id^="task-"]');

    setTimeout(() => {
      clearAllTasks();
    }, tasks.length * 100 + 500);
  };

  return (
    <>
      <Header handleAddTask={addTask} clearAllTasks={clearAllTasksWithAnimation} />
      <ClearTasks onClear={clearAllTasksWithAnimation} disabled={tasks.length === 0} />
      <Tasks
        tasks={tasks}
        onDelete={deleteTaskById}
        onComplete={toggleTaskCompletedById}
        onClear={clearAllTasksWithAnimation}
        onEdit={editTaskById}
      />
    </>
  );
}

export default App;
