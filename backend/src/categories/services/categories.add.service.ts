// Importing Area
import { category } from '../../types/category';
import { prisma } from '../../../prisma/prismaClient';

// This functionality adds a new category
const addCategory = async (data: category) => {

    // Searching for an existing category register in database
    const checkingForExistingRegister = await prisma.category.findFirst({
        where: {
            name: data.categoryName
        }
    });

    if (!checkingForExistingRegister) {

        // In this case there's no category register
        // Creating a new category register in database
        const result = await prisma.category.create({
            data: {
                name: data.categoryName
            }
        });

        // Returning the operation result
        return result;

    } else {

        // In this case there's a category register
        // Returning an error because it wasn't possible the database operation
        return "There's no possibility to create a new category like this because already exists!";

    }

}

// Exporting Area
export { addCategory };