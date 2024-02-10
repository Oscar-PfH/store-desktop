const express = require("express");
const { client } = require("../database");
const { ObjectId } = require("mongodb");

const unitRoutes = express.Router();

const db_connect = client.db("store");

unitRoutes.route("/").get(async function (req, res) {
    let response = await db_connect.collection("units")
        .find({})
        .toArray();
    res.json(response);
})

// gets units with no package_id
unitRoutes.route('/no-packages').get(async function (req, res) {
    let myquery = { package_id: "" }
    let response = await db_connect.collection("units")
        .find(myquery)
        .toArray();
    res.json(response);
})

// gets one unit by prod_id
// prod_id is saved as string
unitRoutes.route("/:id").get(async function (req, res) {
    let myquery = { prod_id: req.params.id };
    let product = await db_connect.collection("units")
        .findOne(myquery);
    res.json(product);
});

unitRoutes.route("/").post(async function (req, res) {
    let response = await db_connect.collection("units")
        .insertOne(req.body);
    res.json(response);
});

unitRoutes.route("/:id").put(async function (req, res) {
    let query = { prod_id: req.params.id };
    let response = await db_connect.collection("units")
        .updateOne(query, {
            '$set': req.body
        });
    res.json(response);
})

unitRoutes.route("/:id").delete(async function (req, res) {
    let response = await db_connect.collection("units")
        .deleteOne({ prod_id: req.params.id });
    res.json(response);
})

module.exports = unitRoutes;