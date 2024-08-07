import React, { useState, useRef } from 'react';
import styles from './task.module.css';
import { BsFillCheckCircleFill } from 'react-icons/bs';
import { TbTrash } from 'react-icons/tb';
import { AiOutlineEdit } from 'react-icons/ai';

export function Task({ id, task, onDelete, onComplete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);
  const inputRef = useRef(null);

  const handleEdit = () => {
    setIsEditing(true);
    setTimeout(() => {
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }, 0);
  };

  const handleSave = () => {
    onEdit(task.id, newTitle);
    setIsEditing(false);
  };

  return (
    <div id={id} className={styles.task}>
      <button className={styles.checkContainer} onClick={() => onComplete(task.id)}>
        {task.isCompleted ? <BsFillCheckCircleFill /> : <div />}
      </button>

      {isEditing ? (
        <input
          type="text"
          ref={inputRef}
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onBlur={handleSave}
          onKeyDown={(e) => e.key === 'Enter' && handleSave()}
          className="text-white rounded-sm bg-[#262626] text-sm w-48 ml-[-1rem] lg:ml-[-24rem] focus:outline-none"
        />
      ) : (
        <p className={task.isCompleted ? styles.textCompleted : ""}>
          {task.title}
        </p>
      )}

      <div className={styles.taskActions}>
        <button className={`${styles.editButton} focus:outline-none text-gray-400 mr-2`} onClick={handleEdit}>
          <AiOutlineEdit size={20} />
        </button>
        <button className={styles.deleteButton} onClick={() => onDelete(task.id)}>
          <TbTrash size={20} />
        </button>
      </div>
    </div>
  );
}
