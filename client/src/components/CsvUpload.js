import React, { useState, useEffect } from "react";
import "./App.css";
import Axios from "axios";
// import { Card, Row, Col, Input } from "antd";
import { useCSVReader } from "react-papaparse";

function App() {
  const { CSVReader } = useCSVReader();
  const [companyName, setCompanyName] = useState();
  const [file, setFile] = useState(null);
  const [average, setAverage] = useState(null);
  const [totalstocks, setTotalstocks] = useState(null);

  useEffect(() => {
    Axios.get("https://stockx-backend.onrender.com/api/csv/getStock").then(
      (response) => {
        if (response != null) {
          setFile(response);
        }
      }
    );
  }, []);

  return (
    <CSVReader
      onUploadAccepted={(results) => {
        Axios.post("/api/csv/createStock", {
          results,
          companyName,
        }).then((response) => {
          setAverage(response.data.averagePrice);
          setTotalstocks(response.data.totalStock);
          alert("data send succesfully");
        });
      }}
    >
      {(
        { getRootProps, acceptedFile, ProgressBar, getRemoveFileProps },
        reset = () => {
          Axios.delete("http://localhost:8080/reset").then((response) => {
            setAverage(response.data.averagePrice);
            setTotalstocks(response.data.totalStock);
            alert("data deleted succesfully");
          });
        }
      ) => (
        <>
          <input
            type="text"
            name="name"
            onChange={(e) => setCompanyName(e.target.value)}
          />
          <div className="header">Upload your CSV file</div>
          <center>
            <button type="button" {...getRootProps()} className="button">
              Browse file
            </button>
            <div>{acceptedFile && acceptedFile.name}</div>
            {acceptedFile && (
              <button {...getRemoveFileProps()} className="button">
                Remove
              </button>
            )}
          </center>
          <ProgressBar />
          <div className="data">
            {acceptedFile && (
              <div className="data-1">Total stocks : {totalstocks}</div>
            )}
            {acceptedFile && (
              <div className="data-2">Average value : {average}</div>
            )}
          </div>
          <center>
            {acceptedFile && (
              <button onClick={reset} className="button">
                Reset
              </button>
            )}
          </center>
        </>
      )}
    </CSVReader>
  );
}

export default App;
