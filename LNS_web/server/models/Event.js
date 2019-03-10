const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    id:{
        type: Number,
        require:true
    },
    info:{
        type: String,
        required:true
    }


}); 

const Event = mongoose.model('Event', EventSchema);

module.exports = Event;