const Product = require("../../db").Product;
const route = require("express").Router();

route.get("/", (req, res) => {
  //Get all products
  Product.findAll()
    .then((products) => {
      res.status(200).send(products);
    })
    .catch((err) => {
      res.status(500).send({
        error: "Could not retrive Product!!..",
      });
    });
});

route.post("/", (req, res) => {
  // Validate the values
  if (isNaN(req.body.price)) {
    return res.status(403).send({
      error: "Price not a valid Number!!!..",
    });
  }
  //Add a new Product
  Product.create({
    name: req.body.name,
    manufacturer: req.body.manufacturer,
    price: parseFloat(req.body.price),
  })
    .then((product) => {
      res.status(201).send(product);
    })
    .catch((err) => {
      res.status(501).send({
        error: "Could not add new product!!...",
      });
    });
});

exports = module.exports = route;
