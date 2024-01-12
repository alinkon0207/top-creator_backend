import userService from './UserService';
import { ChangeDisplayColorInput, CreateDisplayColorInput} from '../generated/graphql';
import { checkCreatorOwner } from '../utils/checkCreatorOwner';
import IDisplayColors from '../types/IDisplayColors';
import DisplayColorsModel from '../models/DisplayColors';
import DisplaySettingsModel from '../models/DisplaySettingsModel';
import DisplaySettingsService from './DisplaySettingsService';
import IDisplaySettings from '../types/IDisplaySettings';

class DisplayColorsService {
    private model: typeof DisplayColorsModel = DisplayColorsModel;

    async getOneDisplayColor(token: string, displayColorId: string) {
        try {
            const displayColor = await this.model.findById(displayColorId) as IDisplayColors;
            await this.ownerCreatorCheck(token, displayColor.displaySettings.toString());

            return displayColor;
        } catch (error) {
            console.error('Error:', error);
            throw Error        
        }
    }

    async getAllDisplayColors(token: string, creatorId: string) {
        try {
            await checkCreatorOwner(token, creatorId);

            const displaySettings = await DisplaySettingsModel.findOne({creatorId}) as IDisplaySettings
            if (!displaySettings) throw new Error("DisplaySettings Is undefined")
            
            return await this.model.find({displaySettings: displaySettings._id });
        } catch (error) {
            console.error('Error:', error);
            throw Error        
        }
    }


    async createDisplayColor(token: string, input: CreateDisplayColorInput) {
        try {
            const displaySettings = await DisplaySettingsService.getDSById(input.displaySettings);
            await this.ownerCreatorCheck(token, displaySettings._id.toString());

            return await this.model.create({
                ...input,
            });
        } catch (error) {
            console.error('Error:', error);
            throw Error        
        }
    }

    async changeDisplayColor(token: string, input: ChangeDisplayColorInput) {
        try {
            const displayColor = await this.model.findById(input.id) as IDisplayColors;
            await this.ownerCreatorCheck(token, displayColor.displaySettings._id.toString());

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

    async deleteDisplayColor(token: string, displaySettingsId: string) {
        try {
            const displayColor = await this.model.findById(displaySettingsId) as IDisplayColors;
            await this.ownerCreatorCheck(token, displayColor.displaySettings.toString());

            return await this.model.findByIdAndDelete(displaySettingsId);
        } catch (error) {
            console.error('Error:', error);
            throw Error
        }
    }

    private async ownerCreatorCheck(token: string, displaySettingsId: string) {
        const user = await userService.getUserByToken(token);
        const displaySettings = await DisplaySettingsService.getDSById(displaySettingsId);

        if (user.id !== displaySettings.createdBy.toString()) {
            throw new Error('You are not the owner of this display settings.');
        }
    }
}

export default new DisplayColorsService;
