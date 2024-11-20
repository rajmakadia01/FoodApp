import React, { useEffect, useState } from "react";
import "../App.css"; // Main global styles

function Home() {
  const [punjabidish, setPunjabi] = useState([]);
  const [southdish, setSouthdish] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(""); // State for search term
  const [selsectDish , setSelectDish] = useState(null)
  const [isPopup , setIsPopup] = useState(false)

  useEffect(() => {
    fetch("https://673c587f96b8dcd5f3f9901e.mockapi.io/getFoodAppData")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something Is wrong");
        }
        return response.json();
      })
      .then((data) => {
        setPunjabi(data)
        setSouthdish(data)
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter dishes based on the search term
  const filteredPunjabiDishes = punjabidish.filter((dish) =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const filteredSouthDishes = southdish.filter((dish) =>
    dish.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

  
  const handleSelectDish = (dish) => {
    setSelectDish(dish)
    setIsPopup(true)
  }

  const handleClose = () => {
    setIsPopup(false)
    setSelectDish(null)
  }


  return (
    <div className="home">
      {/* Search bar */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for dishes..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>

      <h2 className="page-title">Punjabi Dishes</h2>
      <div className="underline"></div>

      <div className="dishes-container">
        {filteredPunjabiDishes.slice(0, 6).map((dish) => (
          <div key={dish.id} className="dish-card" onClick={() => handleSelectDish(dish)}>
            <div className="dish-image">
              <img
                src={dish.image}
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

      <h2 className="page-title">South Indian Dishes</h2>
      <div className="underline"></div>

      <div className="dishes-container">
        {filteredSouthDishes.slice(12, 18).map((dish) => (
          <div key={dish.id} className="dish-card" onClick={() => handleSelectDish(dish)}>
            <div className="dish-image">
              <img
                src={dish.image}
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

      {isPopup && selsectDish && (
        <div onClick={handleClose} className="popup-overlay">
          <div className="popup-content" onClick={(e) =>  e.stopPropagation()}>
            <div className="popup-header">
              <h3>{selsectDish.name}</h3>
              <button className="close-btn" onClick={handleClose}>X</button>
            </div>
          <div className="popup-body">
              <img src={selsectDish.image} 
                className="popup-image"
                />
              <p>{selsectDish.description}</p>
            </div>
          </div>

        </div>
      )}
    </div>
  );
}

export default Home;
