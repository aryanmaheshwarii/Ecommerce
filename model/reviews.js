const mongoose = require('mongoose');
const { Schema } = mongoose;

const reviewSchema = new Schema({
    review:{
        type: String
    },

    product_id: {
        type: Schema.Types.ObjectId, 
        ref: 'Products'
    },

    user_id: {
        type: Schema.Types.ObjectId, 
        ref: 'User'
    }
    
}, 
{ timestamps: true }
);

module.exports = mongoose.model('Reviews', reviewSchema);