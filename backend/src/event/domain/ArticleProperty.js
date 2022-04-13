import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const articlePropertySchema = new Schema({
    language: String,
    region: String,
    source: {type: Schema.Types.ObjectId, ref: 'Label'},
    originalUrl: String,
}, {
    timestamps: {}
});

export const ArticleProperty = mongoose.model('ArticleProperty', articlePropertySchema);
