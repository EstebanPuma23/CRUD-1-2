const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const calcDescuento = (price, discount) => toThousand(price - (discount * price / 100));

const controller = {
    index: (req, res) => {
        res.render('index', { products: products, toThousand, calcDescuento })
    },
    search: (req, res) => {
        return res.render('results', { products: products.filter(product => product.name.toLowerCase().includes(req.query.keywords.toLowerCase())), calcDescuento, toThousand, keywords: req.query.keywords })
    },
};

module.exports = controller;