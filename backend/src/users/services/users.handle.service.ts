// Importing area
import { signUp } from '../dto/sign.up';
import { prisma } from '../../../prisma/prismaClient';

// Declaration the service functionalities

// This functionality deletes an user
const deleteUser = async (index: string) => {
    const result = await prisma.user.delete({
        where: {
            id: index
        }
    });

    return result;
}

// This functionality changes the user name
const changeName = async (user_id: string, data: signUp) => {
    const result = await prisma.user.update({
        where: {
            id: user_id
        },
        data: {
            name: data.userName
        }
    })

    return result;
}

// This functionality changes the user password
const changePassword = async (user_id: string, data: signUp) => {
    const result = await prisma.user.update({
        where: {
            id: user_id
        },
        data: {
            password: data.userPassword
        }
    });

    return result;
}

// Exporting area
export { deleteUser, changeName, changePassword };