import {NextFunction, Request, Response, Router} from "express";
import characterService from "./characterService";
import Character from "./character";

const characterRouter = Router();

characterRouter.get("/", async (req, res: Response<number[]>, next: NextFunction) => {
    try {
        res.send(await characterService.listCharacterIds());
    } catch (error) {
        next(error);
    }
});

characterRouter.get("/:id", async (req: Request<{ id: string }>, res: Response<Character>, next: NextFunction) => {
    try {
        res.send(await characterService.getCharacter(req.params.id));
    } catch (error) {
        next(error)
    }
});

export default characterRouter;