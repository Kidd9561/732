import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const labelSchema = new Schema({
    labelName: String,//category:business
}, {
    timestamps: {}
})
export const Label = mongoose.model('Label', labelSchema);
