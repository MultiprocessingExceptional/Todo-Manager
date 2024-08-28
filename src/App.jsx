import React, { Suspense, lazy, useState, useEffect } from "react";
import HashLoader from "react-spinners/HashLoader";
import "./styles/global.css";

const LazyComponent = lazy(() => import("./LazyComponent"));

function App() {
  const [showLoader, setShowLoader] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const delayTimer = setTimeout(() => {
      setShowLoader(true);

      const loaderTimer = setTimeout(() => {
        setIsLoading(false);
      }, 3000);

      return () => clearTimeout(loaderTimer);
    }, 0);

    return () => clearTimeout(delayTimer);
  }, []);

  if (!isLoading) {
    return <LazyComponent />;
  }

  return (
    <>
      {showLoader && (
        <div className="loader-container">
          <HashLoader color="#42A4EB" loading={true} size={100} />
        </div>
      )}
    </>
  );
}

export default App;
