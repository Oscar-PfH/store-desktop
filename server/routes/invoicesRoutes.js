const express = require("express");
const { client } = require("../database");
const { ObjectId } = require("mongodb");

const invoiceRoutes = express.Router();

const db_connect = client.db("store");

invoiceRoutes.route("/").get(async function (req, res) {
    const invoices = await db_connect.collection('invoices')
        .find({})
        .toArray();
    res.json(invoices);
});

invoiceRoutes.route("/date/:date").get(async function (req, res) {
    const myquery = { purchase_date: req.params.date }
    const invoice = await db_connect.collection("invoices")
        .find(myquery)
        .toArray();
    res.json(invoice);
});

invoiceRoutes.route("/:id").get(async function (req, res) {
    const query = { _id: new ObjectId(req.params.id) };
    const invoice = await db_connect.collection("invoices")
        .findOne(query);
    res.json(invoice);
});

invoiceRoutes.route("/").post(async function (req, res) {
    const response = await db_connect.collection("invoices")
        .insertOne(req.body);
    res.json(response);
});

invoiceRoutes.route("/:id").put(async function (req, res) {
    const query = { _id: new ObjectId(req.params.id) };
    const response = await db_connect.collection("invoices")
        .updateOne(query, {
            "$set": req.body
        });
    res.json(response);
});

invoiceRoutes.route("/date/:date").delete(async function (req, res) {
    const query = { purchase_date: req.params.date };
    const response = await db_connect.collection("invoices")
        .deleteMany(query);
    res.json(response);
});

invoiceRoutes.route("/:id").delete(async function (req, res) {
    const query = { _id: new ObjectId(req.params.id) };
    const response = await db_connect.collection("invoices")
        .deleteOne(query);
    res.json(response);
});

module.exports = invoiceRoutes;