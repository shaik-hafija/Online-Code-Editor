import React, { useState } from 'react';
import CodeEditor from './components/CodeEditor';
import LanguageSelector from './components/LanguageSelector';
import OutputDisplay from './components/OutputDisplay';
import axios from 'axios';

const App = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(''); // Define selectedLanguage state here
  const [output, setOutput] = useState('');

  const executeCode = async (code, language) => {
    try {
      console.log(code, language)
      // Set base URL for Axios
      axios.defaults.baseURL = 'http://localhost:3100';

      // Use relative URL in requests
      const response = await axios.post('/execute', {
        code: code,
        language: language
      });


      const output = response.data.output;
      console.log(output)
      setOutput(output);
    } catch (error) {
      console.error('Error executing code:', error);
    }
  };

  const handleExecuteCode = (code, language) => {
    console.log('Code:', code);
    console.log('Language:', language);
    executeCode(code, language);
  };

  return (
    <div>
      <h1>Code Editor App</h1>
      <LanguageSelector
        languages={['javascript', 'python', 'java']}
        onSelectLanguage={(language) => setSelectedLanguage(language)}
      />
      <CodeEditor onExecuteCode={handleExecuteCode} />
      <OutputDisplay output={output} />
    </div>
  );
};

export default App;
