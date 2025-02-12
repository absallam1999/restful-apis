import config from "../Database/config";
import User from "./Types/users.Type";
import database from "../Database";
import bcrypt from "bcrypt";

// Hashing Password with BCRYPT
const hash = (password: string) => {
  const salt = parseInt(config.salt as string);
  return bcrypt.hashSync(password + config.pepper, salt);
};

export class UsersModel {
  // Create User Method
  async CreateUser(user: User): Promise<User> {
    try {
      // Open Connection
      const conn = await database.connect();
      const SQL = "SELECT email FROM users WHERE email=($1)";
      const result = await conn.query(SQL, [user.email]);
      if (result.rows.length) {
        throw new Error(`User with Email ${user.email} Already Exist!`);
      } else {
        const SQL =
          "INSERT INTO users(user_name, first_name, last_name, email, password)VALUES($1, $2, $3, $4, $5) RETURNING id, user_name, first_name, last_name, email, image";
        // Run SQL Query
        const result = await conn.query(SQL, [
          user.user_name,
          user.first_name,
          user.last_name,
          user.email,
          hash(user.password),
        ]);
        // Release Connection
        conn.release();
        // Return CREATED USER
        return result.rows[0];
      }
    } catch (err) {
      throw new Error(`Error Creating User ${user.user_name} \n ${err}`);
    }
  }
  // Get Users Method
  async GetUsers(username: string): Promise<User> {
    try {
      // Open Connection
      const conn = await database.connect();
      const SQL =
        "SELECT id, user_name, first_name, last_name, email, image FROM users WHERE user_name=($1)";
      // Run SQL Query
      const result = await conn.query(SQL, [username]);
      // Release Connection
      conn.release();
      // Return ALL USERS
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error Get Users ${err}`);
    }
  }
  // Get Specific User
  async GetUser(id: number): Promise<User> {
    try {
      // Open Connection
      const conn = await database.connect();
      const SQL =
        "SELECT id, user_name, first_name, last_name, email, image FROM users WHERE id=($1)";
      // Run SQL Query
      const result = await conn.query(SQL, [id]);
      // Release Connection
      conn.release();
      // Return SPECIFIC USER
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error Get User ${id} \n ${err}`);
    }
  }
  // Updata User Method
  async UpdateUser(user: User): Promise<User> {
    try {
      // Open Connection
      const conn = await database.connect();
      const SQL =
        "UPDATE users SET user_name=($1), first_name=($2), last_name=($3), email=($4), password=($5) WHERE id=($6) RETURNING id, user_name, first_name, last_name, email, password";
      // Run SQL Query
      const result = await conn.query(SQL, [
        user.user_name,
        user.first_name,
        user.last_name,
        user.email,
        hash(user.password),
        user.id,
      ]);
      // Release Connection
      conn.release();
      // Return UPDATED USER
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error Updating User ${user.user_name} \n ${err}`);
    }
  }
  // Delete User Method
  async DeleteUser(id: number): Promise<User> {
    try {
      // Open Connection
      const conn = await database.connect();
      const SQL =
        "DELETE FROM users WHERE id=$1 RETURNING id, user_name, email";
      // Run SQL Query
      const result = await conn.query(SQL, [id]);
      // Release Connection
      conn.release();
      // Return DELETED USER
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error Deleting User ${id} \n ${err}`);
    }
  }
  // Add User Image Method
  async AddImage(image: string, id: number): Promise<User> {
    try {
      // Open Connection
      const conn = await database.connect();
      const SQL =
        "INSERT INTO users(image)VALUES($1)WHERE id=($2) RETURNING image";
      // Run SQL Query
      const result = await conn.query(SQL, [image, id]);
      // Release Connection
      conn.release();
      // Return USER IMAGE
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error Add Image for User ${id}`);
    }
  }
  // Authenticate User Method
  async Authenticate(email: string, password: string): Promise<User | null> {
    try {
      // Open Connection
      const conn = await database.connect();
      const SQL = "SELECT password FROM users WHERE email=($1)";
      // Run SQL Query
      const result = await conn.query(SQL, [email]);
      if (result.rows.length) {
        const { password: hashedPassword } = result.rows[0];
        const isValid = bcrypt.compareSync(
          password + config.pepper,
          hashedPassword
        );
        if (isValid) {
          const SQL = "SELECT * FROM users WHERE email=($1)";
          const result = await conn.query(SQL, [email]);
          // Return AUTHENTICATE
          return result.rows[0];
        }
      } else {
        throw new Error(`No User with email ${email}`);
      }
      // Release Connection
      conn.release();
      // Return Null
      return null;
    } catch (err) {
      throw new Error(`Error Authenticate User ${err}`);
    }
  }
}
