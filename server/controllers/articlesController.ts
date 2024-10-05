import { Request, Response } from "express";
import User from "../models/User";
import Article from "../models/Article";
import Category from "../models/Category";
import { ObjectId } from "mongoose";

const pageSize = 100;

export const getArticles = async (req: Request, res: Response) => {
	console.log("getArticles", req.params);

	try {
		const page = +req.params.page || 1;
		const articles = await Article.find()
			.skip((page - 1) * pageSize)
			.limit(pageSize)
			.populate({
				path: "author",
				select: "-password",
			})
			.populate({
				path: "category",
			});

		res.json({ articles });
	} catch (e) {
		res.status(500).json({ message: "Server error" });
	}
};

export const addArticle = async (req: Request, res: Response) => {
	console.log("addArticle", req.body, req.file);

	try {
		const { category, title, text, image } = req.body;
		const author = await User.findById((req.user as any).id).select(
			"-password"
		);
		const categoryDB = await Category.findById(category);
		const date = new Date();

		const imageString = `data:image/png;base64,${req.file?.buffer.toString(
			"base64"
		)}`;
		const article = await Article.create({
			category: categoryDB,
			title,
			text,
			image: imageString,
			date,
			author,
		});

		res.json({ article });
	} catch (e) {
		res.status(500).json({ message: "Server error" });
	}
};

export const getCategories = async (req: Request, res: Response) => {
	console.log("getCategories");

	try {
		const categories = await Category.find();
		const categoriesRes = categories.map(({ name, _id }) => ({
			name,
			id: _id,
		}));
		console.log("categoriesRes", categoriesRes);

		res.json({ categories: categoriesRes });
		// res.status(500).json({ message: "Server error" });
	} catch (e) {
		console.log("getCategories error", e);

		res.status(500).json({ message: "Server error" });
	}
};

export const editArticle = async (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		const { category, title, text } = req.body;

		if (!id) {
			return res.status(400).json({ message: "No article id provided" });
		}

		const updateFields: any = { category, title, text };

		if (req.file) {
			const imageString = `data:image/png;base64,${req.file.buffer.toString(
				"base64"
			)}`;
			updateFields.image = imageString;
		}

		const updatedArticle = await Article.findByIdAndUpdate(id, updateFields, {
			new: true,
		})
			.populate({
				path: "author",
				select: "-password",
			})
			.populate({
				path: "category",
			});

		if (!updatedArticle) {
			return res.status(400).json({ message: "Article not found" });
		}

		res.json({ article: updatedArticle });
	} catch (e) {
		res.status(500).json({ message: "Server error" });
	}
};

export const deleteArticle = async (req: Request, res: Response) => {
	console.log("deleteArticle", req.params);

	try {
		const { id } = req.params;
		const user = await User.findById((req.user as any).id);
		if (!id) {
			res.status(400).json({ message: "No article id provided" });
		}
		const article = await Article.findById(id);
		if (!article) {
			res.status(400).json({ message: "Article not found" });
		} else if (
			article?.author.toString() === (<ObjectId>user?._id).toString()
		) {
			await article.deleteOne();
			res.status(200).json({ message: "Successfully deleted" });
		} else {
			res.status(403).json({ message: "User not allowed to delete" });
		}
	} catch (e) {
		res.status(500).json({ message: "Server error" });
	}
};

export const getArticle = async (req: Request, res: Response) => {
	console.log("getArticle", req.params);

	try {
		const { id } = req.params;
		if (!id) {
			res.status(400).json({ message: "No article id provided" });
		}
		const article = await Article.findById(id)
			.populate({
				path: "author",
				select: "-password",
			})
			.populate({
				path: "category",
			});
		if (!article) {
			res.status(400).json({ message: "Article not found" });
		}

		res.json({ article });
		// res.json({ article: {name: 'test' }});
	} catch (e) {
		res.status(500).json({ message: "Server error" });
	}
};

export const searchArticles = async (req: Request, res: Response) => {
	const searchString = req.query.q || "";
	const filter = req.query.filter || "all";
	const sortingType = req.query.sort || "ascending";

	try {
		let query: any = {
			$or: [
				{ title: { $regex: searchString, $options: "i" } },
				{ text: { $regex: searchString, $options: "i" } },
			],
		};

		if (filter !== "all") {
			query.category = filter;
		}

		let articles = await Article.find(query)
			.populate({
				path: "author",
				select: "-password",
			})
			.populate({
				path: "category",
			});

		switch (sortingType) {
			case "date":
				articles = articles.sort(
					(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
				);
				break;
			case "descending":
				articles = articles.reverse();
				break;
			case "ascending":
			default:
				break;
		}

		res.json({ articles });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: "Server Error" });
	}
};
