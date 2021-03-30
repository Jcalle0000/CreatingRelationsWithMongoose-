const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const storySchema = Schema({
    author: { 
        type: Schema.Types.ObjectId,  // one Person can be the author?
        ref: 'Person' 
    }, 
    title: String,
    fans: [{ 
        type: Schema.Types.ObjectId,  // is this an array of persons
        ref: 'Person' 
    }] // is this set to an array
});


module.exports=mongoose.model("Story", storySchema);