import {NextFunction, Request, Response} from "express";
import characterService from "./characterService";
import Character from "./character";

class CharacterController {

    listCharacterIds = async (req: Request, res: Response<number[]>, next: NextFunction) => {
        try {
            res.send(await characterService.listCharacterIds());
        } catch (error) {
            next(error);
        }
    }

    getCharacter = async (req: Request<{ id: string }>, res: Response<Character>, next: NextFunction) => {
        try {
            res.send(await characterService.getCharacter(req.params.id));
        } catch (error) {
            next(error)
        }
    }

}

export default new CharacterController();