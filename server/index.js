const express = require("express");
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });

const productRoutes = require("./routes/productsRoutes");
const unitRoutes = require("./routes/unitsRoutes");
const packageRoutes = require("./routes/packagesRoutes");
const bakeryRoutes = require("./routes/bakeryRoutes");
const invoiceRoutes = require("./routes/invoicesRoutes");

class Server {
  constructor() {
    this.app = express();
    this.config();
    this.routes();
  }

  config() {
    this.app.set('port', process.env.PORT || 5000);
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: false}));
  }

  routes() {
    this.app.get('/', (req, res) => {
      res.send('Welcome to Store\'s API, go to /api')
    });
    this.app.use('/api/products', productRoutes);
    this.app.use('/api/units', unitRoutes);
    this.app.use('/api/packages', packageRoutes);
    this.app.use('/api/bakery', bakeryRoutes);
    this.app.use('/api/invoices', invoiceRoutes);
  }

  start() {
    this.app.listen(this.app.get('port'), () => {
      console.log(`Server is running on port: ${this.app.get('port')}`);
    });
  }
}

const server = new Server();
server.start();