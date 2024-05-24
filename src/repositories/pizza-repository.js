import pkg from "pg";
import { DBConfig } from "../dbConfig.js";

export default class PizzaRepository {
  constructor() {
    const { Client } = pkg;
    this.DBClient = new Client(DBConfig);
    this.DBClient.connect();
  }

  async getProvinceByIdAsync(id) {
    let returnEntity = null;
    try {
      const sql = "SELECT * from provinces p WHERE p.id = $1";
      const values = [id];
      const result = await this.DBClient.query(sql, values);

      if (result.rows.length > 0) {
        returnEntity = result.rows[0];
      }
    } catch (error) {
      console.log(error);
    }
    return returnEntity;
  }

  async getAllProvincePaginatedAsync(limit, offset) {
    let returnArray = null;
    let countElements = -1;
    try {
      let sql =
        "SELECT p.* from provinces p ORDER BY p.display_order OFFSET $2 LIMIT $1";
      const result = await this.DBClient.query(sql, [offset, limit]);

      sql = "SELECT COUNT(*) from provinces p";
      countElements = await this.DBClient.query(sql);

      returnArray = result.rows;
      countElements = countElements.rows[0].count;
    } catch (error) {
      console.log(error);
    }
    return [returnArray, countElements];
  }

  async createProvinceAsync(province) {
    let rowsAffected = 0;
    try {
      const sql = ` INSERT INTO provinces (
                        name, full_name, latitude, longitude, display_order
                    ) VALUES (
                        $1, $2, $3, $4, $5
                    )`;
      const values = [
        province?.name ?? "",
        province?.full_name ?? "",
        province?.latitude ?? 0,
        province?.longitude ?? 0,
        province?.display_order ?? 0,
      ];
      const result = await this.DBClient.query(sql, values);
      rowsAffected = result.rowCount;
    } catch (error) {
      console.log(error);
    }
    return rowsAffected > 0;
  }

  async updateProvinceById(id, province) {
    const previousProvince = await this.getProvinceByIdAsync(id);
    let rowsAffected = 0;
    try {
      const sql = ` UPDATE provinces p SET 
                        p.name            = $2, 
                        p.full_name       = $3, 
                        p.latitude        = $4, 
                        p.longitude       = $5, 
                        p.display_order   = $6
                    WHERE p.id = $1`;
      const values = [
        id,
        province?.name ?? previousProvince?.name,
        province?.full_name ?? previousProvince?.full_name,
        province?.latitude ?? previousProvince?.latitude,
        province?.longitude ?? previousProvince?.longitude,
        province?.display_order ?? previousProvince?.display_order,
      ];
      const result = await this.DBClient.query(sql, values);
      rowsAffected = result.rowCount;
    } catch (error) {
      console.log(error);
    }
    return rowsAffected > 0;
  }

  async deleteProvinceByIdAsync(id) {
    let rowsAffected = 0;
    try {
      const sql = "DELETE from provinces p WHERE p.id = $1";
      const values = [id];
      const result = await this.DBClient.query(sql, values);
      rowsAffected = result.rowCount;
    } catch (error) {
      console.log(error);
    }
    return rowsAffected > 0;
  }
}
