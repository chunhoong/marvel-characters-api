import {Router} from "express";
import characterService from "./characterService";

const characterRouter = Router();

characterRouter.get("/", async (req, res) => {
    res.send(await characterService.listCharacterIds());
});

characterRouter.get("/:id", async (req, res) => {
    res.send(await characterService.getCharacter(req.params.id));
});

export default characterRouter;