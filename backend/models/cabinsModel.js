const mongoose = require('mongoose');


const cabinSchema = new mongoose.Schema({
    name:{
        type:String
    },
    maxCapacity:{
        type:Number
    },
    discount:{
        type:Number
    },
    regularPrice:{
        type:Number
    },
    image:{
        type:String
    },
    description:{
        type:String
    }
})

const Cabins = mongoose.model('Cabins',cabinSchema);

module.exports = Cabins;