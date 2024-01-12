import { authService } from '../../services/AuthService';
import proxyService from '../../services/ProxyService';
import {
    AddAutoProxyInput,
    ChooseAutoProxyInput,
    ChooseHttpProxyInput
} from '../../generated/graphql';

const proxyMutationResolver = {
    Mutation: {
        async chooseNONEProxy(_: never, { creatorId }: { creatorId: string }, context: any) {
            const token = authService.checkToken(context.token);

            try {
                const proxy = await proxyService.chooseNONEProxy(token, creatorId);

                return {
                    message: `Proxy for creator with id: ${creatorId} successfully created`,
                    proxy,
                };
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to change proxy.');
            }
        },

        async chooseHTTPProxy(_: never, { input }: { input: ChooseHttpProxyInput }, context: any) {
            const token = authService.checkToken(context.token);

            try {
                const proxy = await proxyService.chooseHTTPProxy(token, input);

                return {
                    message: `Proxy for creator with id: ${proxy.creatorId} successfully created`,
                    proxy,
                };
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to change proxy.');
            }
        },

        async chooseAUTOProxy(_: never, { input }: { input: ChooseAutoProxyInput }, context: any) {
            const token = authService.checkToken(context.token);

            try {
                const proxy = await proxyService.chooseAUTOProxy(token, input);

                return {
                    message: `Proxy for creator with id: ${input.creatorId} successfully added`,
                    proxy,
                };
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to change proxy.');
            }
        },

        async addAUTOProxy(_: never, { input }: { input: AddAutoProxyInput }, context: any) {
            const token = authService.checkToken(context.token);

            try {
                const proxy = await proxyService.addAUTOProxy(token, input);

                return {
                    message: `Proxy for creator with id: ${proxy.creatorId} successfully created`,
                    proxy,
                };
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to change proxy.');
            }

        },

        async deleteAUTOProxy(_: never, { proxyId }: { proxyId: string }, context: any) {
            const token = authService.checkToken(context.token);

            try {
                await proxyService.deleteAUTOProxy(token, proxyId);

                return `Proxy with id: ${proxyId} successfully deleted`;
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to delete proxy.');
            }
        }
    }
};

export default proxyMutationResolver;
