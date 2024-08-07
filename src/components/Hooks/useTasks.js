import { useState, useEffect } from 'react';
import gsap from 'gsap';

const LOCAL_STORAGE_KEY = 'todo:tasks';

export function useTasks() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY)) || [];
    setTasks(savedTasks);
  }, []);

  const saveTasks = (newTasks) => {
    setTasks(newTasks);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newTasks));
  };

  const addTask = (title) => {
    const newTask = { id: crypto.randomUUID(), title, isCompleted: false };
    saveTasks([...tasks, newTask]);
  };

  const deleteTaskById = (taskId) => {
    const updatedTasks = tasks.filter((task) => task.id !== taskId);
    saveTasks(updatedTasks);
  };

  const toggleTaskCompletedById = (taskId) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
    );
    saveTasks(updatedTasks);
  };

  const clearAllTasks = () => {
    tasks.forEach((task, index) => {
      const taskElement = document.getElementById(task.id);
      if (taskElement) {
        const screenWidth = window.innerWidth;
        const xValue = screenWidth < 768 ? 120 : 300;

        gsap.to(taskElement, {
          x: xValue,
          opacity: 0,
          width: '30px',
          height: '10px',
          duration: 1,
          delay: index * 0.1,
          ease: 'power2.inOut',
        });
      }
    });

    setTimeout(() => {
      saveTasks([]);
    }, tasks.length * 100 + 1000);
  };

  const editTaskById = (taskId, newTitle) => {
    const updatedTasks = tasks.map((task) =>
      task.id === taskId ? { ...task, title: newTitle } : task
    );
    saveTasks(updatedTasks);
  };

  return {
    tasks,
    addTask,
    deleteTaskById,
    toggleTaskCompletedById,
    clearAllTasks,
    editTaskById,
  };
}
