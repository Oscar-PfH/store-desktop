import Axios from 'axios';

class BakeryService {
  API_URI = 'http://localhost:5000/api/bakery';

  async getBakeryItems() {
    try {
      const items = await Axios.get(`${this.API_URI}`);
      if (items.status === 200)
        return items.data;
      return null;
    }
    catch (e) {
      console.error(e);
    }
  }

  async getBakeryItem(id) {
    try {
      const item = await Axios.get(`${this.API_URI}/${id}`);
      if (item.status === 200)
        return item.data;
      return null;
    }
    catch (error) {
      console.error(error);
    }
  }

  async addBakeryItem(product) {
    try {
      const response = await Axios.post(`${this.API_URI}`, product);
      if (response.status === 200) {
        return response.data;
      }
      return null;
    }
    catch (e) {
      console.error(e);
    }
  }

  async updateBakeryItem(id, updatedProduct) {
    try {
      const response = await Axios.put(`${this.API_URI}/${id}`, updatedProduct);
      if (response.status === 200) {
        return response.data;
      }
      return null;
    }
    catch (e) {
      console.error(e);
    }
  }

  async deleteBakeryItem(id) {
    try {
      const response = await Axios.delete(`${this.API_URI}/${id}`);
      if (response.status === 200) {
        return response.data;
      }
      return null;
    }
    catch (e) {
      console.error(e);
    }
  }
}

const bakeryService = new BakeryService();
export default bakeryService;