// Importing area
import { prisma } from '../../../prisma/prismaClient';

// Declaration the service functionalities

// This functionality deletes an user from database
const deleteUser = async (user_id: string) => {
    const result = await prisma.user.delete({
        where: {
            id: user_id
        }
    });

    return result;
}

// This functionality changes the user name from database
const changeName = async (user_id: string, name: string) => {
    const result = await prisma.user.update({
        where: {
            id: user_id
        },
        data: {
            name: name
        }
    })

    return result;
}

// This functionality changes the user password from database
const changePassword = async (user_id: string, password: string) => {
    const result = await prisma.user.update({
        where: {
            id: user_id
        },
        data: {
            password: password
        }
    });

    return result;
}

const findSpecifUserByID = async (user_id: string) => {
    const result = await prisma.user.findUnique({
        where: {
            id: user_id
        }
    });

    return result;
}

// Exporting area
export { deleteUser, changeName, changePassword, findSpecifUserByID };