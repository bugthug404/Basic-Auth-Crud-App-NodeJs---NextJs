import mysql, { Connection } from "mysql2";

export class MySQLDatabase {
  private connection: Connection | null = null;

  async connect() {
    console.log("connection request to MySQL...", !!this.connection);
    if (this.connection) return this.connection;

    return new Promise<Connection>((resolve, reject) => {
      const connection = mysql.createConnection({
        host: process.env.SQLHOST,
        user: process.env.SQLUSER,
        password: process.env.SQLPASSWORD,
        database: process.env.SQLDATABASE,
        port: parseInt(process.env.SQLPORT || "3306") || 3306,
      });

      connection.connect((err) => {
        if (err) {
          console.error("Error connecting to MySQL:", err);
          reject(err);
        } else {
          console.log("Connected to MySQL!");
          this.connection = connection;
          resolve(connection);
        }
      });
    });
  }

  async query(sql: string, args: any[] = []) {
    const connection = await this.connect();
    return new Promise((resolve, reject) => {
      connection.query(sql, args, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
      });
    });
  }
}
