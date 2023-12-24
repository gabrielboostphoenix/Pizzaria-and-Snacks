import { signIn } from './dto/signin';
import { signUp } from './dto/signup';
import { prisma } from '../../prisma/prismaClient';

const addUser = async (data: signUp) => {
    const result = await prisma.user.create({
        data: {
            name: data.userName,
            email: data.userEmail,
            password: data.userPassword
        }
    });

    return result;
}

const deleteUser = async (data: signIn) => {
    await prisma.user.findMany({
        where: {
            email: data.userEmail,
            password: data.userPassword
        }
    });
}

const findSpecifUser = async (data: signUp) => {
    const result = await prisma.user.findFirst({
        where: {
            name: data.userName,
            email: data.userEmail,
            password: data.userPassword
        },
        select: {
            id: true
        }
    });

    return result;
}

const changeName = async (user_id: number, data: signUp) => {
    await prisma.user.update({
        where: {
            id: user_id
        },
        data: {
            name: data.userName
        }
    })
}

export { addUser, deleteUser, findSpecifUser, changeName };