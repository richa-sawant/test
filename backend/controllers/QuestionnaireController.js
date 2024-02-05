const Questionnaire = require('../Models/Questionnaire');
const mongoose = require('mongoose');

const getQuestionnaire = async (req, res) => {
    try {
        const user_id = req.user.id; 

        const questionnaire = await Questionnaire.findOne({ user: user_id });

        if (!questionnaire) {
            return res.status(404).json({ error: 'No questionnaire found for the authenticated user' });
        }

        res.status(200).json(questionnaire);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = { getQuestionnaire };

const createQuestionnaire = async (req, res) => {
    const { job, goal, sleep, sittingHour, gender } = req.body;
    const user_id = req.user.id; 

    let emptyFields = [];

    if (!job || !goal || !sleep || !sittingHour || !gender) {
        return res.status(400).json({ error: 'Please fill in all the fields' });
    }

    try {
        const questionnaire = await Questionnaire.create({
            user: user_id,
            job,
            goal,
            sleep,
            sittingHour,
            gender
        });
        res.status(200).json(questionnaire);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = { getQuestionnaire, createQuestionnaire };
