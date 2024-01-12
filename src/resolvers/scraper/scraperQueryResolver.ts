import scraperService from '../../services/ScraperService';
import { authService } from '../../services/AuthService';
import {GetCreatorStatisticInput, GetDatesCreatorIdInput, GetDetailedStatisticInput, GetOneChatterTrackingInput, GetOverallStatisticInput, GetPpvTrackingFolderInput, GetPpvTrackingFolderMessagesInput} from '../../generated/graphql';

const scraperQueryResolver = {
    Query: {
        async scraperAPIAvatarAndNameForCreator(_: never, { id }: { id: string}) {
            try {

                return await scraperService.getPublicData(id);
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to get scraper API Avatar And Name for Creator');
            }
        },

        async getCreatorStatistic(_: never, { input }: { input: GetCreatorStatisticInput }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                return await scraperService.getCreatorStatistic(token, input);
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to get creator statistic');
            }
        },

        async getChattersTracking(_: never, { input }: { input: GetDatesCreatorIdInput }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                return await scraperService.getChattersTracking(token, input);
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to get chatters tracking');
            }
        },

        async getOneChatterTracking(_: never, { input }: { input: GetOneChatterTrackingInput }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                return await scraperService.getOneChatterTracking(token, input);
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to get one chatter tracking');
            }
        },

        async getPPVTracking(_: never, { input }: { input: GetDatesCreatorIdInput }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                return await scraperService.getPPVTracking(token, input);
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to get ppv tracking');
            }},

        async getPPVTrackingFolder(_: never, { input }: { input: GetPpvTrackingFolderInput }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                return await scraperService.getPPVTrackingFolder(token, input);
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to get ppv tracking folder');
        }},

        async getPPVTrackingFolderMessages(_: never, { input }: { input: GetPpvTrackingFolderMessagesInput }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                return await scraperService.getPPVTrackingFolderMessages(token, input);
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to get ppv tracking folder messages');
        }},

        async getDetailedStatistic(_: never, { input }: { input: GetDetailedStatisticInput }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                return await scraperService.getDetailedStatistic(token, input);
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to get detailed statistic');
            }
        },

        async getOverallStatistic(_: never, { input }: { input: GetOverallStatisticInput }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                return await scraperService.getOverallStatistic(token, input);
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to get overall statistic');
            }
        },

        async getOverallDetailedComparison(_: never, { input }: { input: GetOverallStatisticInput }, context: any) {
            try {
                const token = authService.checkToken(context.token);

                return await scraperService.getOverallDetailedComparison(token, input);
            } catch (error) {
                console.error('Error:', error);
                throw new Error('Failed to fetch getOverallDetailedComparison.');
            }
        }
    }
};

export default scraperQueryResolver;
