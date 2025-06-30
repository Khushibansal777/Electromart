import mongoose from 'mongoose';
const ProdSchema = new mongoose.Schema({
  name:       String,
  description:String,
  price:      Number,
  image: String,
  category:   { type: mongoose.Types.ObjectId, ref: 'Category' }
});
export default mongoose.model('Product', ProdSchema);