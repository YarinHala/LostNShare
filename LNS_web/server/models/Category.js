const mongoose = require('mongoose');

const CategorySchema = new mongoose.Schema({
    id:{
        type: Number,
        require:true
    },
    name:{
        type: String,
        required:true
    },
    subcategories:{
        type: [Subcategory],
        required:true
    }


}); 

const Category = mongoose.model('Category', CategorySchema);

module.exports = Category;