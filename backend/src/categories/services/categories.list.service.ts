// Importing Area
import { prisma } from '../../../prisma/prismaClient';

// This functionality lists all of the categories
const listCategory = async () => {

    // Getting all of the category registers from database
    const result = await prisma.category.findMany();
    // Returning the result
    return result;

};

// Exporting Area
export { listCategory };