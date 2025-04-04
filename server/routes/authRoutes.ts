import express from "express";
import passport from "passport";
import {
	signupUser,
	loginUser,
	logoutUser,
	refreshUser,
	updateUserInfo,
	uploadAvatar,
	resetPassword,
	getUserInfo,
} from "../controllers/authController";
import multer from "multer";
import { authenticateJWT } from "../middleware/authMiddleware";
import { oneMonthInMs } from "../constants";

const router = express.Router();

const upload = multer();

router.get(
	"/google",
	passport.authenticate("google", {
		scope: ["profile", "email"],
		session: false,
		accessType: "offline",
	})
);
router.get(
	"/google/callback",
	passport.authenticate("google", {
		failureRedirect: `${process.env.CLIENT_URL}/login`,
		session: false,
	}),
	function (req, res) {
		const { user, accessToken, refreshToken } = req.user as any;
		res.cookie("refreshToken", refreshToken, {
			httpOnly: true,
			secure: process.env.NODE_ENV === "production",
			sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
			maxAge: oneMonthInMs,
		});
		res.redirect(process.env.CLIENT_URL!);
	}
);

router.post("/login", (req, res, next) => {
	passport.authenticate(
		"local",
		{ session: false },
		(err: any, user: any, info: any) => {
			if (err) {
				return next(err);
			}
			if (!user) {
				return res
					.status(401)
					.json({ message: info.message || "Login failed" });
			}
			req.user = user;
			loginUser(req, res);
		}
	)(req, res, next);
});
router.post("/signup", signupUser);
router.post("/logout", logoutUser);
router.get("/refresh", refreshUser);
router.get("/user", authenticateJWT, getUserInfo);
router.post("/updateuserinfo", updateUserInfo);
router.post(
	"/upload-avatar",
	authenticateJWT,
	upload.single("avatar"),
	uploadAvatar
);
router.post("/resetpassword", authenticateJWT, resetPassword);

export default router;
