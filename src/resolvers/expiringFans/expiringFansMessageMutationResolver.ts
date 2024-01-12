import { authService } from '../../services/AuthService';
import {ChangeExpiringFansMessageInput, CreateExpiringFansMessageInput} from '../../generated/graphql';
// change Inputs
import ExpiringFansMessageService from '../../services/ExpiringFansMessageService';
import IExpiringFansMessage from '../../types/IExpiringFansMessage';

const expiringFansMessageMutationResolver = {
    Mutation: {
        async createExpiringFansMessage(_: never, { input }: { input: CreateExpiringFansMessageInput }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                const expiringFans = await ExpiringFansMessageService.createExpiringFansMessage(token, input) as IExpiringFansMessage;

                return {
                    message: `Expiring fans with id: ${expiringFans.id} was created`,
                    expiringFans
                };
            } catch (error) {
                console.error('Error:', error);
                throw Error;            
            }
        },

        async changeExpiringFansMessage(_: never, { input }: { input: ChangeExpiringFansMessageInput }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                const expiringFans = await ExpiringFansMessageService.changeExpiringFansMessage(token, input) as IExpiringFansMessage;

                return {
                    message: `Expiring fans with id: ${expiringFans.id} was updated`,
                    expiringFans
                };
            } catch (error) {
                console.error('Error:', error);
                throw Error;            
            }
        },

        async deleteExpiringFansMessage(_: never, { expiringFansMessageId }: { expiringFansMessageId: string }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                await ExpiringFansMessageService.deleteExpiringFansMessage(token, expiringFansMessageId);

                return `Expiring fans with id: ${expiringFansMessageId} was deleted`;
            } catch (error) {
                console.error('Error:', error);
                throw Error;
            }
        }
    }
}
;

export default expiringFansMessageMutationResolver;
