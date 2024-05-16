import express from "express";
import gameItem from "../schemas/item.schema.js";
import joi from "joi";

const router = express.Router();

//* 아이템 생성 API **//
router.post("/items", async (req, res, next) => {
  const { item_code, item_name, item_stat } = req.body;

  if (!item_code) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide a code for your item" });
  }

  if (!item_name) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide a name for your item" });
  }

  if (!Array.isArray(item_stat) || item_stat.length === 0) {
    return res
      .status(400)
      .json({ errorMessage: "Please provide a stats for your item" });
  }

  try {
    // Create a new item
    const item = new gameItem({ item_name, item_stat, item_code });

    // Save the item to the database
    await item.save();

    // Respond with the created character
    return res.status(201).json({
      item_code: item.item_code,
      item_name: item.item_name,
      item_stat: item.item_stat,
    });
  } catch (error) {
    // Handle any errors
    next(error);
  }
});

//** 아이템 수정 API **//
router.patch("/items/:item_code", async (req, res, next) => {
  const { item_code } = req.params;
  const { item_name, item_stat } = req.body;

  try {
    const currentItem = await gameItem.findOne({ item_code }).exec();
    if (!currentItem) {
      return res.status(404).json({ errorMessage: "Item not found" });
    }

    if (item_name) {
      currentItem.item_name = item_name;
    }
    if (item_stat) {
      currentItem.item_stat = item_stat;
    }

    await currentItem.save();
    return res
      .status(200)
      .json({ message: "Item updated successfully", item: currentItem });
  } catch (error) {
    next(error);
  }
});

//** 아이템 목록 조회 API**//
router.get("/items", async (req, res, next) => {
  try {
    const items = await gameItem.find().sort({ item_code: 1 }).exec();

    const getAllItems = items.map((item) => ({
      item_code: item.item_code,
      item_name: item.item_name,
    }));

    return res.status(200).json(getAllItems);
  } catch (error) {
    next(error);
  }
});

//**아이템 상세 조회 API **//
router.get("/items/:item_code", async (req, res, next) => {
  const { item_code } = req.params;

  try {
    // Find the item by item_code
    const itemInfo = await gameItem.findOne({ item_code }).exec();

    // If item is not found, return 404
    if (!itemInfo) {
      return res.status(404).json({ errorMessage: "Item not found" });
    }

    // Respond with the selected fields of the item
    return res.status(200).json({
      item_code: itemInfo.item_code,
      item_name: itemInfo.item_name,
      item_stat: itemInfo.item_stat,
    });
  } catch (error) {
    // Handle database errors
    return next(error);
  }
});

export default router;
