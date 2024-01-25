// Importing Area
import { category } from '../../types/category';
import { prisma } from '../../../prisma/prismaClient';

// This functionality deletes a category register
const removeCategory = async (data: category) => {

    // Searching for category register in database and returning the id
    const categoryID = await prisma.category.findFirst({
        where: {
            name: data.categoryName
        },
        select: {
            id: true
        }
    });

    // Checking the database operation result
    if (!categoryID) {

        // In this case wasn't possible to find the category register in database
        // Returning an error message
        return "Non-Existent Category Register";

    } else {

        // In this case was possible to find the specific category
        // Deleting category register in database
        const result = await prisma.category.delete({
            where: {
                id: categoryID.id
            }
        });

        // Returning the operation result
        return result;

    }

}

// Exporting Area
export { removeCategory };