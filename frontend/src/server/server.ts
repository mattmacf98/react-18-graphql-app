import express, {Application, Request, Response} from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import template from "./template";
import * as config from "../config";
import { isConnected } from "./lib/middlewares/user";

const app: Application = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser(config.security.secretKey));
app.use(cors({credentials: true, origin: true}));
app.use(express.static(path.resolve(__dirname, "./public")));


app.get("/login", isConnected(false), (_req: Request, res: Response) => {
    const html = template();
    res.send(html);
})

app.get("/logout", (req: Request, res: Response) => {
    const redirect: any = req.query.redirectTo || "/";
    res.clearCookie("accessToken")
    res.redirect(redirect)
});

app.get("*", (_req: Request, res: Response) => {
    const html = template();
    res.send(html);
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
})