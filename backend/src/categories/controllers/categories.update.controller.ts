// Importing Area
import { changeCategoryName } from '../services/categories.update.service';
import { Response } from 'express';

class categoryUpdateController {

    // This functionality handles the category update route
    async handle(req: any, res: Response) {

        // Checking for avaliable user credentials in the category update request
        if (req.userCredentials.success === true) {

            // Changing the category name in database
            const result = await changeCategoryName(req.body);

            // Checking the result if exists the specific category register
            if (typeof result === 'string') {

                // In this case wasn't possible to find the category
                // So that means there's no register in database
                // Returning the result
                return res.status(404).json({
                    statusCode: 404,
                    errorMessage: result
                });

            } else if (typeof result === 'object') {

                // In this case was possible to find the category record
                // Returning the result
                return res.status(200).json({
                    statusCode: 200,
                    successMessage: "Category name changed with successfully!",
                    result: result
                });

            }

        } else {

            // In this case wasn't possible to use the category update service
            // Because it doens't have the access jwt to use it
            // Returning an error response to the client
            return res.status(401).json({
                statusCode: 401,
                errorMessage: "Unauthorized Category Update Service"
            });

        }

    }
}

// Exporting Area
export { categoryUpdateController };