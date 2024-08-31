import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [file, setFile] = useState(null);
  const [text, setText] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    formData.append('file', file);
    formData.append('text', text);

    try {
      const response = await axios.post('http://localhost:5000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
    } catch (error) {
      console.error('Error uploading the file and text', error);
    }
  };

  return (
    <div className="App">
      <h1>PRD DEMO</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="label">
            File:
            <input type="file" onChange={handleFileChange} className="input" />
          </label>
        </div>
        <div className="form-group">
          <label className="label">
            Text:
            <textarea rows={10} value={text} onChange={handleTextChange} className="textarea"></textarea>
          </label>
        </div>
        <div className="form-group">
          <button type="submit" className="button">Start</button>
        </div>
      </form>
    </div>
  );
}

export default App;