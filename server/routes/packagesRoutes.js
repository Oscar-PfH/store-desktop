const express = require("express");
const { client } = require("../database");
const { ObjectId } = require("mongodb");

const packageRoutes = express.Router();

const db_connect = client.db("store");

packageRoutes.route("/").get(async function (req, res) {
    let response = await db_connect.collection("packages")
        .find({})
        .toArray();
    res.json(response);
})

// gets one package by prod_id
packageRoutes.route("/:id").get(async function (req, res) {
    let myquery = { prod_id: req.params.id };
    let product = await db_connect.collection("packages")
        .findOne(myquery);
    res.json(product);
});

packageRoutes.route("/").post(async function (req, res) {
    let response = await db_connect.collection("packages")
        .insertOne(req.body);
    res.json(response);
})

packageRoutes.route("/:id").put(async function (req, res) {
    let response = await db_connect.collection("packages")
        .updateOne({ prod_id: req.params.id }, req.body);
    res.json(response);
})

packageRoutes.route("/:id").delete(async function (req, res) {
    let response = await db_connect.collection("packages")
        .deleteOne({ prod_id: req.params.id });
    res.json(response);
})

module.exports = packageRoutes;