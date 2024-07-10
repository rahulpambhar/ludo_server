import { createRoom, getRoom } from "../Controllers/Room";

import { Router } from "express";
// import auth from "../Middleware/auth";

const router: Router = Router();

router.post('/room', getRoom)
router.post('/room/create', createRoom)

export default router;