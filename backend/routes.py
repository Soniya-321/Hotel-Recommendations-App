from flask import Blueprint, request, jsonify
import pandas as pd
from recommendation import get_recommendations
import json

hotel_routes = Blueprint('hotel_routes', __name__)

# Load hotel dataset
hotels_df = pd.read_csv("hotels.csv", dtype={"hotel_id":str})

@hotel_routes.route('/hotels', methods=['GET'])
def search_hotels():
    location = request.args.get('location')
    price = request.args.get('price')
    amenities = request.args.get('amenities')
    image_url = request.args.get('image_url')
    description = request.args.get('description')

    filtered_hotels = hotels_df
    if location:
        filtered_hotels = filtered_hotels[filtered_hotels['location'].str.contains(location, case=False, na=False)]
    if price:
        filtered_hotels = filtered_hotels[filtered_hotels['price_range'] == price]
    if amenities:
        amenities_list = amenities.split(',')
        filtered_hotels = filtered_hotels[filtered_hotels['amenities'].apply(lambda x: all(a in x for a in amenities_list))]
    if image_url:
        filtered_hotels = filtered_hotels[filtered_hotels['image_url'] == image_url]
    if description:
        filtered_hotels = filtered_hotels[filtered_hotels['description'] == description]
        
    return jsonify(filtered_hotels.head(56).to_dict(orient="records"))

@hotel_routes.route('/hotels/<hotel_id>', methods=['GET'])
def get_hotel_by_id(hotel_id):
    try:
        # Find the hotel by hotel_id
        hotel = hotels_df[hotels_df['hotel_id'] == hotel_id]

        if hotel.empty:
            return jsonify({"error": "Hotel not found"}), 404

        # Convert the row to a dictionary
        hotel_data = hotel.iloc[0].to_dict()

        # Convert amenities from string to list (if needed)
        hotel_data["amenities"] = eval(hotel_data["amenities"])  # Converts string to list

        return jsonify(hotel_data)

    except Exception as e:
        return jsonify({"error": "An error occurred", "details": str(e)}), 500


@hotel_routes.route('/recommend', methods=['GET'])
def recommend_hotels():
    user_input = request.args.get('preferences')
    recommendations = get_recommendations(user_input)
    return jsonify(recommendations)

