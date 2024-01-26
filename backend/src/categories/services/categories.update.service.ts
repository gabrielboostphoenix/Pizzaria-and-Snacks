// Importing Area
import { prisma } from '../../../prisma/prismaClient';
import { category } from '../../types/category';

// This functionality changes the category name
const changeCategoryName = async (data: category) => {

    // Searching for category in database through the name and returning the id
    const categoryID = await prisma.category.findFirst({
        where: {
            name: data.categoryName
        },
        select: {
            id: true
        }
    });

    // Checking for ID if exists the specific category record
    if (categoryID) {

        // In this case was possible to find it
        const categoryNameChanged = await prisma.category.update({
            data: {
                name: data.newCategoryName
            },
            where: {
                id: categoryID.id
            }
        });

        // Returning the database operation result
        return categoryNameChanged;

    } else {

        // In this case wasn't possible to find it
        // Because doesn't exist
        // Returning an error message
        return "Non-Existent Category Register"

    }

};

// Exporting Area
export { changeCategoryName };