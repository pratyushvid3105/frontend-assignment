import React, { useState, useEffect } from "react";

const API_URL =
  "https://raw.githubusercontent.com/saaslabsco/frontend-assignment/refs/heads/master/frontend-assignment.json";

function Dashboard() {
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

  const totalPages = Math.ceil(projects.length / itemsPerPage);

  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProjects = projects.slice(startIndex, endIndex);

  const handleFirst = () => setCurrentPage(0);

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : prev));
  };

  const handleLast = () => setCurrentPage(totalPages - 1);

  return (
    <div className="app-container">
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
        <button onClick={handleFirst} disabled={currentPage === 0}>
          First
        </button>
        <button onClick={handlePrevious} disabled={currentPage === 0}>
          Previous
        </button>
        <span className="page-info">
          Page <strong>{currentPage + 1}</strong> of {totalPages}
        </span>
        <button
          onClick={handleNext}
          disabled={currentPage === totalPages - 1 || projects.length === 0}
        >
          Next
        </button>
        <button
          onClick={handleLast}
          disabled={currentPage === totalPages - 1 || projects.length === 0}
        >
          Last
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
