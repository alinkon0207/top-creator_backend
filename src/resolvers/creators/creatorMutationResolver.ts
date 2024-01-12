import { authService } from '../../services/AuthService';
import creatorService from '../../services/CreatorService';
import { ChangeCreatorAuthInput, ChangeLicenseInput } from '../../generated/graphql';
import ICreator from '../../types/ICreator';

const creatorMutationResolver = {
    Mutation: {
        async addCreator(_: never, { link}: { link: string }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                const creator = await creatorService.addCreator(token, link);

                return {
                    message: `Creator with link: ${ creator.link } successfully added`,
                    creator
                };
            } catch (error) {
                console.error('Error:', error);
                throw error;
            }
        },

        async changeLicense(_: never, { input }: { input: ChangeLicenseInput }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                const creator = await creatorService.changeLicense(token, input);

                return {
                    message: `License for creator with id: ${input.creatorId} successfully changed`,
                    creator,
                };
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to change license.');
            }
        },

        async deleteCreator(_: never, { creatorId }: { creatorId: string }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                await creatorService.deleteCreator(token, creatorId);

                return {
                    message: `Creator with id: ${ creatorId } successfully deleted`,
                };
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to delete creator.');
            }
        },

        async changeCreatorAuth(_: never, { input }: { input: ChangeCreatorAuthInput }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                const creator = await creatorService.changeCreatorAuth(token, input) as ICreator;

                return `Creator auth for creator with id: ${ creator.id } successfully changed`;
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to change creator auth.');
            }
        }
    }
};

export default creatorMutationResolver;
