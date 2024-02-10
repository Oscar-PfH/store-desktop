const express = require("express");
const { client } = require("../database");
const { ObjectId } = require("mongodb");

const bakeryRoutes = express.Router();

const db_connect = client.db("store");

bakeryRoutes.route("/").get(async function (req, res) {
    let response = await db_connect.collection("bakery")
        .find({})
        .toArray();
    res.json(response);
})

bakeryRoutes.route("/").post(async function (req, res) {
    let response = await db_connect.collection("bakery")
        .insertOne(req.body);
    res.json(response);
})

bakeryRoutes.route("/:id").get(async function (req, res) {
    let myquery = { _id: new ObjectId(req.params.id) };
    let product = await db_connect.collection("bakery")
        .findOne(myquery);
    res.json(product);
});

bakeryRoutes.route("/:id").put(async function (req, res) {
    const query = { _id: new ObjectId(req.params.id) }
    let response = await db_connect.collection("bakery")
        .updateOne(query, {
            "$set": req.body
        });
    res.json(response);
});

bakeryRoutes.route("/:id").delete(async function (req, res) {
    const query = { _id: new ObjectId(req.params.id) };
    let response = await db_connect.collection("bakery")
        .deleteOne(query);
    res.json(response);
});

module.exports = bakeryRoutes;