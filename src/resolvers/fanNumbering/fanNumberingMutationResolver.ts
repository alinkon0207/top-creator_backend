import { authService } from '../../services/AuthService';
import { ChangeFanNumberingInput } from '../../generated/graphql';
import FanNumberingService from '../../services/FanNumberingService';

const fanNumberingMutationResolver = {
    Mutation: {
        async changeFanNumbering(_: never, { input }: { input: ChangeFanNumberingInput }, context: any) {
           try {
               const token = authService.checkToken(context.token);
               return await FanNumberingService.changeFanNumbering(token, input);
           } catch (error) {
               console.error('Error:', error);
               throw new Error('Failed to change fan numbering.');
           }
        },
    }
};

export default fanNumberingMutationResolver;
