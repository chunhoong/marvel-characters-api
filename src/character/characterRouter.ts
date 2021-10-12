import {NextFunction, Request, Response, Router} from "express";
import characterService from "./characterService";
import Character from "./character";
import characterController from "./characterController";

const characterRouter = Router();

characterRouter.get("/", characterController.listCharacterIds);
characterRouter.get("/:id", characterController.getCharacter);

export default characterRouter;