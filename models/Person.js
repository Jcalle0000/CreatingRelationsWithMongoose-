const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = Schema({
  _id: Schema.Types.ObjectId, // are new object Id'd being created
  name: String,
  age: Number,
  stories: [{  // an array of stories - person can have multiple stories
      type: Schema.Types.ObjectId, 
      ref: 'Story' 
    }]
});


module.exports=mongoose.model("Person", personSchema);