import mongoose, { Schema } from "mongoose";
import { Offer } from "../../../domain/entities/Offer";

const OfferSchema = new Schema<Offer>({
  order: { type: Object, required: true },
  driver: { type: Object, required: true },
  raisedPrice: { type: Number, required: false },
  status: { type: String, required: true },
});

const OfferModel = mongoose.model<Offer>("Offer", OfferSchema);

export default OfferModel;
