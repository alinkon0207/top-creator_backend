import { authService } from '../../services/AuthService';
import proxyService from '../../services/ProxyService';

const proxyQueryResolver = {
    Query: {
        async getUserCreatorsProxy(_: never, __: unknown, context: any) {
            try {
                const token = authService.checkToken(context.token);

                return await proxyService.getUserCreatorsProxyWithPublicData(token);
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to fetch user by token.');
            }
        },

        async getAvailableCountries() {
            try {

                return await proxyService.getAvailableCountries();
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to fetch user by token.');
            }
        }
    }
};

export default proxyQueryResolver;
