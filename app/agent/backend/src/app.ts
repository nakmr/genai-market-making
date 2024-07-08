import { Application } from "oak"
import router from "./presentation/routes/chatRoute.ts"
import "./infra/config/config.ts"

const app = new Application()

app.use(router.routes())
app.use(router.allowedMethods())

export { app }
