import { Router } from "oak"
import { getChat, getRoot } from "../controllers/chatController.ts"

const router = new Router()

router.get("/", getRoot)
router.post("/chat", getChat)

export default router
