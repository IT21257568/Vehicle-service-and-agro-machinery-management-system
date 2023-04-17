const Promotion = require('../models/promotionModel');
const mongoose = require('mongoose');

//get all promotions
const getPromotions = async(req, res) => {
    const promotions = await Promotion.find({}).sort({ createdAt: -1 });

    res.status(200).json(promotions);
}

//get single promotion
const getPromotion = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid promotion ID' });
    }

    const promotion = await Promotion.findById(id);
    if (!promotion) {
        return res.status(404).json({ error: 'Promotion not found' });
    } else {
        res.status(200).json(promotion);
    }

}
//create new promotion
const createPromotion = async(req, res) => {
const { promo_title, promo_code, promo_discount, promo_description, promo_startDate, promo_endDate } = req.body;

let emptyFields = [];

//validation for empty fields
if (!promo_title) {
    emptyFields.push('promotion_title');
}
if (!promo_code) {
    emptyFields.push('promo_code');
}
if(!promo_discount){
    emptyFields.push('promo_discount');
}
if (!promo_description) {
    emptyFields.push('promo_description');
}
if (!promo_startDate) {
    emptyFields.push('promo_startDate');
}
if (!promo_endDate) {
    emptyFields.push('promo_endDate');
}
if (emptyFields.length > 0) {
    return res.status(400).json({ error: 'Please fill in all fields:', emptyFields });
}

//add promotions to database
try {
    const promotion = await Promotion.create({ promo_title, promo_code, promo_discount, promo_description, promo_startDate, promo_endDate });
    res.status(200).json({ promotion });
} catch (error) {
    res.status(400).json({ error: error.message });
}

}

//delete a promotion
const deletePromotion = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Promotion not found' });
    }
    const promotion = await Promotion.findOneAndDelete({ _id: id });
    if (!promotion) {
        return res.status(404).json({ error: 'Promotion not found' });
    } else {
        res.status(200).json(promotion);

    }
}
//update a promotion
const updatePromotion = async(req, res) => {
const { id } = req.params;
if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: 'Promotion not found' });
}
const promotion = await Promotion.findOneAndUpdate({ _id: id }, {
    ...req.body
});
if (!promotion) {
    return res.status(404).json({ error: 'Promotion not found' });
} else {
    res.status(200).json(promotion);
}
}

module.exports = {

    getPromotions,
    getPromotion,
    createPromotion,
    deletePromotion,
    updatePromotion
    
}