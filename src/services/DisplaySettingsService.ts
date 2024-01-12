import DisplaySettingsModel from '../models/DisplaySettingsModel';
import userService from './UserService';
import creatorService from './CreatorService';
import { validateChangeDisplaySettings } from '../validation/displaySettingsValidation';
import { ChangeDisplaySettingsInput } from '../generated/graphql';
import IDisplaySettings from '../types/IDisplaySettings';
import IUser from '../types/IUser';
import ICreator from '../types/ICreator';

class DisplaySettingsService {
    private model: typeof DisplaySettingsModel = DisplaySettingsModel;

    async getDSById(displaySettingsId: string) {
        try {
            return await this.model.findById(displaySettingsId) as IDisplaySettings;
        } catch (error) {
            console.error('Error:', error);
            throw Error
        }
    }

    async getDSByCreatorId(token: string, creatorId: string) {
        try {
            const displaySettings = await this.model.findOne({ creatorId: creatorId }) as IDisplaySettings;
            if (!displaySettings) throw new Error("Display settings is undefined")

            await this.ownerCreatorCheck(token, displaySettings._id.toString());

            return displaySettings;
        } catch (error) {
            console.error('Error:', error);
            throw error        
        }
    }

    async createDisplaySettings(creatorId: string, createdBy: string) {
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

    async changeDisplaySettings(token: string, input: ChangeDisplaySettingsInput) {
        try {
            await this.ownerCreatorCheck(token, input.id);
            await validateChangeDisplaySettings(input)

            return await this.model.findOneAndUpdate({
                    _id: input.id
                },
                {
                    ...input
                },
                {
                    new: true
                });
        } catch (error) {
            console.error('Error:', error);
            throw Error        
        }
    }

    private async ownerCreatorCheck(token: string, displaySettingsId: string) {
        const user = await userService.getUserByToken(token) as IUser;
        const displaySettings = await this.model.findById(displaySettingsId) as IDisplaySettings;
        const creator = await creatorService.getCreatorById(displaySettings.creatorId.toString()) as ICreator;

        if(user.id.toString() !== creator.userId.toString()) {
            throw new Error('You are not the owner of this creator');
        }
    }
}

export default new DisplaySettingsService;
