import mongoose from 'mongoose';

const Computer6Schema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    link: { type: String, required: true, trim: true },
  },
  {
    timestamps: true,
    collection: 'computer-6',
  }
);

const Computer6 = mongoose.model('Computer6', Computer6Schema, 'computer-6');
export default Computer6;


