import mongoose from "mongoose";
import News from "../models/news.js";
import { newsSchema } from "../schemas/news.js";
import Category from "../models/category.js";

export const newsController = {
	getNewsAll: async (req, res) => {
		try {
			const start = req.query.start ? parseInt(req.query.start) : 1;
			const limit = req.query.limit ? parseInt(req.query.limit) : 10;
			const newsList = await News.aggregate([
				{
					$match: req.query?.categoryId ? { categoryId: new mongoose.Types.ObjectId(req.query?.categoryId) } : {},
				},
				{
					$sort: { createdDate: -1 },
				},
				{
					$lookup: {
						from: "categories",
						let: { categoryId: "$categoryId" },
						pipeline: [
							{
								$match: { $expr: { $eq: ["$$categoryId", "$_id"] } },
							},
							{
								$project: { name: 1, description: 1 },
							},
						],
						as: "category",
					},
				},
				{
					$unwind: {
						path: "$category",
						preserveNullAndEmptyArrays: true,
					},
				},
				{
					$facet: {
						news: [
							{ $skip: (start - 1) * limit }, // how many records you want to skip
							{ $limit: limit },
						],
						pageInfo: [
							{ $group: { _id: null, totalRecord: { $sum: 1 } } }, // get total records count
						],
					},
				},
			]);
			if (newsList?.length === 0 || !newsList) {
				return res.status(400).json({
					message: "Không có dữ liệu",
				});
			}
			return res.status(200).json({
				message: "Lấy danh sách thành công",
				data: newsList?.[0]?.news,
				total:
					newsList?.[0].pageInfo.length > 0
						? newsList[0].pageInfo[0].totalRecord
						: 0,
			});
		} catch (error) {
			return res.status(400).json({ message: error.message });
		}
	},
	store: async (req, res) => {
		const { error } = newsSchema.validate(req.body, { abortEarly: false });
		if (error) {
			const errors = error.details.map((err) => err.message);
			return res.status(400).json({
				message: errors,
			});
		}
		try {
			const news = await News.create(req.body);
			return res.status(200).json({ status: true, message: "Success!", news });
		} catch (error) {
			console.log("error: ", error);
			return res
				.status(500)
				.json({ status: false, error: error.message || "Server Error" });
		}
	},
	getNewsById: async (req, res) => {
		try {
			const newData = await News.findById(req.params.id).lean();
			if (!newData) {
				return res.status(400).json({
					message: "Không có dữ liệu",
				});
			}
			const category = await Category.findById(newData.categoryId);
			return res.status(200).json({
				message: "Lấy danh sách thành công",
				data: { ...newData, category },
			});
		} catch (error) {
			return res.status(400).json({ message: error.message });
		}
	},
};
