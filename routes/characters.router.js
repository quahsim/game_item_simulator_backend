import express from "express";
import gameCharacter from "../schemas/character.schema.js";
import joi from "joi";

const router = express.Router();

const createCharacterName = joi.object({
  name: joi
    .string()
    .required()
    .trim()
    .min(1)
    .max(50)
    .error(
      new Error("Please provide a valid character name (1~50 characters)"),
    ),
});

//*캐릭터 생성 API**//
router.post("/characters", async (req, res, next) => {
  const { name } = req.body;

  try {
    await createCharacterName.validateAsync({ name });
  } catch (error) {
    return res.status(400).json({ errorMessage: error.message });
  }

  try {
    // Check if the character name already exists in the database
    const existingCharacter = await gameCharacter.findOne({ name }).exec();
    if (existingCharacter) {
      return res
        .status(400)
        .json({ errorMessage: "Character name already exists" });
    }

    // Find the highest character_id and increment it
    const charaMaxOrder = await gameCharacter
      .findOne()
      .sort("-character_id")
      .exec();
    const character_id = charaMaxOrder ? charaMaxOrder.character_id + 1 : 1;

    // Create a new character with name and character_id
    const character = new gameCharacter({ name, character_id });

    // Save the character to the database
    await character.save();

    // Respond with the created character
    return res.status(201).json({ character });
  } catch (error) {
    // Handle any errors
    next(error);
  }
});

// //** 캐릭터 상세 조회 API **//
router.get("/characters/:character_id", async (req, res, next) => {
  const { character_id } = req.params;

  try {
    // Find the character by ID
    const characterInfo = await gameCharacter.findOne({ character_id }).exec();

    // If character is not found, return 404
    if (!characterInfo) {
      return res.status(404).json({ errorMessage: "Character not found" });
    }

    // Respond with the selected fields of the character
    return res.status(200).json({
      name: characterInfo.name,
      health: characterInfo.health,
      power: characterInfo.power,
    });
  } catch (error) {
    // Handle database errors
    return next(error);
  }
});

//** 캐릭터 삭제 API **//
router.delete("/characters/:id", async (req, res, next) => {
  const characterId = req.params.id;

  try {
    const deletedCharacter = await gameCharacter.findById(characterId);

    // If character is not found, return 404
    if (!deletedCharacter) {
      return res.status(404).json({ errorMessage: "Character not found!" });
    }
    await gameCharacter.deleteOne({ _id: characterId });
    // Respond with success message
    return res.status(200).json({ message: "Character successfully deleted!" });
  } catch (error) {
    // Handle any errors
    next(error);
  }
});

export default router;
