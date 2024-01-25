// Importing Area
import { category } from '../../types/category';
import { prisma } from '../../../prisma/prismaClient';

// This functionality deletes a category register
const removeCategory = async (data: category) => {
    // Searching for category in database and returning the id
    const categoryID = await prisma.category.findFirstOrThrow({
        where: {
            name: data.categoryName
        },
        select: {
            id: true
        }
    });

    // Deleting category register in database
    const result = await prisma.category.delete({
        where: {
            id: categoryID.id
        }
    });

    // Returning the operation result
    return result;
}

// Exporting Area
export { removeCategory }