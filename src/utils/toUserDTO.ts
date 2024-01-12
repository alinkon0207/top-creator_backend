import { UserDto } from '../generated/graphql';
import IUser from '../types/IUser';

export function toUserDTO(user: IUser): UserDto {

    return {
        id: user.id.toString(),
        fullName: user.fullName,
        email: user.email,
        role: user.role ?? undefined,
    };
}
