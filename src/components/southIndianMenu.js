import { useEffect, useState } from "react";

function SouthIndianMenu() {
  const [southIndian, setSouthIndian] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm,setSearchTerm] = useState('')
  const [selectDish, setSelectDish] = useState(null)
  const [isPopup , setIsPopup] = useState(false)

  useEffect(() => {
    fetch("https://673c587f96b8dcd5f3f9901e.mockapi.io/getFoodAppData?category=South")
      .then((response) => {
        if (!response.ok) {
          throw new Error("Something is wrong");
        }

        return response.json();
      })

      .then((data) => {
        setSouthIndian(data);
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

  const filterSouthDish = southIndian.filter((dish) => 
  dish.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
  }

  const handleDish = (dish) => {
    setSelectDish(dish)
    setIsPopup(true)
  }


  const closePopup = () => {
    setIsPopup(false)
    setSelectDish(null)
  }


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
        <h2 className="page-title">SouthIndian Dishes</h2>
        <div className="underline"></div>
        <div className="dishes-container">
          {filterSouthDish.map((dish) => (
            <div key={dish.id} className="dish-card" onClick={() => handleDish(dish)}>
              <div className="dish-image">
                <img
                  src={dish.image} // Placeholder image
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

      {isPopup && selectDish && (
        <div className="popup-overlay" onClick={closePopup}>
          <div className="popup-content" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h3>{selectDish.name}</h3>
              <button className="close-btn" onClick={closePopup}>X</button>
            </div>
            <div className="popup-body">
              <img
                src={selectDish.image}
                alt={selectDish.name}
                className="popup-image"
              />
              <p>{selectDish.description}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SouthIndianMenu;
