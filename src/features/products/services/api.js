import { httpClient } from "../../../lib/axios";
import { sleep } from "../../../shared/utilities/sleep";

class ProductsService {
  #endPoint = "/products";

  async getAll(q = "") {
    await sleep(1000);
    const response = await httpClient.get(
      `${this.#endPoint}${q ? `?title=${q}` : ""}`
    );
    return response.data;
  }

  async getById(id) {
    await sleep(1000);
    const response = await httpClient.get(`${this.#endPoint}?id=${id}`);
    return response.data;
  }

  async getByCategory(categoryId, limit = 50, offset = 0) {
    // some API expose products by category with query param categoryId
    const response = await httpClient.get(
      `${this.#endPoint}?categoryId=${categoryId}`
    );
    const all = response.data;
    return all.slice(offset, offset + limit);
  }

  async getProducts(limit = 50, offset = 0) {
   const response = await httpClient.get(this.#endPoint);
    const all = response.data;
    return all.slice(offset, offset + limit);
  }

  async create(payload) {
    const response = await httpClient.post(this.#endPoint, payload);
    return response.data;
  }

  async update(id, payload) {
    const response = await httpClient.put(`${this.#endPoint}/${id}`, payload);
    return response.data;
  }

  async delete(id) {
    const response = await httpClient.delete(`${this.#endPoint}/${id}`);
    return response.data;
  }
}

export default new ProductsService();
