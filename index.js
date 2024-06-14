const Stripe = require("stripe")
const bodyParser = require("body-parser")
const express = require('express');
require('dotenv').config()
const app = express();

const stripe = Stripe(process.env.STRIPE_SECRET_TEST)

const cors = require("cors");

app.use(bodyParser.json());
app.use(express.static("."));
app.use(cors({
    origin: [ 'http://localhost:3000', 'https://xjj-say-it-with-a-lei-34e7166cb08e.herokuapp.com'],
    methods: ['POST'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.post('/create-intent', cors(), async (req, res, next) => {
    const model = req.body;
    console.log(process.env.STRIPE_SECRET_TEST)

    try {
        const intent = await stripe.paymentIntents.create({
            amount: model.amount,
            currency: 'usd',
            automatic_payment_methods: {
                enabled: true,
            },
            receipt_email: model.receipt_email,
            description: model.description
        });
    
        res.json(intent);
    } catch (e) {
        res.status(500).send({})
    }
});

app.listen(process.env.PORT || 4000, () => {
    console.log("Server is listening on port 4000")
})