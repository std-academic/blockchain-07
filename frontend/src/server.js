import express from "express";
import bodyParser from "body-parser";
import * as api from "./api.js";
const port = process.env.PORT || 8080;
const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.get('/', async (req, res) => {
    res.render('index');
});
// /queryAllCars and /queryCar use same template
app.get('/queryAllCars', async (req, res) => {
    const cars = await api.queryAllCars();
    res.render('cars', { cars });
});
app.get('/queryCar', async (req, res) => {
    try {
        const car = await api.queryCar(req.query.carnumber);
        res.render('cars', { cars: [car] });
    }
    catch {
        res.render('cars', { cars: [] });
    }
});
// /createCar redirect to /queryCar/:<createdCar>
app.post('/createCar', async (req, res) => {
    try {
        await api.createCar(req.body);
    }
    catch {
    }
    res.redirect(`/queryCar?carnumber=${req.body.carnumber}`);
});
// /changeCarOwner use query template and show changed result
app.post('/changeCarOwner', async (req, res) => {
    const car = await api.changeCarOwner(req.body.carnumber, req.body.newowner);
    res.render('cars', { cars: [car] });
});
app.listen(port);
console.log('Server started at http://localhost:' + port);
