const Mteam = require('../models/MeetTeamModel');
const mongoose = require('mongoose');

//get all Team Details
const getmTeams = async(req, res) => {
    const mTeams = await Mteam.find({}).sort({ createdAt: -1 });

    res.status(200).json(mTeams);
}

//get single Member Details
const getmTeam = async(req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Member not found' });
        }

        const mTeam = await Mteam.findById(id);
        if (!mTeam) {
            return res.status(404).json({ error: 'Member not found' });
        } else {
            res.status(200).json(mTeam);
        }

    }
    //create new Member Profile
const ceatemTeam = async(req, res) => {
    const { member_name, member_age, member_experiences, member_expertise } = req.body;

    let emptyFields = [];

    //validation for empty fields
    if (!member_name) {
        emptyFields.push('vacncy_title');
    }
    if (!member_age) {
        emptyFields.push('vacncy_type');
    }
    if (!member_experiences) {
        emptyFields.push('vacancy_count');
    }
    if (!member_expertise) {
        emptyFields.push('vacncy_requirements');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all fields:', emptyFields });
    }

    //add to db
    try {
        const mTeam = await Mteam.create({ member_name, member_age, member_experiences, member_expertise });
        res.status(200).json({ mTeam });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }

}

//delete a vacancy
const deletemTeam = async(req, res) => {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).json({ error: 'Member not found' });
        }
        const mTeam = await Mteam.findOneAndDelete({ _id: id });
        if (!mTeam) {
            return res.status(404).json({ error: 'Member not found' });
        } else {
            res.status(200).json(mTeam);

        }
    }
    //update a vacancy
const updatemTeam = async(req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Member not found' });
    }
    const mTeam = await Mteam.findOneAndUpdate({ _id: id }, {
        ...req.body
    });
    if (!mTeam) {
        return res.status(404).json({ error: 'Member not found' });
    } else {
        res.status(200).json(mTeam);
    }
}



module.exports = {
    getmTeams,
    getmTeam,
    ceatemTeam,
    deletemTeam,
    updatemTeam

}