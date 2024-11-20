import React, { useEffect, useState } from "react";

function PunjabiMenu() {
  const [punjabi, setPunjabi] = useState([]); // State to hold the fetched dishes data
  const [loading, setLoading] = useState(true); // State to track the loading status
  const [error, setError] = useState(null); // State to hold any error message
  const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const [selectedDish, setSelectedDish] = useState(null); // State to hold the selected dish for popup
  const [isPopupOpen, setIsPopupOpen] = useState(false); // State to manage popup visibility

  useEffect(() => {
    fetch("https://673c587f96b8dcd5f3f9901e.mockapi.io/getFoodAppData?category=Punjabi")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setPunjabi(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <div className="loader"></div>
        <p>Please wait...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <p>Oops! Something went wrong.</p>
        <p className="error-message">{error}</p>
      </div>
    );
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPunjabiDishes = punjabi.filter((dish) =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle clicking on a dish to open the popup
  const handleDishClick = (dish) => {
    setSelectedDish(dish); // Set the selected dish
    setIsPopupOpen(true); // Open the popup
  };

  // Close the popup
  const closePopup = () => {
    setIsPopupOpen(false);
    setSelectedDish(null); // Reset selected dish when closing the popup
  };

  return (
    <>
      <div className="home">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search for dishes..."
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <h2 className="page-title">Punjabi Dishes</h2>
        <div className="underline"></div>
        <div className="dishes-container">
          {filteredPunjabiDishes.map((dish) => (
            <div
              key={dish.id}
              className="dish-card"
              onClick={() => handleDishClick(dish)} // Open the popup when a dish is clicked
            >
              <div className="dish-image">
                <img
                  src={dish.image} // Image from the API data
                  alt={dish.name}
                />
              </div>
              <div className="dish-info">
                <h3>{dish.name}</h3>
                <p>{dish.description.length > 120 ? dish.description.substring(0, 120) + '...' : dish.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Popup Modal */}
      {isPopupOpen && selectedDish && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h3>{selectedDish.name}</h3>
              <button className="close-btn" onClick={closePopup}>X</button>
            </div>
            <div className="popup-body">
              <img
                src={selectedDish.image}
                alt={selectedDish.name}
                className="popup-image"
              />
              <p>{selectedDish.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default PunjabiMenu;
