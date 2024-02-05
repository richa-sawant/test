const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const questionnaireSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    job: { type: String, required: true },
    goal: { type: String, required: true },
    sleep: { type: String, required: true },
    sittingHour: { type: String, required: true },
    gender: { type: String, required: true }
});

const Questionnaire = mongoose.model('Questionnaire', questionnaireSchema);
module.exports = Questionnaire;
