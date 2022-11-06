const { Schema, model } = require("mongoose");

const schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    accessToken: {
      type: String,
    },
    refreshToken: {
      type: String,
    },
    exporesIn: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Token", schema);
