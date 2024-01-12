import { authService } from '../../services/AuthService';
import { ppvMessageService } from '../../services/pPVMessageService';
import { ChangeMassMessageInput, CreatePpvMessageInput } from '../../generated/graphql';
import IPPVMessage from '../../types/IPPVMessage';

const pPVMessageMutationResolver = {
    Mutation: {
        async createPPVMessage(_: never, { input }: { input: CreatePpvMessageInput }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                const pPVMessage = await ppvMessageService.createPPVMessage(token, input) as IPPVMessage;

                return {
                    message: `PPVMessage with id: ${pPVMessage.id} was created successfully.`,
                    pPVMessage
                };
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to create mass message.');
            }
        },

        async changePPVMessage(_: never, { input }: { input: ChangeMassMessageInput }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                const pPVMessage = await ppvMessageService.changePPVMessage(token, input) as IPPVMessage;

                return {
                    message: `PPVMessage with id: ${pPVMessage.id} was changed successfully.`,
                    pPVMessage
                };
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to change mass message.');
            }
        },

        async deletePPVMessage(_: never, { pPVMessageId }: { pPVMessageId: string }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                await ppvMessageService.deletePPVMessage(token, pPVMessageId);

                return `PPVMessage with id: ${pPVMessageId} was deleted successfully.`;
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to delete mass message.');
            }
        }
    }
};

export default pPVMessageMutationResolver;
