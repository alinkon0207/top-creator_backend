import { authService } from '../services/AuthService';
import creatorService from '../services/CreatorService';
import ICreator from '../types/ICreator';

export const checkCreatorOwner = async (token: string, creatorId: string) => {

    const data = await authService.getDataFromToken(token);

    if (!data) {
        throw new Error('User not found');
    }

    const creator = await creatorService.getCreatorById(creatorId) as ICreator;

    if (creator.userId.toString() !== data.id) {
        throw new Error('You are not owner of this creator');
    }
};

export const checkCreatorOwnerByExtension = async (token: string,user_id: string) => {

    const data = await authService.getDataFromExtensionToken(token);

    if (!data) {
        throw new Error('User not found');
    }

    const creator = await creatorService.getCreatorByAuthUser_Id(user_id) as ICreator;

    if (creator.userId.toString() !== data.id) {
        throw new Error('You are not owner of this creator');
    }

    return creator;
};
