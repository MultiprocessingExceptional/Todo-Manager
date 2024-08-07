import { Task } from "../Task";
import styles from "./tasks.module.css";
import gsap from "gsap";
import { useEffect, useRef } from "react";

export function Tasks({ tasks, onDelete, onComplete, onClear, onEdit }) {
  const tasksQuantity = tasks.length;
  const completedTasks = tasks.filter((task) => task.isCompleted).length;
  const tasksRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      tasksRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.9, ease: "power1.out" }
    );
  }, []);

  return (
    <section className={styles.tasks} ref={tasksRef}>
      <header className={styles.header}>
        <div>
          <p>Created tasks</p>
          <span>{tasksQuantity}</span>
        </div>

        <div>
          <p className={styles.textPurple}>Completed tasks</p>
          <span>
            {completedTasks} of {tasksQuantity}
          </span>
        </div>
      </header>

      <div className={styles.list}>
        {tasks.map((task) => (
          <Task
            key={task.id}
            id={task.id}
            task={task}
            onDelete={onDelete}
            onComplete={onComplete}
            onEdit={onEdit}
          />
        ))}
      </div>

      {/* Removed the Clear All Tasks button from here */}
    </section>
  );
}
