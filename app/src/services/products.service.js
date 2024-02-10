import Axios from 'axios';

class ProductsService {
  API_URI = 'http://localhost:5000/api';

  async getProducts() {
    try {
      const products = await Axios.get(`${this.API_URI}/products`);
      if (products.status === 200)
        return products.data;
      return [];
    }
    catch (e) {
      console.error(e);
    }
  }

  async getProduct(id) {
    try {
      const product = await Axios.get(`${this.API_URI}/products/${id}`);
      if (product.status === 200) {
        return product.data;
      }
      return [];
    }
    catch (e) {
      console.error(e);
    }
  }

  async addProduct(product) {
    try {
      const response = await Axios.post(`${this.API_URI}/products`, product);
      if (response.status === 200) {
        return response.data;
      }
      return null;
    }
    catch (e) {
      console.error(e);
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
      const response = await Axios.put(`${this.API_URI}/products/${id}`, updatedProduct);
      if (response.status === 200) {
        return response.data;
      }
      return null;
    }
    catch (e) {
      console.error(e);
    }
  }

  async deleteProduct(id) {
    try {
      const response = await Axios.delete(`${this.API_URI}/products/${id}`);
      if (response.status === 200) {
        return response.data;
      }
      return null;
    }
    catch (e) {
      console.error(e);
    }
  }

  async getInvoices() {
    try {
      const inv = await Axios.get(`${this.API_URI}/invoices`);
      if (inv.status === 200) {
        return inv.data;
      }
      return null;
    }
    catch (e) {
      console.error(e);
    }
  }

  async getInvoicesByDate(inv_date) {
    try {
      const inv = await Axios.get(`${this.API_URI}/invoices/date/${inv_date}`);
      if (inv.status === 200)
        return inv.data;
      return null;
    }
    catch (e) {
      console.error(e);
    }
  }

  async addInvoice(invoice) {
    try {
      const response = await Axios.post(`${this.API_URI}/invoices`, invoice);
      if (response.status === 200) {
        return response.data;
      }
      return null;
    }
    catch (e) {
      console.error(e);
    }
  }

  async deleteInvoice(id) {
    try {
      const response = await Axios.delete(`${this.API_URI}/invoices/${id}`);
      if (response.status === 200) {
        return response.data;
      }
      return null;
    }
    catch (e) {
      console.error(e);
    }
  }

  async deleteInvoicesByDate(inv_date) {
    try {
      const response = await Axios.delete(`${this.API_URI}/invoices/date/${inv_date}`);
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

const productsService = new ProductsService();
export default productsService;