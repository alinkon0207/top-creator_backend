import { authService } from '../../services/AuthService';
import { ppvFollowService } from '../../services/pPVFollowService';
import { ChangePpvFollowInput } from '../../generated/graphql';
import IPPVFollow from '../../types/IPPVFollow';

const PPVFollowMutationResolver = {
    Mutation: {
        async changePPVFollow(_: never, { input }: { input: ChangePpvFollowInput }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                const pPVFollow = await ppvFollowService.changePPVFollow(token, input) as IPPVFollow;

                return {
                    message: `PPVFollow with id: ${input.id} was changed successfully.`,
                    pPVFollow
                };
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to change pPVFollow.');
            }
        }
    }
};

export default PPVFollowMutationResolver;
