import { Router, Request, Response } from "express";
import { addUser, findSpecifUser } from './users/users.service';

const router = Router();

router.post('/signin', (req: Request, res: Response) => {

});

router.post('/signup', async (req: Request, res: Response) => {
    const { userName, userEmail, userPassword } = req.body;

    if (!userName && !userEmail && !userPassword) {
        throw new Error("missing user informations!");
    }

    const checkIfThereIsAlreadyUser = await findSpecifUser(req.body);

    if (checkIfThereIsAlreadyUser) {
        throw new Error('User already exists!');
    }

    const result = addUser({
        userName: userName,
        userEmail: userEmail,
        userPassword: userPassword
    });

    return result;
});

export { router };