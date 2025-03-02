from flask import Flask
from routes import hotel_routes
from flask_cors import CORS
  # Import your routes

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend communication

# Register Blueprints
app.register_blueprint(hotel_routes)

if __name__ == "__main__":
    app.run(debug=True, host='0.0.0.0')
