import { authService } from '../../services/AuthService';
import { ChangeExpiringFansInput } from '../../generated/graphql';
import ExpiringFansService from '../../services/ExpiringFansService';
const expiringFansMutationResolver = {
    Mutation: {
        async changeExpiringFans(_: never, { input }: { input: ChangeExpiringFansInput }, context: any) {
           try {
               const token = authService.checkToken(context.token);

               const expiringFans = await ExpiringFansService.changeExpiringFans(token, input);

               return {
                   message: 'Expiring fans changed successfully',
                   expiringFans
               };
           } catch (error: any) {
               console.error('Error:', error);
               throw Error;           
        }
        },
    }
};

export default expiringFansMutationResolver;
