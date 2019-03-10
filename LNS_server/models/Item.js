const mongoose = require('mongoose');

const ItemSchema = new mongoose.Schema({
    id:{
        type: Number,
        require:true
    },
    title:{
        type: String,
        required:true
    },
    categoty:{
        type: String,
        requierd:true
    },
    subcategoty:{
        type: String,
        requierd:true
    },
    itemstate:{
        type: String,
    },
    picpath:{
        type: String,
    },
    location:{
        type: Location,
    },
    properties:{
        type: Properties,
    },
    eventlist:{
        type: [Event],
    },
    careationdate:{
        type: Date,
        default:Date.now()
    },
    updatedate:{
        type: Date,
        default:Date.now()
    }


}); 

const Item = mongoose.model('Item', ItemSchema);

module.exports = Item;