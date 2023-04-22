const OrderAgroProductForm = require("../models/orderAgroProductModel");
const mongoose = require("mongoose");

//get all ordered AgroProducts
const getAllOrderedAgroProducts = async (req, res) => {
  const orderedAgroProducts = await OrderAgroProductForm.find({}).sort({ createdAt: -1 });

  res.status(200).json(orderedAgroProducts);
};

//get a single ordered AgroProduct
const getOrderedAgroProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such ordered agroProduct" });
  }
  const orderedAgroProducts = await OrderAgroProductForm.findById(id);

  if (!orderedAgroProducts) {
    return res.status(404).json({ error: "No such ordered agroProduct" });
  }

  res.status(200).json(orderedAgroProducts);
};

//create a new order for AgroProduct
const createOrderAgroProduct = async (req, res) => {
    const { 
        customer_name, 
        customer_contact, 
        customer_email, 
        customer_address, 
        customer_note,
        p_name, 
    } = req.body;

    let emptyFields = [];

    //validation for empty fields
    if (!customer_name) {
        emptyFields.push("Customer Name");
    }
    if (!customer_contact) {
        emptyFields.push("Customer Contact");
    }
    if (customer_contact.length>10) {
        emptyFields.push("Invalid Contact Number");
    }
    if (!customer_email) {
        emptyFields.push("Customer Email");
    }else {
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(customer_email)) {
          emptyFields.push("Invalid Email Address");
        }
    }
    if (!customer_address) {
        emptyFields.push("Customer Address");
    }
    if (emptyFields.length > 0) {
        return res
            .status(400)
            .json({ error: "Please fill in all fields:", emptyFields });
    }

    //add doc to db
    try {
        const orderAgroProduct = await  OrderAgroProductForm.create({
            customer_name,
            customer_contact,
            customer_email,
            customer_address,
            customer_note,
            p_name,
        });
        res.status(200).json(orderAgroProduct);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  
}
    //delete a agroProduct
    const deleteOrderedAgroProduct = async (req, res) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "No such ordered agroProduct" });
        }
        const orderedAgroProduct = await  OrderAgroProductForm.findOneAndDelete({ _id: id });

        if (!orderedAgroProduct) {
            return res.status(404).json({ error: "No such ordered agroProduct" });
        }

        res.status(200).json(orderedAgroProduct);
    };

    //update a agroProduct
    // const updateAgroProduct = async (req, res) => {
    //     const { id } = req.params;

    //     if (!mongoose.Types.ObjectId.isValid(id)) {
    //         return res.status(404).json({ error: "No such agroProduct" });
    //     }

    //     const agroProduct = await AgroProduct.findOneAndUpdate(
    //         { _id: id },
    //         {
    //             ...req.body,
    //         }
    //     );

    //     if (!agroProduct) {
    //         return res.status(404).json({ error: "No such agroProduct" });
    //     }

    //     res.status(200).json(agroProduct);
    // };

    module.exports = {
        getAllOrderedAgroProducts,
        getOrderedAgroProduct,
        createOrderAgroProduct,
        deleteOrderedAgroProduct,
        //updateAgroProduct,
    };

