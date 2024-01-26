// Importing Area
import { Response } from 'express';
import { listCategory } from '../services/categories.list.service';

class categoryListController {

    // This functionality handles the category list route
    async handle(req: any, res: Response) {

        // Checking for avaliable user credentials in the request header
        if (req.userCredentials.success === true) {

            // In this case is possible to use the service because it has the necessary permission
            // Using it to list all of the categories registered in database
            const result = await listCategory();

            // Checking the amount of itens in array returned from database operation
            if (result.length > 0) {

                // It was returned something so that means there're category registers
                return res.status(200).json({
                    statusCode: 200,
                    successMessage: "Category registers returned with successfully!",
                    result: result
                });

            } else {

                // It wasn't returned something because there's nothing
                return res.status(404).json({
                    statusCode: 404,
                    errorMessage: "Non-existent category registers"
                });

            }

        } else {

            // In this case isn't possible to use the service because it doesn't have the jwt
            return res.status(401).json({
                statusCode: 401,
                errorMessage: "Unauthorized Category Listing Service"
            });

        }

    }
}

// Exporting Area
export { categoryListController };