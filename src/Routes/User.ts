import { createUser, getUser } from "../Controllers/Users";

import { Router } from "express";
// import auth from "../Middleware/auth";

const router: Router = Router();

router.post('/user', getUser)
router.post('/user/create', createUser)

export default router;