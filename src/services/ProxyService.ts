import mongoose from 'mongoose';
import ProxyModel from '../models/ProxyModel';
import CreatorModel from '../models/CreatorModel';
import userService from './UserService';
import creatorService from './CreatorService';
import { adminRoleCheck } from '../utils/adminRoleCheck';
import { validateAddAutoProxy, validateChooseHttpProxy } from '../validation/proxyValidation';
import { ProxyType } from '../constants/proxyType';
import ICreator from '../types/ICreator';
import IProxy from '../types/IProxy';
import {
    AddAutoProxyInput,
    ChooseAutoProxyInput,
    ChooseHttpProxyInput,
    UserDto
} from '../generated/graphql';
import ScraperService from './ScraperService';

class ProxyService {
    private model: typeof ProxyModel = ProxyModel;

    async chooseNONEProxy(token: string, creatorId: string) {
        try {
            await this.validateUserAndCreator(token, creatorId);

            const existingProxy = await this.model.findOne({ creatorId }) as IProxy;

            if (existingProxy) {
              await this.handleProxyBasedOnType(creatorId, existingProxy);
            }

            return await this.model.create({
                creatorId,
                proxyType: ProxyType.NONE,
            });
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to create NONEproxy.');
        }
    }

    async chooseNONEProxyDefault(creatorId: string) {
        try {

            return await this.model.create({
                creatorId,
                proxyType: ProxyType.NONE,
            });
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to create NONEproxy by default.');
        }
    }

    async chooseHTTPProxy(token: string, data: ChooseHttpProxyInput) {
        try {
            await validateChooseHttpProxy(data);

            const { creatorId } = data;

            if (!creatorId) {
                throw new Error('CreatorId is required.');
            }

            await this.validateUserAndCreator(token, creatorId);

            const existingProxy = await this.model.findOne({ creatorId }) as IProxy;
            await this.handleProxyBasedOnType(creatorId, existingProxy);

            return await this.model.create({
                ...data,
                proxyType: ProxyType.HTTP,
            });
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to create HTTPProxy.');
        }
    }

    async chooseAUTOProxy(token: string, input: ChooseAutoProxyInput) {
        try {
            const user = await userService.getUserByToken(token);
            const { creatorId, country } = input;

            if (!creatorId || !country) {
                throw new Error('Country and CreatorId are required.');
            }

            const creator = await creatorService.getCreatorById(creatorId) as ICreator;

            if (creator.userId.toString() !== user.id) {
                throw new Error('You are not the creator of this creator.');
            }

            await this.model.deleteMany({
                creatorId,
                proxyType: { $in: ['HTTP', 'NONE'] }
            });

            const proxy = await this.model.findOne({ country }) as IProxy;

            if (!proxy) {
                throw new Error('No proxy found for this country.');
            }

            proxy.creatorId = new mongoose.Types.ObjectId(creatorId);
            await proxy.save();

            return proxy;
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to create AUTOProxy.');
        }
    }

    async addAUTOProxy(token: string, data: AddAutoProxyInput) {
        try {
            await validateAddAutoProxy(data);
            await adminRoleCheck(token);

            return await this.model.create({
                ...data,
                proxyType: ProxyType.AUTO,
                creatorId: null,
            });
        } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to create AUTOProxy.');
        }
    }

    async deleteAUTOProxy(token: string, proxyId: string) {
        try {
            await adminRoleCheck(token);

            await this.model.deleteOne({ _id: proxyId });
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to delete proxy.');
        }
    }

    async getUserCreatorsProxyWithPublicData(token: string) {
        try {
            const user = await userService.getUserByToken(token) as UserDto;

            const creators = await CreatorModel.find({ userId: user.id }) as ICreator[];

            return await Promise.all(creators.map(async (creator) => {
                const proxy = await ProxyModel.findOne({creatorId: creator._id});
                const userId = creator.link.replace('https://onlyfans.com/', '');
                const authInfo = await ScraperService.getPublicData(userId) as any;
                return {
                    id: creator._id,
                    ...creator.toObject(),
                    proxy,
                    photoUrl: authInfo.photoUrl,
                    name: authInfo.name
                };
            }));

        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to fetch user by token.');
        }
    }

    async getUserCreatorsProxy(userId: string) {
        try {
            const creators = await CreatorModel.find({ userId }) as ICreator[];

            return await Promise.all(creators.map(async (creator) => {
                const proxy = await ProxyModel.findOne({creatorId: creator._id});
                return {
                    id: creator._id,
                    ...creator.toObject(),
                    proxy,
                };
            }));

        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to fetch user by token.');
        }
    }

    async getAvailableCountries() {
        try {
            const proxies = await ProxyModel.find({
                proxyType: 'AUTO',
                $or: [{ creatorId: { $exists: false } }, { creatorId: null }]
            }) as IProxy[];

            const countryMap = proxies.reduce<{ [key: string]: number }>((acc, proxy) => {
                if (!proxy.country) return acc;
                acc[proxy.country] = (acc[proxy.country] || 0) + 1;
                return acc;
            }, {});

            return Object.entries(countryMap).map(([country, count]) => ({ country, count }));
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to fetch available countries.');
        }
    }

    private async validateUserAndCreator(userToken: string, creatorId: string) {
        const user = await userService.getUserByToken(userToken);
        const creator = await creatorService.getCreatorById(creatorId) as ICreator;

        if (creator.userId.toString() !== user.id) {
            throw new Error('You are not the creator of this creator.');
        }
    }

    private async handleProxyBasedOnType(creatorId: string, existingProxy: IProxy) {
        if (
            existingProxy.proxyType.toString() === ProxyType.HTTP
            || existingProxy.proxyType.toString() === ProxyType.NONE
        ) {
            await this.model.deleteOne({ creatorId });
        }
        if (existingProxy.proxyType.toString() === ProxyType.AUTO) {
            await this.model.findByIdAndUpdate(existingProxy._id, { $unset: { creatorId: null } });
        }
    }
}
export default new ProxyService;
