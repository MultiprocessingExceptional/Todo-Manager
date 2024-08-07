// Trashcan.jsx
import React, { useEffect, useState, useImperativeHandle, forwardRef } from 'react';
import Lottie from 'lottie-react';

const animationUrl = "https://lottie.host/4c36ff4d-7277-4741-a104-c7b5e21d8346/QYVDMlOVHe.json";

const Trashcan = forwardRef(({ onClick }, ref) => {
  const [animationData, setAnimationData] = useState(null);
  const [error, setError] = useState(null);
  const lottieRef = React.useRef();

  useEffect(() => {
    const fetchAnimationData = async () => {
      try {
        const response = await fetch(animationUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error("Error fetching animation data:", error);
        setError(error);
      }
    };

    fetchAnimationData();
  }, []);

  // Expose play method to parent component via ref
  useImperativeHandle(ref, () => ({
    play: () => {
      if (lottieRef.current) {
        lottieRef.current.goToAndStop(0); // Reset animation to the start
        lottieRef.current.play(); // Play animation
      }
    }
  }));

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  if (error) {
    return <div>Error loading animation</div>;
  }

  if (!animationData) {
    return <div>Loading...</div>;
  }

  return (
    <div onClick={handleClick}>
      <Lottie
        lottieRef={lottieRef}
        animationData={animationData}
        loop={false}
        autoplay={false}
        style={{ width: 30, height: 30, marginBottom: '4px'}}
      />
    </div>
  );
});

export default Trashcan;
