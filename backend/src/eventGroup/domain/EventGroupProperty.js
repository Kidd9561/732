import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const EventGroupPropertySchema = new Schema({
    eventGroupType: String,
    eventGroupTypeDetail: String
}, {
    timestamps: {}
});
const EventGroupProperty = mongoose.model('EventGroupProperty', EventGroupPropertySchema);
export {EventGroupProperty};