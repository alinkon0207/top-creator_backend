import * as yup from 'yup';
import { AddPreferencesInput, ChangeLicenseInput } from '../generated/graphql';
import { LicenseType } from '../constants/licenseType';

const addCreatorSchema = yup.object({
    link: yup.string().required('Link is required')
});

const changeLicenseSchema = yup.object({
    creatorId: yup.string().required('Creator ID is required'),
    license: yup.string().oneOf(Object.values(LicenseType), 'Invalid license type').required('License is required')
});

const addPreferencesSchema = yup.object({
    user_id: yup.string().required('User ID is required'),
    chatterId: yup.string().required('Chatter ID is required'),
    preferencesText: yup.array().of(yup.string()).required('Preferences text is required')
});

export async function validateAddCreator(link: string) {
    const input = { link };
    await addCreatorSchema.validate(input, { abortEarly: false });
}

export async function validateChangeLicense(input: ChangeLicenseInput) {
    await changeLicenseSchema.validate(input, { abortEarly: false });
}

export async function validateAddPreferences(input: AddPreferencesInput) {
    await addPreferencesSchema.validate(input, { abortEarly: false });
}
