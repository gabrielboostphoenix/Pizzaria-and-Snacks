// Importing Area
import { addProduct } from '../services/products.add.service';
import { Response } from 'express';

class productAddController {

    // This functionality handles the product adding route
    async handle(req: any, res: Response) {
        
        // Extracting informations through user request
        const { productName, productPrice, productDescription, productBanner, categoryName } = req.body;

        // Checking if any missing informations
        if (!productName || !productPrice || !productDescription
            || !productBanner || !categoryName) {

            // Returning an error message
            return res.status(400).json({
                statusCode: 400,
                errorMessage: "There's no enough informations in the request"
            });

        }

        // Checking if exists avaliable user credentials
        if (req.userCredentials.success === true) {

            // In this case will be possible to use the service
            // Because the request has the necessary user credentials
            // Adding the product in database
            const result = await addProduct(req.body);

            // Checking the data type of the operation result
            if (typeof result === 'object') {

                // Returning a success message
                return res.status(200).json({
                    statusCode: 200,
                    successMessage: "Product addded with successfully!"
                });

            } else if (typeof result === 'number') {

                // Checking the status code of the result
                if (result === 409) {

                    // Returning a specific error response
                    return res.status(409).json({
                        statusCode: 409,
                        errorMessage: "It wasn't possible to add the product because already exists!"
                    });

                } else if (result === 400) {

                    // Returning a specific error response
                    return res.status(400).json({
                        statusCode: 400,
                        errorMessage: "It wasn't possible to add the product because there's no valid category record!"
                    });

                }

            }

        } else {

            // In this case won't be possible to use the service
            // Because the request doesn't have the jwt access
            // Returning an error response
            return res.status(401).json({
                statusCode: 401,
                errorMessage: "Unauthorized Product Adding Service"
            });

        }
    }
};

// Exporting Area
export { productAddController };