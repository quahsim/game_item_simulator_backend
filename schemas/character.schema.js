import mongoose from "mongoose";

const CharacterSchema = new mongoose.Schema({
  character_id: {
    type: Number,
    required: true,
  },

  name: {
    type: String,
    required: true,
  },

  health: {
    type: Number,
    required: true,
    default: 100, //기본 값
  },

  power: {
    type: Number,
    required: false,
    default: 50, //기본 값
  },
});

// CharacterSchema를 바탕으로 gameCharacter모델을 생성하여, 외부로 내보냅니다.
export default mongoose.model("gameCharacter", CharacterSchema);
