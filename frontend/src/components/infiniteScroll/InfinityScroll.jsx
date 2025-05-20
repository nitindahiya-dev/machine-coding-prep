import React, { useState, useEffect } from "react";
import "../../styles/InfinityScroll.css";

const InfinityScroll = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const itemsPerPage = 6;

  // Fetch plants with async/await
const fetchPlants = async (pageNum) => {
  try {
    setLoading(true);
    const response = await fetch(process.env.REACT_APP_INFINITY_SCROLL_API);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    const start = pageNum * itemsPerPage;
    const newPlants = data.plants.slice(start, start + itemsPerPage);

    if (newPlants.length === 0) {
      setHasMore(false);
      return;
    }

    setPlants((prev) => [...prev, ...newPlants]);
  } catch (error) {
    console.error("Error fetching plants:", error);
    setHasMore(false);
  } finally {
    setLoading(false);
  }
};

  // Initial fetch
  useEffect(() => {
    fetchPlants(0);
  }, []);

  // Throttle function to limit scroll event frequency
  const throttle = (func, limit) => {
    let inThrottle;
    return (...args) => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  };

  // Scroll handler
  const handleScroll = throttle(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 10 &&
      !loading &&
      hasMore
    ) {
      setPage((prev) => prev + 1);
    }
  }, 200);

  // Add scroll event listener
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loading, hasMore, handleScroll]);

  // Fetch more plants when page changes
  useEffect(() => {
    if (page > 0) {
      fetchPlants(page);
    }
  }, [page]);

  return (
    <div className="plant-store">
      <h1 className="store-title">🌿 Plant Shop</h1>

      <div className="plant-grid">
        {plants.map((plant) => (
          <div key={plant.id} className="plant-card">
            <div className="plant-image-container">
              <img
                src={plant.image}
                alt={plant.title}
                className="plant-image"
                loading="lazy"
              />
              <span className="price-tag">${plant.price}</span>
            </div>

            <div className="plant-details">
              <h3 className="plant-title">{plant.title}</h3>
              <p className="plant-description">{plant.description}</p>

              <div className="size-options">
                {plant.size.map((size, index) => (
                  <button key={index} className="size-button">
                    {size}
                  </button>
                ))}
              </div>

              <div className="stock-info">
                <span className="stock-badge">{plant.quantity} in stock</span>
              </div>
            </div>
          </div>
        ))}

        {loading &&
          Array(6)
            .fill()
            .map((_, index) => (
              <div key={index} className="plant-card skeleton">
                <div className="skeleton-image"></div>
                <div className="skeleton-text"></div>
                <div className="skeleton-text short"></div>
              </div>
            ))}
      </div>

      {!hasMore && plants.length > 0 && (
        <p className="no-more">No more plants to load</p>
      )}
    </div>
  );
};

export default InfinityScroll;