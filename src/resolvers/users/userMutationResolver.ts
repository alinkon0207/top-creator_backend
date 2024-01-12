import UserService from '../../services/UserService';
import { UserRole } from '../../constants/UserRole';
import {
    ChangePasswordInput,
    LoginInput,
    RegisterUserInput
} from '../../generated/graphql';

const userMutationResolvers = {
    Mutation: {
        async register(_: unknown, { input }: { input: RegisterUserInput }) {
            try {
                const { user, token } = await UserService.createUser({
                    ...input,
                    role: UserRole.USER
                });


                return {
                    message: `User with email: ${ user.email } successfully created`,
                    user,
                    token
                };
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to register user.');
            }
        },

        async login(_: unknown, { input }: { input: LoginInput }) {
            try {
                const { user, token, creators } = await UserService.authenticate(input);

                return {
                    message: `User with id ${user.id} successfully authenticated`,
                    user,
                    token,
                    creators
                };
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to authenticate user.');
            }
        },

        async forgotPassword(_: unknown, { login }: { login: string }) {

            try {

                return await UserService.sendPasswordResetCode(login);
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to send password reset code.');
            }
        },

        async changePassword(_: unknown, { input }: { input: ChangePasswordInput }) {

            try {

                return  await UserService.changePassword(input);
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to change password.');
            }
        },
    }
};

export default userMutationResolvers;
