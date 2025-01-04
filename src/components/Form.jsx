import { server } from '../index';
import '../assets/styles/App.css'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const navigate = useNavigate();
    const [username, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");
    const [userPassword, setPassword] = useState("");

    const handleSubmit = () => {
      const data = {
        name: username,
        email: userEmail,
        password: userPassword,
      };
      console.log(data);
      saveToDb(data)
        .then((response) => {
          console.log(response)
          if(response.success === true)navigate('/userDetails')
          else navigate('/error')  
        }
          )
        .catch((error) => console.error(error));
    };

    const saveToDb = async (data) => {
      const url = `${server}/register`;
      
      try {
        const response = await fetch(url, {
          method: "POST",
          body: JSON.stringify(data), // Convert data to JSON format
          headers: {
            "Content-Type": "application/json", // Set the content type to JSON
          },
        });
    
        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`Server error: ${response.status} ${response.statusText}`);
        }
    
        // Attempt to parse the response as JSON
        const text = await response.text(); // Read response as text
        let jsonResponse;
        
        // Only try to parse the response if it’s not empty
        try {
          jsonResponse = text ? JSON.parse(text) : {};
        } catch (error) {
          throw new Error('Failed to parse response as JSON');
        }
        
        return jsonResponse; // Return the parsed JSON response
      } catch (error) {
        console.error('Error occurred while saving data:', error.message);
        // Optionally, you can throw the error or handle it based on your needs
        throw error;
      }
    };
    


  return (
    <div className="App">
      <div className="Field">
        <p>Name</p>
        <input
          name="name"
          type="text"
          placeholder="John Doe"
          onChange={(event) => setUserName(event.target.value)}
        />
      </div>
      <div className="Field">
        <p>Email</p>
        <input
          name="email"
          type="email"
          placeholder="example@email.com"
          onChange={(event) => setUserEmail(event.target.value)}
        />
      </div>
      <div className="Field">
        <p>Password</p>
        <input
          name="password"
          type="password"
          placeholder="password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </div>
      <div>
        <button type="submit" onClick={handleSubmit}>
          Register
        </button>
      </div>
    </div>
  );
}

export default Form;