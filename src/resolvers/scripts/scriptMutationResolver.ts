import { authService } from '../../services/AuthService';
import scriptService from '../../services/ScriptService';
import { CreateScriptInput, UpdateScriptInput } from '../../generated/graphql';

const scriptMutationResolver = {
    Mutation: {
        async createScript(_: never, { input }: { input: CreateScriptInput }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                const script = await scriptService.createScript(token, input);

                return {
                    message: `Script with name: ${ input.name } successfully created`,
                    script
                };
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to create script.');
            }
        },

        async changeScript(_: never, { input }: { input: UpdateScriptInput }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                const script = await scriptService.changeScript(token, input);

                return {
                    message: `Script with id: ${ input.id } successfully changed`,
                    script
                };
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to change script.');
            }
        },

        async deleteScript(_: never, { id }: { id: string }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                await scriptService.deleteScript(token, id);

                return `Script with id: ${ id } successfully deleted`;
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to delete script.');
            }
        }
    }
};

export default scriptMutationResolver;
