import CreatorModel from '../models/CreatorModel';
import userService from './UserService';
import scraperService from './ScraperService';
import visibilityService from './VisibilityService';
import welcomeSettingsService from './WelcomeSettingsService';
import { ppvFollowService } from './pPVFollowService';
import proxyService from './ProxyService';
import { validateChangeLicense } from '../validation/creatorValidation';
import { adminRoleCheck, adminRoleCheckFromExtension } from '../utils/adminRoleCheck';
import ICreator from '../types/ICreator';
import { ChangeCreatorAuthInput, ChangeLicenseInput, CreatorForAddCreatorResponse } from '../generated/graphql';
import IProxy from '../types/IProxy';
import PromotionReactivatorService from './PromotionReactivatorService';
import FanNumberingService from './FanNumberingService';
import AutoFollowService from './AutoFollowService';
import ExpiringFansService from './ExpiringFansService';
import DisplaySettingsService from './DisplaySettingsService';

class CreatorService {
    private model: typeof CreatorModel = CreatorModel;

    async getCreatorById(creatorId: string) {
        try {

            return await this.model.findById(creatorId);
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to get creator.');
        }
    }

    async getCreatorsByIds(creatorIds: string[]) {
        try {
            return await this.model.find({ _id: { $in: creatorIds } }) as ICreator[];

        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to get creators.');
        }
    }

    async getCreatorsByUserId (userId: string) {
        try {

            return await this.model.find({ userId }) as ICreator[];
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to get creators.');
        }
    }

    async getCreatorByAuthUser_Id (user_id: string) {
        try {

            return await this.model.findOne({ 'creatorAuth.user_id': user_id });
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to get creator.');
        }
    }

    async getCreatorAuth (token: string, user_id: string) {
        try {
            await adminRoleCheck(token);
            const creator = await this.getCreatorByAuthUser_Id(user_id) as ICreator;
            await this.validateCreatorAction(token, creator.id);

            return creator.creatorAuth;
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to get creator.');
        }
    }

    async addCreator(token: string, link: string): Promise<CreatorForAddCreatorResponse>  {
        try {

            const user = await userService.getUserByToken(token);

            const linkExists = await this.model.findOne({
                userId: user.id,
                link
            });

            if (linkExists) {
                throw new Error('This user already has a creator with the provided link.');
            }
            const userId = link.replace('https://onlyfans.com/', '');
            const scraperResult = await scraperService.getPublicData(userId) as any;

            if (!scraperResult) {
                throw new Error('Creator not found by link.');
            }

            const creator = await this.model.create({
                link,
                userId: user.id,
                userName: scraperResult.userName,
                avatarURL: scraperResult.avatarURL,
                joinDate: scraperResult.joinDate,
                creatorAuth: {
                    user_id: scraperResult.user_id
                }
            });

            await Promise.all([
                visibilityService.createVisibility({ creatorId: creator.id }),
                welcomeSettingsService.createWelcomeSettings(creator.id, user.id),
                ppvFollowService.createPPVFollow(token, { creatorId: creator.id }),
                PromotionReactivatorService.createPromotionReactivator(creator.id, user.id),
                FanNumberingService.createFanNumbering(creator.id, user.id),
                AutoFollowService.createAutoFollow(creator.id, user.id),
                ExpiringFansService.createExpiringFans(creator.id, user.id),
                DisplaySettingsService.createDisplaySettings(creator.id, user.id)
            ]);

            const proxy = await proxyService.chooseNONEProxyDefault(creator.id) as IProxy;

            return {
                id: creator.id,
                link: creator.link,
                userId: creator.userId.toString(),
                license: creator.license,
                userName: creator.userName,
                avatarURL: creator.avatarURL,
                joinDate: creator.joinDate,
                creatorAuth: creator.creatorAuth,
                proxy: {
                    id: proxy.id,
                    proxyType: proxy.proxyType as any,
                    host: proxy.host,
                    port: proxy.port,
                    userName: proxy.userName,
                    password: proxy.password,
                    country: proxy.country
                }
            };
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async changeLicense(token: string, input: ChangeLicenseInput) {
        try {
            await validateChangeLicense(input);

            const creator = await this.validateCreatorAction(token, input.creatorId);
            creator.license = input.license;

            return await creator.save();
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to change license.');
        }
    }

    async deleteCreator(token: string, creatorId: string) {
        try {
            await this.validateCreatorAction(token, creatorId);

            await this.model.findByIdAndDelete(creatorId);
            //TODO delete all connected objects like ppvFollow, visibility etc
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    }

    async changeCreatorAuth(token: string, input: ChangeCreatorAuthInput) {
        await adminRoleCheck(token);

        return await this.updateCreatorAuthWithoutCheck(input);
    }

    async changeCreatorAuthByExtension(token: string, input: ChangeCreatorAuthInput) {
        await adminRoleCheckFromExtension(token);

        return await this.updateCreatorAuthWithoutCheck(input);
    }

    async updateCreatorAuthWithoutCheck(input: ChangeCreatorAuthInput) {
        try {
            const creator = await this.getCreatorByAuthUser_Id(input.user_id) as ICreator;

            if(!creator.creatorAuth) {
                creator.creatorAuth = {
                    user_agent: '',
                    x_bc: '',
                    user_id: '',
                    cookie: '',
                    expiredAt: new Date(),
                };
            }

            creator.creatorAuth = {
                ...input,
            };

            await creator.save();

            return creator;
        } catch (error) {
            console.error('Error:', error);
            throw new Error('Failed to change creator auth.');
        }
    }

    private async validateCreatorAction(token: string, creatorId: string) {
        const user = await userService.getUserByToken(token);

        if (!user) {
            throw new Error('User not found');
        }

        const creator = await this.getCreatorById(creatorId) as ICreator;

        if (user.id !== creator.userId.toString()) {
            throw new Error('You are not allowed to perform this action on this creator');
        }

        return creator;
    }
}

export default new CreatorService;
