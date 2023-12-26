import { signUp } from '../dto/signup';
import { prisma } from '../../../prisma/prismaClient';

const deleteUser = async (index: number) => {
    const result = await prisma.user.delete({
        where: {
            id: index
        }
    });

    return result;
}

const changeName = async (user_id: number, data: signUp) => {
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

const changePassword = async (user_id: number, data: signUp) => {
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

export { deleteUser, changeName, changePassword };