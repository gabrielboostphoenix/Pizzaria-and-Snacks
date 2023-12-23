import { signIn } from './dto/signin';
import { signUp } from './dto/signup';
import { prisma } from '../../prisma/prismaClient';

const addUser = async (data: signUp) => {
    await prisma
}

const deleteUser = async (data: signIn) => {

}

const changeName = async (data: signIn) => {

}

export { addUser, deleteUser, changeName };