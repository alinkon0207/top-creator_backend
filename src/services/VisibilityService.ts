import VisibilityModel from '../models/VisibilityModel';
import { validateCreateVisibility, validateUpdateVisibility } from '../validation/visibilityValidation';
import { checkCreatorOwner } from '../utils/checkCreatorOwner';

import { VisibilityInput } from '../generated/graphql';

class VisibilityService {
    private model: typeof VisibilityModel = VisibilityModel;

    async getCreatorVisibility(token: string, creatorId: string) {
        await checkCreatorOwner(token, creatorId);

        return this.model.findOne({ creatorId });
    }

    async getCreatorVisibilityForExtension(creatorId: string) {

        return this.model.findOne({ creatorId });
    }

    async createVisibility(data: VisibilityInput) {
        await validateCreateVisibility(data);

        return this.model.create(data);
    }

    async changeVisibility(token: string, input: VisibilityInput) {
        await validateUpdateVisibility(input);

        if (!input.creatorId) {
            throw new Error('Creator id is required.');
        }

        await checkCreatorOwner(token, input.creatorId?.toString());

        return this.model.findOneAndUpdate({
            _id: input.id
        }, {
            ...input
        }, {
            new: true
        });
    }
}

export default new VisibilityService;
