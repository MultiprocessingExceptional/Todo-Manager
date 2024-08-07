import React, { Suspense, lazy } from 'react';
import './styles/global.css';

const LazyComponent = lazy(() => import('./LazyComponent'));

function App() {
  return (
    <>
    <Suspense fallback={<div>Loading...</div>}>
      <LazyComponent />
      </Suspense>
    </>
  );
}

export default App;
