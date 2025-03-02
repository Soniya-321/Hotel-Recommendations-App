import pandas as pd
import ast

# Load hotel data from CSV
df = pd.read_csv("hotels.csv")

# Convert 'amenities' column from string to list
df["amenities"] = df["amenities"].apply(lambda x: ast.literal_eval(x) if isinstance(x, str) else x)

def get_recommendations(user_input):
    """
    Filters hotels based on user input containing location, price, and amenities.
    """
    if not user_input:
        return {"message": "No available hotels"}

    try:
        # Convert user_input string to dictionary
        user_preferences = ast.literal_eval(user_input)

        location = user_preferences.get("location", "").strip()
        price = user_preferences.get("price")
        amenities = user_preferences.get("amenities", "")

        # Start with a full copy of the DataFrame
        filtered_hotels = df.copy()

        # Filter by location (case-insensitive)
        if location:
            filtered_hotels = filtered_hotels[filtered_hotels["location"].str.lower() == location.lower()]

        # Filter by price (convert to integer)
        if price:
            try:
                price = int(price)
                filtered_hotels = filtered_hotels[filtered_hotels["price"] <= price]
            except ValueError:
                return {"error": "Invalid price format. Please enter a valid number."}

        # Filter by amenities (check if all requested amenities exist in hotel's amenities list)
        if amenities:
            if isinstance(amenities, str):  # If a single amenity is provided as a string
                amenities = [amenities.strip()]
            elif isinstance(amenities, list):  # If multiple amenities are provided as a list
                amenities = [a.strip() for a in amenities]

            filtered_hotels = filtered_hotels[
                filtered_hotels["amenities"].apply(lambda x: all(a in x for a in amenities))
            ]
            
        # If no hotels match the criteria, return a message
        if filtered_hotels.empty:
            return {"message": "No available hotels"}


        return filtered_hotels.to_dict(orient="records")

    except Exception as e:
        return {"error": str(e)}
