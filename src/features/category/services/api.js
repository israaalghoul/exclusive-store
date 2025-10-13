import { httpClient } from "../../../lib/axios";

class CategoriesService {
  #endPoint = "/categories";

  async getAll() {
    const response = await httpClient.get(this.#endPoint);
    return response.data;
  }

  async getById(id) {
    const response = await httpClient.get(`${this.#endPoint}/${id}`);
    return response.data;
  }
}

export default new CategoriesService();
