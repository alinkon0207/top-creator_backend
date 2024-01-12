import { authService } from '../../services/AuthService';
import { ChangeAutoFollowInput } from '../../generated/graphql';
import AutoFollowService from '../../services/AutoFollowService';

const autoFollowMutationResolver = {
    Mutation: {
        async changeAutoFollow(_: never, { input }: { input: ChangeAutoFollowInput }, context: any) {
           try {
               const token = authService.checkToken(context.token);
               
               return await AutoFollowService.changeAutoFollow(token, input);
           } catch (error) {
               console.error('Error:', error);
               throw new Error('Failed to change auto follow.');
           }
        },
    }
};

export default autoFollowMutationResolver;
