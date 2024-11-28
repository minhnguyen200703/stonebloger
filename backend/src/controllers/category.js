import Category from "../models/category.js";
import { categorySchema } from "../schemas/category.js";

export const categoryController = {
	getAll: async (req, res) => {
		try {
			const start = req.query.start ? parseInt(req.query.start) : 1;
			const limit = req.query.limit ? parseInt(req.query.limit) : 10;
			const nameSearch = req.query.name ? req.query.name : "";
			const categoryList = await Category.aggregate([
				{
					$sort: { createdDate: -1 },
				},
				{
					$match: {
						name: { $regex: nameSearch, $options: "i" },
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
			if (categoryList?.length === 0 || !categoryList) {
				return res.status(400).json({
					message: "Không có dữ liệu",
				});
			}
			return res.status(200).json({
				message: "Lấy danh sách thành công",
				data: categoryList?.[0]?.news,
				total:
					categoryList?.[0].pageInfo.length > 0
						? categoryList[0].pageInfo[0].totalRecord
						: 0,
			});
		} catch (error) {
			return res.status(400).json({ message: error.message });
		}
	},
	store: async (req, res) => {
		const { error } = categorySchema.validate(req.body, { abortEarly: false });
		if (error) {
			const errors = error.details.map((err) => err.message);
			return res.status(400).json({
				message: errors,
			});
		}
		try {
			const category = await Category.create(req.body);
			return res
				.status(200)
				.json({ status: true, message: "Success!", category });
		} catch (error) {
			return res
				.status(500)
				.json({ status: false, error: error.message || "Server Error" });
		}
	},
	edit: async (req, res) => {
		const { error } = categorySchema.validate(req.body, { abortEarly: false });
		if (error) {
			const errors = error.details.map((err) => err.message);
			return res.status(400).json({
				message: errors,
			});
		}
		try {
			const category = await Category.findByIdAndUpdate(
				req.params.id,
				{
					$set: {
						name: req.body.name,
					},
				},
				{
					new: true,
				}
			);
			return res
				.status(200)
				.json({ status: true, message: "Success!", category });
		} catch (error) {
			return res
				.status(500)
				.json({ status: false, error: error.message || "Server Error" });
		}
	},
};
