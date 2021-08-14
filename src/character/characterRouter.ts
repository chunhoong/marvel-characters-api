import {Router} from "express";

const characterRouter = Router();

characterRouter.get("/:id", (req, res) => {
   res.send(req.params);
});

export default characterRouter;