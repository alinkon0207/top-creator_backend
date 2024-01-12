import { authService } from '../../services/AuthService';
import { ChangePromotionReactivatorInput } from '../../generated/graphql';
import PromotionReactivatorService from '../../services/PromotionReactivatorService';

const promotionReactivatorMutationResolver = {
    Mutation: {
        async changePromotionReactivator(_: never, { input }: { input: ChangePromotionReactivatorInput }, context: any) {
           try {
               const token = authService.checkToken(context.token);

               return await PromotionReactivatorService.changePromotionReactivator(token, input);
           } catch (error) {
               console.error('Error:', error);
               throw new Error('Failed to change promotion reactivator.');
           }
        },
    }
};

export default promotionReactivatorMutationResolver;
