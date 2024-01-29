// Importing Area
import { product } from '../../types/product';
import { prisma } from '../../../prisma/prismaClient';

// Declaring the functionality that adds products
const addProduct = async (data: product) => {
    
    // Searching for an existing product register in database
    const checkingForExistingRegister = await prisma.product.findFirst({
        where: {
            name: data.productName
        }
    });

    // Checking the database operation result
    if (!checkingForExistingRegister) {

        // In this case wasn't possible to find the specific register
        // Searching for a specific category of product
        const categoryID = await prisma.category.findFirst({
            where: {
                name: data.categoryName
            },
            select: {
                id: true
            }
        });

        // Checking if exists the searched category
        if (categoryID) {

            // So in this case will be possible to add it
            // Because there's avaliable category
            const result = await prisma.product.create({
                data: {
                    name: data.categoryName,
                    price: data.productPrice,
                    description: data.productDescription,
                    banner: data.productBanner,
                    category_id: categoryID.id
                }
            });

            // Returning a success message
            return result;

        } else {

            // So in this case wasn't possible to add it
            // Because there's no the specified category
            // Returning an error message
            return 400;

        }

    } else {

        // In this case was possible to find the specific register
        // So that means won't be possible to add it
        // Returning the an error message
        return 409;

    }
};

// Exporting Area
export { addProduct };