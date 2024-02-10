const express = require("express");
const { client } = require("../database");
const { ObjectId } = require("mongodb");

const productRoutes = express.Router();

const db_connect = client.db("store");

productRoutes.route("/").get(async function (req, res) {
    let products = await db_connect.collection('products')
        .find({})
        .toArray();
    res.json(products);
});

productRoutes.route("/:id").get(async function (req, res) {
    let myquery = { _id: new ObjectId(req.params.id) };
    let product = await db_connect.collection("products")
        .findOne(myquery);
    res.json(product);
});

productRoutes.route("/").post(async function (req, res) {
    let response = await db_connect.collection("products")
        .insertOne(req.body);
    res.json(response);
});

productRoutes.route("/:id").put(async function (req, res) {
    const query = { _id: new ObjectId(req.params.id)};
    let response = await db_connect.collection("products")
        .updateOne(query, {
            "$set": req.body
        });
    res.json(response);
})

productRoutes.route("/:id").delete(async function (req, res) {
    const query = { _id: new ObjectId(req.params.id) };
    let response = await db_connect.collection("products")
        .deleteOne(query);
    res.json(response);
})

module.exports = productRoutes;