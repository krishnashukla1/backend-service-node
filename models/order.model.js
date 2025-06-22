const mongoose = require("mongoose");

// const orderSchema = new mongoose.Schema({
//   userId: mongoose.Types.ObjectId,
//   products: [String],
//   total: Number,
//   createdAt: { type: Date, default: Date.now }
// });

// module.exports = mongoose.model("Order", orderSchema);



const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  products: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true
      },
      quantity: {
        type: Number,
        required: true
      }
    }
  ],
  shippingAddress: {
    type: String,
    required: true
  },
  paymentMethod: {
    type: String,
    enum: ["COD", "Card", "UPI"],
    default: "COD"
  },
  status: {
    type: String,
    enum: ["pending", "confirmed", "shipped", "delivered"],
    default: "pending"
  }
}, { timestamps: true });

module.exports = mongoose.model("Order", orderSchema);
