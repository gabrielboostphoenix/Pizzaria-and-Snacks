// Importing Area
import { Response } from 'express';

class categoryListController {

    // This functionality handles the category list route
    async handle(req: any, res: Response) {

        // Checking for avaliable user credentials in the category list route
        if (req.userCredentials.success === true) {

            // In this case is possible to use the service because it has the jwt
            // Using the service to list all of the categories registered in database
            const result = await 

        } else {

        }

    }
}

// Exporting Area
export { categoryListController };