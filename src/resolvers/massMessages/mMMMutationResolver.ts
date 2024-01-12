import { authService } from '../../services/AuthService';
import MMMService from '../../services/MMMService';
import { ChangeMassMessageInput, CreateMassMessageInput } from '../../generated/graphql';
import IMMM from '../../types/IMMM';

const mMMMutationResolver = {
    Mutation: {
        async createMassMessage(_: never, { input }: { input: CreateMassMessageInput }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                const massMessage = await MMMService.createMassMessage(token, input) as IMMM;

                return {
                    message: `Mass message with ${massMessage.id} was created successfully.`,
                    massMessage
                };
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to create mass message.');
            }
        },

        async changeMassMessage(_: never, { input }: { input: ChangeMassMessageInput }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                const massMessage = await MMMService.changeMassMessage(token, input) as IMMM;

                return {
                    message: `Mass message with ${massMessage.id} was changed successfully.`,
                    massMessage
                };
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to change mass message.');
            }
        },

        async deleteMassMessage(_: never, { massMessageId }: { massMessageId: string }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                await MMMService.deleteMassMessage(token, massMessageId);

                return `Mass message with ${massMessageId} was deleted successfully.`;
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to delete mass message.');
            }
        }
    }
};

export default mMMMutationResolver;
