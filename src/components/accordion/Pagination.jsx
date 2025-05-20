import React, { useEffect, useState } from 'react';
import '../../styles/Pagination.css';

const Pagination = () => {
  const [data, setData] = useState([]);
  const [displayedData, setDisplayedData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 6;

  async function fetchData() {
    try {
      const response = await fetch(process.env.REACT_APP_PAGINATION_API);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const fetchedData = await response.json();
      setData(fetchedData.plants); // Store all plants data
      setDisplayedData(fetchedData.plants.slice(0, itemsPerPage)); // Display first 5 items
    } catch (error) {
      console.error(`Error fetching data: ${error}`);
    }
  }

  const goToPage = (page) => {
    const startIndex = page * itemsPerPage;
    const newItems = data.slice(startIndex, startIndex + itemsPerPage);
    setDisplayedData(newItems);
    setCurrentPage(page);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="pagination-container">
      <h1 className="pagination-title">🌱 Plant Store</h1>

      <div className="plant-grid">
        {displayedData.length > 0 ? (
          displayedData.map(da => (
            <div key={da.id} className="plant-card">
              <div className="card-image-container">
                <img
                  src={da.image}
                  alt={da.title}
                  className="plant-image"
                  loading="lazy"
                />
                <span className="price-tag">${da.price}</span>
              </div>
              <div className="card-content">
                <h2 className="plant-title">{da.title}</h2>
                <p className="plant-description">{da.description}</p>
              </div>
            </div>
          ))
        ) : (
          <div className="loading-spinner">Loading...</div>
        )}
      </div>

      <div className="pagination-controls">
        <button
          className="pagination-button"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 0}
        >
          ← Previous
        </button>

        {/* Calculate the range of pages to display */}
        {(() => {
          const totalPages = Math.ceil(data.length / itemsPerPage);
          const maxVisiblePages = 3; // Maximum number of page buttons to show
          let startPage = Math.max(0, currentPage - Math.floor(maxVisiblePages / 2));
          let endPage = Math.min(totalPages - 1, startPage + maxVisiblePages - 1);

          // Adjust startPage if endPage is at the last page
          if (endPage === totalPages - 1) {
            startPage = Math.max(0, endPage - maxVisiblePages + 1);
          }

          return Array.from({ length: endPage - startPage + 1 }, (_, index) => (
            <button
              key={startPage + index}
              className={`page-number ${startPage + index === currentPage ? 'active' : ''}`}
              onClick={() => goToPage(startPage + index)}
            >
              {startPage + index + 1}
            </button>
          ));
        })()}

        <button
          className="pagination-button"
          onClick={() => goToPage(currentPage + 1)}
          disabled={(currentPage + 1) * itemsPerPage >= data.length}
        >
          Next →
        </button>
      </div>
    </div>
  );
}

export default Pagination;
