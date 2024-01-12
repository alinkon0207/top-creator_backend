import userMutationResolver from './users/userMutationResolver';
import userQueryResolver from './users/userQueryResolver';
import creatorMutationResolver from './creators/creatorMutationResolver';
import proxyMutationResolver from './proxy/proxyMutationResolver';
import proxyQueryResolver from './proxy/proxyQueryResolver';
import scriptFolderMutationResolver from './scripts/scriptFolderMutationResolver';
import scriptFolderQueryResolver from './scripts/scriptFolderQueryResolver';
import scriptMutationResolver from './scripts/scriptMutationResolver';
import scriptQueryResolver from './scripts/scriptQueryResolver';
import visibilityMutationResolver from './visibility/visibilityMutationResolver';
import visibilityQueryResolver from './visibility/visibilityQueryResolver';
import welcomeSettingsMutationResolver from './welcome/welcomeSettingsMutationResolver';
import welcomeSettingsQueryResolver from './welcome/welcomeSettingsQueryResolver';
import welcomeMessageMutationResolver from './welcome/welcomeMessageMutationResolver';
import welcomeMessageQueryResolver from './welcome/welcomeMessageQueryResolver';
import massMessagingMutationResolver from './massMessages/massMessagingMutationResolver';
import massMessagingQueryResolver from './massMessages/massMessagingQueryResolver';
import mMMMutationResolver from './massMessages/mMMMutationResolver';
import mMMQueryResolver from './massMessages/mMMQueryResolver';
import PPVFollowMutationResolver from './pPV/pPVFollowMutationResolver';
import pPVFollowQueryResolver from './pPV/pPVFollowQueryResolver';
import pPVMessageMutationResolver from './pPV/pPVMessageMutationResolver';
import pPVMessageQueryResolver from './pPV/pPVMessageQueryResolver';
import scraperQueryResolver from './scraper/scraperQueryResolver';
import creatorQueryResolver from './creators/creatorQueryResolver';
import extensionMutationResolver from './extension/extensionMutationResolver';
import extensionQueryResolver from './extension/extensionQueryResolver';
import promotionReactivatorMutationResolver from './promotionReactivator/promotionReactivatorMutationResolver';
import promotionReactivatorQueryResolver from './promotionReactivator/promotionReactivatorQueryResolver';
import fanNumberingMutationResolver from './fanNumbering/fanNumberingMutationResolver';
import fanNumberingQueryResolver from './fanNumbering/fanNumberingQueryResolver';
import autoFollowMutationResolver from './autoFollow/autoFollowMutationResolver';
import autoFollowQueryResolver from './autoFollow/autoFollowQueryResolver';
import expiringFansMutationResolver from './expiringFans/expiringFansMutationResolver';
import expiringFansQueryResolver from './expiringFans/expiringFansQueryResolver';
import expiringFansMessageMutationResolver from './expiringFans/expiringFansMessageMutationResolver';
import expiringFansMessageQueryResolver from './expiringFans/expiringFansMessageQueryResolver';
import displaySettingsMutationResolver from './display/displaySettingsMutationResolver';
import displaySettingsQueryResolver from './display/displaySettingsQueryResolver';
import displayColorMutationResolver from './display/displayColorMutationResolver';
import displayColorQueryResolver from './display/displayColorQueryResolver';

export const resolversArray = {
    Query: {
        ...userQueryResolver.Query,
        ...proxyQueryResolver.Query,
        ...scriptFolderQueryResolver.Query,
        ...scriptQueryResolver.Query,
        ...visibilityQueryResolver.Query,
        ...welcomeSettingsQueryResolver.Query,
        ...welcomeMessageQueryResolver.Query,
        ...massMessagingQueryResolver.Query,
        ...mMMQueryResolver.Query,
        ...pPVMessageQueryResolver.Query,
        ...pPVFollowQueryResolver.Query,
        ...pPVMessageQueryResolver.Query,
        ...scraperQueryResolver.Query,
        ...creatorQueryResolver.Query,
        ...extensionQueryResolver.Query,
        ...promotionReactivatorQueryResolver.Query,
        ...fanNumberingQueryResolver.Query,
        ...autoFollowQueryResolver.Query,
        ...expiringFansQueryResolver.Query,
        ...expiringFansMessageQueryResolver.Query,
        ...expiringFansMessageQueryResolver.Query,
        ...displaySettingsQueryResolver.Query,
        ...displayColorQueryResolver.Query
    },
    Mutation: {
        ...userMutationResolver.Mutation,
        ...creatorMutationResolver.Mutation,
        ...proxyMutationResolver.Mutation,
        ...scriptFolderMutationResolver.Mutation,
        ...scriptMutationResolver.Mutation,
        ...visibilityMutationResolver.Mutation,
        ...welcomeSettingsMutationResolver.Mutation,
        ...welcomeMessageMutationResolver.Mutation,
        ...massMessagingMutationResolver.Mutation,
        ...mMMMutationResolver.Mutation,
        ...PPVFollowMutationResolver.Mutation,
        ...pPVMessageMutationResolver.Mutation,
        ...extensionMutationResolver.Mutation,
        ...promotionReactivatorMutationResolver.Mutation,
        ...fanNumberingMutationResolver.Mutation,
        ...autoFollowMutationResolver.Mutation,
        ...expiringFansMutationResolver.Mutation,
        ...expiringFansMessageMutationResolver.Mutation,
        ...expiringFansMessageMutationResolver.Mutation,
        ...displaySettingsMutationResolver.Mutation,
        ...displayColorMutationResolver.Mutation
    }
};
