import Weather from "./Types/Weather.Type";
import database from "../Database";

export class WeatherModel {
  // Add Temperature Method
  async AddTemperature(weather: Weather): Promise<Weather> {
    try {
      // Open Connection
      const conn = await database.connect();
      const SQL =
        "INSERT INTO weather(id, high_temperature, low_temperature, country, description)VALUES($1, $2, $3, $4, $5) RETURNING *";
      const result = await conn.query(SQL, [
        weather.id,
        weather.high_temperature,
        weather.low_temperature,
        weather.country,
        weather.description,
      ]);
      // Release Connection
      conn.release();
      // Return CREATED Temperature
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error Adding Temperature\n ${err}`);
    }
  }
  // Get Weather Method
  async GetWeather(id: number): Promise<Weather> {
    try {
      // Open Connection
      const conn = await database.connect();
      const SQL =
        "SELECT high_temperature, low_temperature, country, description FROM users WHERE id=($1)";
      // Run SQL Query
      const result = await conn.query(SQL, [id]);
      // Release Connection
      conn.release();
      // Return Weather
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error Get Weather ${err}`);
    }
  }
  // Updata Weather Method
  async UpdateWeather(weather: Weather): Promise<Weather> {
    try {
      // Open Connection
      const conn = await database.connect();
      const SQL =
        "UPDATE weather SET high_temperature=($1), low_temperature=($2), country=($3), description=($4) WHERE id=($5) RETURNING *";
      // Run SQL Query
      const result = await conn.query(SQL, [
        weather.high_temperature,
        weather.low_temperature,
        weather.country,
        weather.description,
        weather.id,
      ]);
      // Release Connection
      conn.release();
      // Return UPDATED Weather
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error Updating Weather ${weather.country} \n ${err}`);
    }
  }
  // Delete Weather Method
  async DeleteWeather(id: number): Promise<Weather> {
    try {
      // Open Connection
      const conn = await database.connect();
      const SQL = "DELETE FROM weather WHERE id=$1 RETURNING *";
      // Run SQL Query
      const result = await conn.query(SQL, [id]);
      // Release Connection
      conn.release();
      // Return DELETED Weather
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error Deleting Weather ${id} \n ${err}`);
    }
  }
}
