import Axios from 'axios';

class PackagesService {
  API_URI = 'http://localhost:5000/api';

  async getPackages() {
    try {
      const packages = await Axios.get(`${this.API_URI}/packages`);
      if (packages.status === 200)
        return packages.data;
      return [];
    }
    catch (error) {
      console.error(error);
    }
  }

  async getPackage(id) {
    try {
      const pack = await Axios.get(`${this.API_URI}/packages/${id}`);
      if (pack.status === 200)
        return pack.data;
      return null;
    }
    catch (error) {
      console.log(error);
    }
  }

  async addPackage(pack) {
    try {
      const response = await Axios.post(`${this.API_URI}/packages`, pack);
      if (response.status === 200) {
        return response.data;
      }
      return null;
    }
    catch (e) {
      console.error(e);
    }
  }

  async updatePackage(id, updatedPackage) {
    return await Axios.put(`${this.API_URI}/packages/${id}`, updatedPackage);
  }

  async deletePackage(id) {
    return await Axios.delete(`${this.API_URI}/packages/${id}`);
  }
}

const packagesService = new PackagesService();
export default packagesService;