const FAQ = require('../models/faqModel');
const mongoose = require('mongoose');

//get all FAQs
const getFAQs = async(req, res) => {
    const faqs = await FAQ.find({}).sort({ createdAt: -1 });

    res.status(200).json(faqs);
}

//get single FAQ
const getFAQ = async(req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'FAQ not found' });
        }

        const faq = await FAQ.findById(id);
        if (!faq) {
            return res.status(404).json({ error: 'FAQ not found' });
        } else {
            res.status(200).json(faq);
        }

    }
    //create new FAQ
const createFAQ = async(req, res) => {
    const { faq_question, faq_category, faq_answer} = req.body;

    let emptyFields = [];

    //validation for empty fields
    if (!faq_question) {
        emptyFields.push('faq_question');
    }
    if (!faq_category) {
        emptyFields.push('faq_category');
    }
    if (!faq_answer) {
        emptyFields.push('faq_answer');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields:', emptyFields });
    }

    //add to db
    try {
        const faq = await FAQ.create({ faq_question, faq_category, faq_answer });
        res.status(200).json({ faq });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

//delete a FAQ
const deleteFAQ = async(req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'FAQ not found' });
        }
        const faq = await FAQ.findOneAndDelete({ _id: id });
        if (!faq) {
            return res.status(404).json({ error: 'FAQ not found' });
        } else {
            res.status(200).json(faq);

        }
    }
    //update a FAQ
const updateFAQ = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'FAQ not found' });
    }
    const faq = await FAQ.findOneAndUpdate({ _id: id }, {
        ...req.body
    });
    if (!faq) {
        return res.status(404).json({ error: 'FAQ not found' });
    } else {
        res.status(200).json(faq);
    }
}



module.exports = {

    createFAQ,
    getFAQs,
    getFAQ,
    deleteFAQ,
    updateFAQ
    
}