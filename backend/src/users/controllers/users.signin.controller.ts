import { Request, Response } from "express";
import { findSpecifUserID } from "../services/users.auth.service";

class userSignInController {

    async handle(req: Request, res: Response) {
        const { userEmail, userPassword } = req.body;

        if (!userEmail || !userPassword) {
            throw new Error('missing user credentials!');
        }

        const checkIfThereIsAlreadyUser = await findSpecifUserID(req.body);

        if (checkIfThereIsAlreadyUser.length == 0) {
            throw new Error('invalid user credentials!');
        }

        return res.status(200).json({
            message: "You've entered in route with sucessfully!"
        });
    }
}

export { userSignInController };