import {Request, Response, Router} from "express";
import characterService from "./characterService";
import Character from "./character";

const characterRouter = Router();

characterRouter.get("/", async (req, res: Response<number[]>) => {
    res.send(await characterService.listCharacterIds());
});

characterRouter.get("/:id", async (req: Request<{ id: string }>, res: Response<Character>) => {
    res.send(await characterService.getCharacter(req.params.id));
});

export default characterRouter;