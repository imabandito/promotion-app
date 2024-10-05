import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User';
import dotenv from 'dotenv';
import Token from '../models/Token';
import { generateRefreshToken, generateToken } from '../controllers/authController';

dotenv.config();

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID  as string,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET  as string,
  callbackURL: `http://${process.env.API_URL}:${process.env.PORT}/auth/google/callback`,
},
async (accessToken, refreshToken, profile, done) => {
  
  try {
    let user = await User.findOne({ googleId: profile.id });
    if (!user) {
      user = await User.create({
        googleId: profile.id,
        email: profile.emails?.[0].value,
        name: profile.displayName,
        avatar: profile.photos?.[0].value
      });
    }
    
    const newAccessToken = generateToken(user);
    const newRefreshToken = generateRefreshToken(user);
    

    let token = await Token.findOne({ user: user._id });
    if (token) {
      token.refreshToken = newRefreshToken;
      await token.save();
    }else{
      token = await Token.create({ user: user._id, refreshToken: newRefreshToken });
    }    

    done(null, { user, accessToken: newAccessToken, refreshToken: newRefreshToken });

  } catch (error) {
    done(error, undefined);
  }
}));
