import Axios from 'axios';

class UnitsService {
  API_URI = 'http://localhost:5000/api';

  async getUnits() {
    try {
      const units = await Axios.get(`${this.API_URI}/units`);
      if (units.status === 200)
        return units.data;
      return [];
    }
    catch (error) {
      console.error(error);
    }
  }

  async getUnitsNoPackages() {
    try {
      const units = await Axios.get(`${this.API_URI}/units/no-packages`);
      if (units.status === 200)
        return units.data;
      return [];
    }
    catch (error) {
      console.error(error);
    }
  }

  async getUnit(id) {
    try {
      const unit = await Axios.get(`${this.API_URI}/units/${id}`);
      if (unit.status === 200)
        return unit.data;
      return [];
    }
    catch (error) {
      console.error(error);
    }
  }

  async addUnit(product) {
    try {
      const unit = await Axios.post(`${this.API_URI}/units`, product);
      if (unit.status === 200) {
        return unit.data;
      }
      return null;
    }
    catch (e) {
      console.error(e);
    }
  }

  async updateUnit(id, updatedProduct) {
    try {
      const unit = await Axios.put(`${this.API_URI}/units/${id}`, updatedProduct);
      if (unit.status === 200) {
        return unit.data;
      }
      return null;
    }
    catch (e) {
      console.error(e);
    }
  }

  async deleteUnit(id) {
    return await Axios.delete(`${this.API_URI}/units/${id}`);
  }

}

const unitsService = new UnitsService();
export default unitsService;