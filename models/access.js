import mongoose from 'mongoose'
import accessSchema from '../schemas/access'

module.exports = mongoose.model('Access',accessSchema);