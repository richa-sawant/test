const Questionnaire = require('../Models/Questionnaire');
const mongoose = require('mongoose');

const getQuestionnaire = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'No such questionnaire' });
    }

    const questionnaire = await Questionnaire.findById(id);
    if (!questionnaire) {
        return res.status(404).json({ error: 'No such questionnaire' });
    }

    res.status(200).json(questionnaire);
};

const createQuestionnaire = async (req, res) => {
    const { job, goal, sleep, sittingHour, gender } = req.body;
    let emptyFields = [];

    if (!job) {
        emptyFields.push('job');
    }

    if (!goal) {
        emptyFields.push('goal');
    }
    if (!sleep) {
        emptyFields.push('sleep');
    }
    if (!sittingHour) {
        emptyFields.push('sittingHour');
    }
    if (!gender) {
        emptyFields.push('gender');
    }
    if (emptyFields.length > 0) {
        return res.status(400).json({ error: 'Please fill in all the fields', emptyFields });
    }

    try {
        const questionnaire = await Questionnaire.create({ user: user_id, job, goal, sleep, sittingHour, gender });
        res.status(200).json(questionnaire);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


module.exports = { getQuestionnaire, createQuestionnaire };