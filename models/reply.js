import mongoose from 'mongoose'
import replySchema from '../schemas/reply'

module.exports =  mongoose.model('Reply',replySchema);