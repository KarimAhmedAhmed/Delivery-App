import mongoose, { Schema, Document } from "mongoose";
import { Offer } from "../../../domain/entities/Offer";

const OfferSchema = new Schema<Offer>({
  order: { type: String, required: true },
  driver: { type: String, required: true },
  raisedPrice: { type: Number, required: false },
  status: { type: String, required: true },
});

const OfferModel = mongoose.model<Offer>("Offer", OfferSchema);

export default OfferModel;
