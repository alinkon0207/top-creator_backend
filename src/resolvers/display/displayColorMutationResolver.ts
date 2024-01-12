import { authService } from '../../services/AuthService';
import {ChangeDisplayColorInput, CreateDisplayColorInput} from '../../generated/graphql';
import IDisplayColors from '../../types/IDisplayColors';
import DisplayColorsService from '../../services/DisplayColorsService';

const displayColorMutationResolver = {
    Mutation: {
        async createDisplayColor(_: never, { input }: { input: CreateDisplayColorInput }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                const displayColor = await DisplayColorsService.createDisplayColor(token, input) as IDisplayColors;

                return {
                    message: `Display color with id: ${displayColor.id} was created`,
                    displayColor
                };
            } catch (error) {
                console.error('Error:', error);
                throw error;
            }
        },

        async changeDisplayColor(_: never, { input }: { input: ChangeDisplayColorInput }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                const displayColor = await DisplayColorsService.changeDisplayColor(token, input) as IDisplayColors;

                return {
                    message: `Display color with id: ${displayColor.id} was updated`,
                    displayColor
                };
            } catch (error) {
                console.error('Error:', error);
                throw error;
            }
        },

        async deleteDisplayColor(_: never, { displayColorId }: { displayColorId: string }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                await DisplayColorsService.deleteDisplayColor(token, displayColorId);

                return `Display color with id: ${displayColorId} was deleted`;
            } catch (error) {
                console.error('Error:', error);
                throw error;
            }
        }
    }
}
;

export default displayColorMutationResolver;
