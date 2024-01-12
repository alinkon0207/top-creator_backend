import userService from '../services/UserService';
import { UserDto, UserRole } from '../generated/graphql';

export async function adminRoleCheck(token: string): Promise<UserDto> {
    const user = await userService.getUserByToken(token);

    if (user.role !== UserRole.Admin) {
        throw new Error(`User with id ${user.id} is not an admin`);
    }

    return user;
}

export async function adminRoleCheckFromExtension(token: string): Promise<UserDto> {
    const user = await userService.getUserByExtensionToken(token);

    if (user.role !== UserRole.Admin) {
        throw new Error(`User with id ${user.id} is not an admin`);
    }

    return user;
}
