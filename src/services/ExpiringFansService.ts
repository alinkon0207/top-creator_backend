import ExpiringFansModel from '../models/ExpiringFansModel';
import userService from './UserService';
import creatorService from './CreatorService';
import { validateChangeExpiringFansValidation } from '../validation/expiringFansValidation';
import { ChangeExpiringFansInput } from '../generated/graphql';
import IExpiringFans from '../types/IExpiringFans';
import ICreator from '../types/ICreator';
import IUser from '../types/IUser';

class ExpiringFansService {
    private model: typeof ExpiringFansModel = ExpiringFansModel;

    async getEFById(expiringFansId: string) {
        try {

            return await this.model.findById(expiringFansId) as IExpiringFans;
        } catch (error) {
            console.error('Error:', error);
            throw Error        
        }
    }

    async getEFByCreatorId(token: string, creatorId: string) {
        try {
            const welcomeSettings = await this.model.findOne({ creatorId: creatorId }) as IExpiringFans;

            await this.ownerCreatorCheck(token, welcomeSettings._id.toString());

            return welcomeSettings;
        } catch (error) {
            console.error('Error:', error);
            throw Error        
        }
    }

    async createExpiringFans(creatorId: string, createdBy: string) {
        try {

            return await this.model.create({
                creatorId,
                createdBy
            });
        } catch (error) {
            console.error('Error:', error);
            throw Error        
        }
    }

    async changeExpiringFans(token: string, input: ChangeExpiringFansInput) {
        try {
            await this.ownerCreatorCheck(token, input.id);
            await validateChangeExpiringFansValidation(input)

            return await this.model.findOneAndUpdate({
                    _id: input.id
                },
                {
                    ...input
                },
                {
                    new: true
                });
        } catch (error: any) {
            console.error('Error:', error);
            throw Error        
        }
    }


    private async ownerCreatorCheck(token: string, welcomeSettingsId: string) {
        const user = await userService.getUserByToken(token) as IUser;
        const welcomeSettings = await this.model.findById(welcomeSettingsId) as IExpiringFans;
        const creator = await creatorService.getCreatorById(welcomeSettings.creatorId.toString()) as ICreator;

        if(user.id.toString() !== creator.userId.toString()) {
            throw new Error('You are not the owner of this creator');
        }
    }
}

export default new ExpiringFansService;
