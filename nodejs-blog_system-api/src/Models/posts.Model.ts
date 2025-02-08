import database from "../Database";
import Post from "./Types/posts.Type";

export class PostsModel {
  // Create Post Method
  async CreatePost(Post: Post): Promise<Post> {
    try {
      // Open Connection
      const conn = await database.connect();
      const SQL =
        "INSERT INTO Posts (text, Post, public, user_id) VALUES ($1, $2, $3, $4) RETURNING text, Post, created_date, user_id";
      // Run SQL Query
      const result = await conn.query(SQL, [
        Post.text,
        Post.Post,
        Post.public,
        Post.user_id,
      ]);
      // Release Connection
      conn.release();
      // Return CREATED Post
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error ${err}`);
    }
  }
  // Get Post Method
  async GetPosts(): Promise<Post[]> {
    try {
      // Open Connection
      const conn = await database.connect();
      const SQL =
        "SELECT text, Post, public, created_date, user_id FROM Posts WHERE public=true ORDER BY random() LIMIT 1";
      // Run SQL Query
      const result = await conn.query(SQL);
      // Release Connection
      conn.release();
      // Return ALL PostS
      return result.rows;
    } catch (err) {
      throw new Error(`Error ${err}`);
    }
  }
  // Get Specific Post
  async getPost(id: number): Promise<Post> {
    try {
      // Open Connection
      const conn = await database.connect();
      const SQL =
        "SELECT text, Post, public, created_date, user_id FROM Posts WHERE id=($1)";
      // Run SQL Query
      const result = await conn.query(SQL, [id]);
      // Release Connection
      conn.release();
      // Return SPECIFIC Post
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error ${err}`);
    }
  }
  // Update Post Method
  async UpdatePost(Post: Post): Promise<Post> {
    try {
      // Open Connection
      const conn = await database.connect();
      const SQL =
        "UPDATE Posts SET text=($1), Post=($2), public=($3) WHERE id=($4) RETURNING text, Post, public, created_date";
      // Run SQL Query
      const result = await conn.query(SQL, [
        Post.text,
        Post.Post,
        Post.public,
        Post.id,
      ]);
      // Release Connection
      conn.release();
      // Return UPDAED Post
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error ${err}`);
    }
  }
  // Delete Post Method
  async DestroyPost(id: number): Promise<Post> {
    try {
      // Open Connection
      const conn = await database.connect();
      const SQL = "DELETE FROM Posts WHERE id=($1) RETURNING id, text, Post";
      // Run SQL Query
      const result = await conn.query(SQL, [id]);
      // Release Connection
      conn.release();
      // Return DELETED Post
      return result.rows[0];
    } catch (err) {
      throw new Error(`Error ${err}`);
    }
  }
  // Get Trending Posts
  async TrendingPosts(): Promise<Post[]> {
    try {
      // Open Connection
      const conn = await database.connect();
      const SQL =
        "SELECT * FROM Posts WHERE public=true ORDER BY random() LIMIT 2";
      // Run SQL Query
      const result = await conn.query(SQL);
      // Release Connection
      conn.release();
      //Return TRENDING PostS
      return result.rows;
    } catch (err) {
      throw new Error(`Error ${err}`);
    }
  }
  // Get Profile Posts
  async ProfilePosts(id: number): Promise<Post[]> {
    try {
      // Open Connection
      const conn = await database.connect();
      const SQL = "SELECT * FROM Posts WHERE user_id=($1) LIMIT 3";
      // Run SQL Query
      const result = await conn.query(SQL, [id]);
      // Release Connection
      conn.release();
      // Return PROFILE PostS
      return result.rows;
    } catch (err) {
      throw new Error(`Error ${err}`);
    }
  }
  // Get Profile Posts
  async UserPosts(id: number): Promise<Post[]> {
    try {
      // Open Connection
      const conn = await database.connect();
      const SQL = "SELECT * FROM Posts WHERE user_id=($1)";
      // Run SQL Query
      const result = await conn.query(SQL, [id]);
      // Release Connection
      conn.release();
      // Return PROFILE PostS
      return result.rows;
    } catch (err) {
      throw new Error(`Error ${err}`);
    }
  }
}
