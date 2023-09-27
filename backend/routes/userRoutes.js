import expres from 'express';
const router = expres.Router();
import {loginUser, registerUser,logoutUser,getUserProfile,updateUserProfile } from '../controllers/userController.js';
import {protectedRoute} from '../middleware/authMiddleware.js';

router.post('/login',loginUser);

router.post('/register',registerUser);

router.post('/logout',logoutUser);

router.route('/profile').get(protectedRoute,getUserProfile).put(protectedRoute,updateUserProfile);

export default router;