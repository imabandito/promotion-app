import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import bcrypt from 'bcryptjs';
import User from '../models/User';

passport.use(new LocalStrategy({
  usernameField: 'email',
},
async (email, password, done) => {
  try {
    console.log('passport.use(new LocalStrategy', email, password);
    
    const user = await User.findOne({ email });
    if (!user) {
      return done(null, false, { message: 'User does not exist' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return done(null, false, { message: 'Incorrect password.' });
    }

    return done(null, user);
  } catch (error) {
    return done(error);
  }
}));
