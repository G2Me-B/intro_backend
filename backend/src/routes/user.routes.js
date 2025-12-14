import {Router} from 'express';
import {registerUser,loginUser} from '../controllers/user.controller.js';

const router = Router();

// Register user route — pass the handler as the second argument (do not chain .post())
router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;