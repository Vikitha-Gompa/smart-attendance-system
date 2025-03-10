import React, { useState } from "react";
import Amplify from './src/aws-config.js'; // Default import
import axios from "axios";

const ParticipationRecord = () => {
  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [date, setDate] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle file change
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  // Upload the file to S3
  const uploadFile = async (file) => {
    try {
      const fileName = `${Date.now()}_${file.name}`;
      const result = await Amplify.Storage.put(fileName, file, {
        contentType: file.type,
      });
      return result.key;
    } catch (error) {
      console.error("Error uploading file:", error);
      return null;
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!file || !name || !email || !date) {
      alert("Please fill in all fields and upload an image!");
      return;
    }

    setLoading(true);

    try {
      // Upload image to S3 and get the S3 URL
      const s3Key = await uploadFile(file);
      if (!s3Key) {
        alert("Error uploading file. Please try again.");
        return;
      }

      // Create the URL to send to API Gateway
      const s3Url = `https://YOUR_S3_BUCKET_NAME.s3.us-west-2.amazonaws.com/${s3Key}`;
      
      // Prepare the payload for the API Gateway
      const payload = {
        name,
        email,
        date,
        source: s3Url,
      };

      // Call API Gateway
      const response = await axios.post(
        "https://xyz123.execute-api.us-west-2.amazonaws.com/prod/participation", // API Gateway URL
        payload
      );

      // Display result (e.g., participation)
      setResult(`Participation: ${response.data.body.participation ? 'Present' : 'Absent'}`);
    } catch (error) {
      console.error("Error processing the image:", error);
      alert("Error processing your image. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Class Participation Record</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Upload Your Image:</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Processing..." : "Upload and Process"}
        </button>
      </form>

      <p>{result}</p>
    </div>
  );
};

export default ParticipationRecord;
