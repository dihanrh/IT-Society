
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { API_BASE_URL, API_ENDPOINTS } from '../utils/config';

const FileSharingPage = () => {

      // student ID from stduent deshbord
      const location = useLocation();
      const queryParams = new URLSearchParams(location.search);
      const studentIdA = queryParams.get('studentId');

  const [studentId, setStudentId] = useState(studentIdA);
  const [sentFiles, setSentFiles] = useState([]);
  const [receivedFiles, setReceivedFiles] = useState([]);


  useEffect(() => {
    // Fetch sent files for the current student
    const fetchSentFiles = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.SENT}?senderId=${studentId}`);
        if (response.ok) {
          const data = await response.json();
          setSentFiles(data);
        }
      } catch (error) {
        console.error('Error fetching sent files:', error);
      }
    };

    // Fetch received files for the current student
    const fetchReceivedFiles = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.RECEIVED}?receiverId=${studentId}`);
        if (response.ok) {
          const data = await response.json();
          setReceivedFiles(data);
        }
      } catch (error) {
        console.error('Error fetching received files:', error);
      }
    };

    fetchSentFiles();
    fetchReceivedFiles();
  }, [studentId]);

  return (
    <div>
      <div>
        <h2>Sent Files</h2>
        <ul>
          {sentFiles.map((file) => (
            <li key={file._id}>
              <p>File Name: {file.files[0].fileName}</p>
              <p>Received by: {file.receiverId}</p>
              <p>Date: {new Date(file.sendingDate).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Received Files</h2>
        <ul>
          {receivedFiles.map((file) => (
            <li key={file._id}>
              <p>File Name: {file.files[0].fileName}</p>
              <p>Sender: {file.senderId}</p>
              <p>Date: {new Date(file.sendingDate).toLocaleString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


const FileSharingForm = () => {
    // student ID from stduent deshbord
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const studentId = queryParams.get('studentId');
    
  const [receiverId, setReceiverId] = useState('');
  const [fileNames, setFileNames] = useState([]);
  const [fileNameInput, setFileNameInput] = useState('');

  const handleAddFile = () => {
    if (fileNameInput) {
      setFileNames([...fileNames, fileNameInput]);
      setFileNameInput('');
    }
  };

  const handleSendFiles = async () => {
    if (receiverId && fileNames.length > 0) {
      const payload = {
        senderId: studentId,
        receiverId,
        files: fileNames.map(name => ({ fileName: name })),
        sendingDate: new Date(),
      };

      try {
        const response = await fetch(`${API_BASE_URL}${API_ENDPOINTS.FILE}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          // Clear form inputs and show success message
          setReceiverId('');
          setFileNames([]);
          setFileNameInput('');
          console.log('Files shared successfully!');
        } else {
          console.error('Failed to share files.');
        }
      } catch (error) {
        console.error('Error sharing files:', error);
      }
    }
  };

  return (
    <div>
      <FileSharingPage/>

      <h4>Send File</h4>
      <input
        type="text"
        placeholder="Receiver Student ID"
        value={receiverId}
        onChange={(e) => setReceiverId(e.target.value)}
      />
      <div>
        <input
          type="text"
          placeholder="File Name"
          value={fileNameInput}
          onChange={(e) => setFileNameInput(e.target.value)}
        />
        <button onClick={handleAddFile}>Add File</button>
      </div>
      <ul>
        {fileNames.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
      <button onClick={handleSendFiles}>Send</button>
    </div>
  );
};

export default FileSharingForm;
