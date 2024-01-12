import { authService  } from '../../services/AuthService';
import UserService from '../../services/UserService';

const queryResolvers = {
    Query: {
        async getUserByToken(_: never, __: unknown, context: any) {
            try {
                const token = authService.checkToken(context.token);

                const { user, creators, newToken } = await UserService.getUserByTokenWithCreators(token);

                return {
                    user,
                    creators,
                    token: newToken
                };
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to fetch user by token.');
            }
        },
    }
};

export default queryResolvers;
