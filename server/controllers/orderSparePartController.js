const orderedspareparts = require("../models/orderSparePartModel");
const mongoose = require("mongoose");

//get all ordered SpareParts
const getAllOrderedSpareParts = async (req, res) => {
  const orderedSpareParts = await orderedspareparts.find({}).sort({ createdAt: -1 });

  res.status(200).json(orderedSpareParts);
};

//get a single ordered SparePart
const getOrderedSparePart = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such ordered SpareParts" });
  }
  const orderedSpareParts = await orderedspareparts.findById(id);

  if (!orderedSpareParts) {
    return res.status(404).json({ error: "No such ordered SpareParts" });
  }

  res.status(200).json(orderedSpareParts);
};

//create a new order for SparePart
const createOrderSparePart = async (req, res) => {
    const { 
        customer_name, 
        customer_contact, 
        customer_email, 
        customer_address, 
        customer_note,
        customer_buying_option,
        p_name,
        p_price,
        spareparts_user_id,
    } = req.body;

    let emptyFields = [];

    //validation for empty fields
    if (!customer_name) {
        emptyFields.push("Customer Name");
    }
    if (!customer_contact) {
        emptyFields.push("Customer Contact");
    }
    else if (customer_contact.length>10 || customer_contact.length<10) {
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
    if (!customer_buying_option) {
        emptyFields.push("Product Buying Option");
    }
    if (!p_name) {
        emptyFields.push("Product Name");
    }
    if (!p_price) {
        emptyFields.push("Product Price");
    }
    if (emptyFields.length > 0) {
        return res
            .status(400)
            .json({ error: "Please fill in all fields:", emptyFields });
    }

    //add doc to db
    try {
        const orderSparePart = await  orderedspareparts.create({
            customer_name,
            customer_contact,
            customer_email,
            customer_address,
            customer_note,
            customer_buying_option,
            p_name,
            p_price,
            spareparts_user_id,
        });
        res.status(200).json({orderSparePart});
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
  
}
    //delete a SparePart
    const deleteOrderedSparePart = async (req, res) => {
        const { id } = req.params;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "No such ordered SparePart" });
        }
        const orderedSparePart = await  orderedspareparts.findOneAndDelete({ _id: id });

        if (!orderedSparePart) {
            return res.status(404).json({ error: "No such ordered SparePart" });
        }

        res.status(200).json(orderedSparePart);
    };

    //update a SparePart
    const updateOrderedSparePart = async (req, res) => {
        const { id } = req.params;

        const { 
            customer_name, 
            customer_contact, 
            customer_email, 
            customer_address, 
            customer_buying_option,
            p_name,
            p_price,
        } = req.body;
    
        let emptyFields = [];
    
        //validation for empty fields
        if (!customer_name) {
            emptyFields.push("Customer Name");
        }
        if (!customer_contact) {
            emptyFields.push("Customer Contact");
        }
        else if (customer_contact.length>10 || customer_contact.length<10) {
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
        if (!customer_buying_option) {
            emptyFields.push("Product Buying Option");
        }
        if (!p_name) {
            emptyFields.push("Product Name");
        }
        if (!p_price) {
            emptyFields.push("Product Price");
        }
        if (emptyFields.length > 0) {
            return res
                .status(400)
                .json({ error: "Please fill in all fields:", emptyFields });
        }

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: "No such SparePart" });
        }

        const spareParts = await orderedspareparts.findOneAndUpdate(
            { _id: id },
            {
                ...req.body,
            }
        );

        if (!spareParts) {
            return res.status(404).json({ error: "No such SparePart" });
        }

        res.status(200).json(spareParts);
    };

    module.exports = {
        getAllOrderedSpareParts,
        getOrderedSparePart,
        createOrderSparePart,
        deleteOrderedSparePart,
        updateOrderedSparePart,
    };

