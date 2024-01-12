import { authService } from '../../services/AuthService';
import { VisibilityInput } from '../../generated/graphql';
import visibilityService from '../../services/VisibilityService';

const visibilityMutationResolver = {
    Mutation: {
        async changeCreatorVisibility(_: unknown,  { input }: {input : VisibilityInput}, context: any) {
            try {
                const token = authService.checkToken(context.token);

                const visibility = await visibilityService.changeVisibility(token, input);

                if (!visibility) {
                    throw new Error('Failed to change visibility.');
                }

                return {
                    message: 'Visibility successfully changed',
                    visibility,
                };
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to authenticate user.');
            }
        }
    }
};

export default visibilityMutationResolver;
