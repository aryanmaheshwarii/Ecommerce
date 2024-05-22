const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number, 
        required: true
    },
    description: {
        type: [String],
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    user_id: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
});

module.exports = mongoose.model('Products', productSchema);