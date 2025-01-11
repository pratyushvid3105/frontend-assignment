import React, { useState, useEffect } from "react";
import "./App.css";

const API_URL =
  "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";

function App() {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProjects(data);
    } catch (error) {
      console.error("Error fetching projects:", error);
      setProjects([]);
    }
  };

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = projects.slice(startIndex, endIndex);

  const totalPages = Math.ceil(projects.length / itemsPerPage);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prev) => {
      const next = prev + 1;
      return next < totalPages ? next : prev;
    });
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Highly-Rated Kickstarter Projects</h1>
      </header>

      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>S.No.</th>
              <th>Percentage funded</th>
              <th>Amount pledged</th>
            </tr>
          </thead>
          <tbody>
            {currentProjects.map((project, index) => (
              <tr key={startIndex + index}>
                <td>{startIndex + index}</td>
                <td>{project["percentage.funded"]}</td>
                <td>{project["amt.pledged"]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="pagination">
        <button onClick={handlePrevious} disabled={currentPage === 0}>
          Previous
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1 || projects.length === 0}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
