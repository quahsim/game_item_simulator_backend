import mongoose from "mongoose";

const ItemSchema = new mongoose.Schema({
  item_code: {
    type: Number,
    required: true,
  },

  item_name: {
    type: String,
    required: true,
  },

  item_stat: {
    type: Array,
    required: true,
    default: [{ health: 0, power: 0 }],
  },
});

// CharacterSchema를 바탕으로 gameCharacter모델을 생성하여, 외부로 내보냅니다.
export default mongoose.model("gameItem", ItemSchema);
