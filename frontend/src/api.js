export const fetchHotels = async (location) => {
    const response = await fetch(`https://hotel-recommendations-app.onrender.com/hotels`);
    return await response.json();
  };
