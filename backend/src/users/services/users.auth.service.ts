// Importing area
import { prisma } from '../../../prisma/prismaClient';
import { compare } from 'bcryptjs';
import { signIn } from '../../types/sign.in';

// Declaration of service functionalities

// This functionality finds a specif user and return it
const findSpecifUser = async (data: signIn) => {
    const result = await prisma.user.findFirstOrThrow({
        where: {
            email: data.userEmail
        }
    });

    // Checking if existing password in database matches with the typed user password
    const matchedPassword = await compare(data.userPassword, result.password);

    if (typeof result === 'object' && matchedPassword) {
        return result;
    } else {
        return new Error('invalid user credentials!');
    }
}

// Exporting area
export { findSpecifUser };