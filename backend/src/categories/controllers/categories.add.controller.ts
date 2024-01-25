// Importing Area
import { addCategory } from '../services/categories.add.service';
import { Response } from 'express';

class categoryAddController {

    // This functionality handles the category adding request
    async handle(req: any, res: Response) {
            // Checking for avaliable user credentials in the category adding request
            if (req.userCredentials.success === true) {

                // Adding the category in the system
                const result = await addCategory(req.body);

                // Checking for data types in the operation result
                if (typeof result === 'object') {

                    // It was possible create the category register
                    return res.status(201).json({
                        statusCode: 201,
                        successMessage: "New category was created with successfully!"
                    });

                } else if (typeof result === 'string') {

                    // It wasn't possible create the new category
                    return res.
                }

            } else {

                // Returning an error response to the client
                return res.status(401).json({
                    statusCode: 401,
                    errorMessage: "Unauthorized Category Adding Service"
                });

            }

        }
    }
}

// Exporting Area
export { categoryAddController };