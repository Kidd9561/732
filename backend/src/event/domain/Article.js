import mongoose from 'mongoose';

const Schema = mongoose.Schema;
/**
 * Article object
 * @type {module:mongoose.Schema<any, Model<any, any, any, any>, {}, {}>}
 */
const articleSchema = new Schema({
    //article title
    title: {type: String, required: true}, // Each user must have a unique headline
    authors: Array,
    //article overview
    description: String,
    publish: Date,
    //article content segments
    content: String,
    //article images，
    // images: [{type: Schema.Types.ObjectId, ref: 'ArticleImage'}], // This is how we reference a different collection.
    image: String
}, {
    timestamps: {}
});

export const Article = mongoose.model('Article', articleSchema);
