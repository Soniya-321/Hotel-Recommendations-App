export const fetchHotels = async (location) => {
    const response = await fetch(`http://127.0.0.1:5000/hotels`);
    return await response.json();
  };