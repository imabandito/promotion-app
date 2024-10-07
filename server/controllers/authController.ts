import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User";
import Token from "../models/Token";

export const generateToken = (user: any) => {
	return jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
		expiresIn: "30m",
	});
};

export const generateRefreshToken = (user: any) => {
	return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET!, {
		expiresIn: "30d",
	});
};

async function saveRefreshToken(user: any, refreshToken: any) {
	const tokenData = await Token.findOne({ user: user._id });

	if (tokenData) {
		tokenData.refreshToken = refreshToken;
		return tokenData.save();
	}
	const token = Token.create({ user: user._id, refreshToken });

	return token;
}

async function deleteRefreshToken(refreshToken: any) {
	const tokenData = await Token.deleteOne({ refreshToken });

	return tokenData;
}

function validateRefreshToken(token: any) {
	try {
		const user = jwt.verify(token, process.env.JWT_REFRESH_SECRET!);
		return user;
	} catch (error) {
		return null;
	}
}

export const loginUser = async (req: Request, res: Response) => {
	try {
		const token = generateToken(req.user);
		const refreshToken = generateRefreshToken(req.user);
		await saveRefreshToken(req.user, refreshToken);
		const returnUser = await User.findById((req.user as any)._id).select(
			"-password"
		);

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "none",
			maxAge: 30 * 7 * 24 * 60 * 60 * 1000, // 30 days
		});

		res.json({ user: returnUser, token });
	} catch (e) {
		console.log("error", e);
	}
};

export const oauthCallback = (req: Request, res: Response) => {
	const token = generateToken(req.user);
	res.redirect(`${process.env.CLIENT_URL}/oauth-redirect?token=${token}`);
};

export const signupUser = async (req: Request, res: Response) => {
	const { email, password, name, age } = req.body;

	try {
		let user = await User.findOne({ email });

		if (user) {
			return res.status(400).json({ message: "User already exists" });
		}

		const hashedPassword = await bcrypt.hash(password, 10);

		user = await User.create({
			email,
			password: hashedPassword,
			name,
			age,
		});
		const returnUser = await User.findById(user._id).select("-password");

		const token = generateToken(user);
		const refreshToken = generateRefreshToken(user);
		await saveRefreshToken(user, refreshToken);

		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: "none",
			maxAge: 30 * 7 * 24 * 60 * 60 * 1000, // 30 days
		});
		res.json({ user: returnUser, token });
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

export const logoutUser = async (req: Request, res: Response) => {
	const { refreshToken } = req.cookies;
	await deleteRefreshToken(refreshToken);
	res.clearCookie("refreshToken");
	res.json({ message: "Successully logged out!" });
};

export const refreshUser = async (req: Request, res: Response) => {
	const { refreshToken } = req.cookies;

	if (!refreshToken) {
		return res.status(401).json({ message: "Token expired" });
	}
	const userData = validateRefreshToken(refreshToken);

	const refreshTokenDB = await Token.findOne({ refreshToken });

	if (!userData || !refreshTokenDB) {
		return res.status(401).json({ message: "refresh error" });
	}

	const returnUser = await User.findById((userData as any).id).select(
		"-password"
	);
	const token = generateToken(returnUser);
	const newRefreshToken = generateRefreshToken(returnUser);
	await saveRefreshToken(returnUser, newRefreshToken);

	res.cookie("refreshToken", newRefreshToken, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "none",
		maxAge: 30 * 7 * 24 * 60 * 60 * 1000, // 30 days
	});
	res.set("Cache-Control", "no-store").json({ user: returnUser, token });
};

export const updateUserInfo = async (req: Request, res: Response) => {
	try {
		const { refreshToken } = req.cookies;
		const { name, lastName, age } = req.body;

		if (!refreshToken) {
			return res.status(401).json({ message: "Unauthorized" });
		}
		const userData = validateRefreshToken(refreshToken);
		const refreshTokenDB = await Token.findOne({ refreshToken });

		if (!userData || !refreshTokenDB) {
			return res.status(401).json({ message: "Unauthorized" });
		}

		const user = await User.findById((userData as any).id);
		if (user) {
			user.name = name;
			user.lastName = lastName;
			user.age = age;
			await user.save();

			const returnUser = await User.findById((userData as any).id).select(
				"-password"
			);
			res.json({ user: returnUser });
		} else {
			res.status(400).json({ message: "No user" });
		}
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

export const uploadAvatar = async (req: Request, res: Response) => {
	try {
		const avatarString = `data:image/png;base64,${req.file?.buffer.toString(
			"base64"
		)}`;
		const user = await User.findById((req.user as any).id);
		if (user) {
			user.avatar = avatarString;
			await user.save();
			res.send({ avatar: avatarString });
		} else {
			res.status(400).json({ message: "User not found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

export const resetPassword = async (req: Request, res: Response) => {
	try {
		const user = await User.findById((req.user as any).id);
		if (user) {
			const isMatch = await bcrypt.compare(req.body.oldPassword, user.password);
			if (isMatch) {
				const hashedPassword = await bcrypt.hash(req.body.newPassword, 10);
				user.password = hashedPassword;
				await user.save();
				return res.send({ message: "Password changed successfully" });
			} else {
				res.status(400).json({ message: "Wrong old password!" });
			}
		} else {
			res.status(400).json({ message: "User not found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};

export const getUserInfo = async (req: Request, res: Response) => {
	try {
		const user = await User.findById((req.user as any).id).select("-password");
		if (user) {
			res.set("Cache-Control", "no-store").json({ user });
		} else {
			res
				.status(400)
				.set("Cache-Control", "no-store")
				.json({ message: "User not found" });
		}
	} catch (error) {
		res.status(500).json({ message: "Server error" });
	}
};
