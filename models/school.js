const mongoose = require('mongoose');

const subtaskSchema = new mongoose.Schema({
    text: String,
    isStudent: Boolean,
});

const schoolSchema = new mongoose.Schema({
    text: String,
    isSchool: Boolean,
    subtasks: [subtaskSchema],
    assignee: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
    }
});

const School = mongoose.model('School', schoolSchema);

module.exports = School;