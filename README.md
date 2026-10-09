
# ISS Tracker

## Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd iss-tracker-server
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend root directory:

   ```env
   PORT=5000
   DBNAME=your_database_name
   MONGO_URI=your_mongodb_connection_string
   ```

4. Start the backend server:

   ```bash
   node index.js
   ```

## Notes

- Ensure MongoDB is running and the connection string is configured correctly.
- Run the backend and frontend in separate terminals.
- Update the frontend API URL if your backend uses a different port or base URL.