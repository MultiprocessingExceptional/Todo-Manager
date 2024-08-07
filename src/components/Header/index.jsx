import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import todoLogo from '../../assets/todo-logo.png';
import styles from './header.module.css';
import { AiOutlinePlusCircle } from 'react-icons/ai';

export function Header({ handleAddTask, clearAllTasks }) {
  const [title, setTitle] = useState('');
  
  const logoRef = useRef(null);
  const headingRef = useRef(null);
  const inputRef = useRef(null);
  const buttonRef = useRef(null);

  function handleSubmit(event) {
    event.preventDefault();
    if (title.trim() === '') {
      alert("Task cannot be empty");
    } else {
      handleAddTask(title);
      setTitle('');
    }
  }

  function onChangeTitle(event) {
    setTitle(event.target.value);
  }

  useEffect(() => {
    gsap.fromTo(
      logoRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'power5.out' }
    );
    gsap.fromTo(
      headingRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: 'power5.out' }
    );
    gsap.fromTo(
      inputRef.current,
      { x: -50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, delay: 0.6, ease: 'power6.out' }
    );
    gsap.fromTo(
      buttonRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 1, delay: 0.6, ease: 'power6.out' }
    );
  }, []);

  return (
    <header className={styles.header}>
      <img
        ref={logoRef}
        className="size-10 lg:size-16 mr-2 lg:mr-5"
        src={todoLogo}
        alt="Todo Logo"
      />
      <h1
        ref={headingRef}
        className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#42A4EB]"
      >
        Todo Manager
      </h1>

      <form onSubmit={handleSubmit} className={styles.newTaskForm}>
        <input
          ref={inputRef}
          className='outline-none w-full h-13'
          placeholder="Add a new task..."
          type="text"
          onChange={onChangeTitle}
          value={title}
        />
        <button
          ref={buttonRef}
          type="submit"
        >
          Create <AiOutlinePlusCircle size={20} />
        </button>
      </form>
    </header>
  );
}
