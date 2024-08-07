import React, { useEffect, useRef } from "react";
import Trashcan from "./Trashcan";
import gsap from "gsap";

function ClearTasks({ onClear, disabled }) {
  const trashcanRef = useRef();
  const buttonRef = useRef(null);

  const handleClick = () => {
    if (trashcanRef.current) {
      trashcanRef.current.play();
    }
    onClear();
  };

  useEffect(() => {
    gsap.fromTo(
      buttonRef.current,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 1, delay: 0.8, ease: "power5.out" }
    );
  }, []);

  return (
    <button
      ref={buttonRef}
      onClick={handleClick}
      className={`bg-[#262626] text-base hover:bg-[#1b1b1b] mx-4 md:mx-auto md:w-[44rem] absolute left-0 right-0 m-auto xl:w-[51.5%] text-center py-2 mt-10 rounded-lg text-white flex items-center justify-center gap-2 ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      aria-label="Clear all tasks"
      disabled={disabled}
    >
      Clear All Tasks
      <Trashcan ref={trashcanRef} />
    </button>
  );
}

export default ClearTasks;
