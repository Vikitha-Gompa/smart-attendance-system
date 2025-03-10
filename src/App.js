import React, { useState } from 'react';
import FileUpload from './components/FileUpload';
import ResultDisplay from './components/ResultDisplay';

const App = () => {
  const [result, setResult] = useState(null);

  const handleResult = (data) => {
    setResult(data);
  };

  return (
    <div>
      <h1>Participation Record App</h1>
      <FileUpload onResult={handleResult} />
      {result && <ResultDisplay result={result} />}
    </div>
  );
};

export default App;