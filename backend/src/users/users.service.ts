import { signIn } from './dto/signin';
import { signUp } from './dto/signup';
import { prisma } from '../../prisma/prismaClient';

const addUser = async (data: signUp) => {
    await prisma.users.create({
        data: {
            name: data.userName,
            email: data.userEmail,
            password: data.userPassword
        }
    });
}

const deleteUser = async (data: signIn) => {
    await prisma.users.findMany({
        data: {
            email: data.userEmail,
            password: data.userPassword
        }
    });
}

const changeName = async (data: signUp) => {
    await prisma.users.update({
        where: {
            email: data.userEmail
        },
        data: {
            name: data.userName
        }
    })
}

export { addUser, deleteUser, changeName };