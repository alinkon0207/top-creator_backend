import UserModel from '../models/UserModel';
import { authService } from './AuthService';
import creatorService from './CreatorService';
import proxyService from './ProxyService';
import { UserExistsError, UserNotFoundError } from '../errors/userErrors';
import { comparePasswordHash, createPasswordHash } from '../utils/passwordUtils';
import { toUserDTO } from '../utils/toUserDTO';
import { isEmail } from '../utils/isEmail';
import {emailValidate, validateLogin, validateRegister} from '../validation/userValidation';
import { sendPasswordCodeEmail} from '../utils/sendGridUtils';
import { UserCreationData } from '../types/userTypes';
import { generateRandomCode } from '../utils/generateRandomCode';
import IUser from '../types/IUser';
import { ChangePasswordInput, LoginInput } from '../generated/graphql';

class UserService {
    private model: typeof UserModel = UserModel;

    async getUserByToken(token: string) {
        const data = authService.getDataFromToken(token);

        if (!data) {
            throw new Error('Failed to extract data from token.');
        }

        const user = await this.model.findById(data.id) as IUser;

        if (!user) {
            throw new Error('User not found');
        }

        return toUserDTO(user);
    }

    async getUserByExtensionToken(token: string) {
        const data = authService.getDataFromExtensionToken(token);

        if (!data) {
            throw new Error('Failed to extract data from token.');
        }

        const user = await this.model.findById(data.id) as IUser;

        if (!user) {
            throw new Error('User not found');
        }

        return toUserDTO(user);
    }

    async getUserByTokenWithCreators(token: string) {
        const user = await this.getUserByToken(token);
        const creators = await proxyService.getUserCreatorsProxy(user.id);
        const newToken = authService.generateToken(user.id, user.fullName || '');

        return {
            user,
            creators,
            newToken
        };
    }

    async createUser(data: UserCreationData) {
        await validateRegister(data);

        const existingUser = await this.findUserByEmail(data.email);
        if (existingUser) {
            throw UserExistsError(data.email);
        }

        if (!data.password) {
            throw Error('Password is required');
        }

        const passwordHash = await createPasswordHash(data.password);
        delete data.password;

        const user = await this.model.create({ ...data, passwordHash });
        const token = authService.generateToken(user.id, user.fullName);

        const dto = toUserDTO(user);

        return { user: dto, token };
    }

    async authenticate(data: LoginInput) {
        await validateLogin(data);

        const user = await this.findUserByLogin(data.login) as IUser;

        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await comparePasswordHash(data.password, user.passwordHash);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        const token = authService.generateToken(user.id, user.fullName);

        const dto = toUserDTO(user);

        const creators = await creatorService.getCreatorsByUserId(user.id);

        return {
            user: dto,
            token,
            creators
        };
    }

    async authenticateByExtension(email: string, password: string) {
        await emailValidate(email);

        const user = await this.findUserByEmail(email) as IUser;

        if (!user) {
            throw new Error('User not found');
        }

        const isPasswordValid = await comparePasswordHash(password, user.passwordHash);
        if (!isPasswordValid) {
            throw new Error('Invalid password');
        }

        return toUserDTO(user);
    }

    async sendPasswordResetCode(login: string) {
        const user = await this.findUserByLogin(login);

        if (!user) {
            throw new Error('User not found');
        }

        const resetCode = generateRandomCode(5);
        const expirationTime = new Date(Date.now() + 60 * 60 * 1000).toString();

        if (!user.resetPassword) {
            user.resetPassword = {};
        }

        user.resetPassword.resetCode = resetCode;
        user.resetPassword.expire = expirationTime;

        await user.save();

        return await sendPasswordCodeEmail(resetCode, user.email);
    }

    async changePassword(data: ChangePasswordInput) {
        const { login, newPassword, resetCode } = data;

        const user = await this.findUserByLogin(login);

        if (!user) {
            throw UserNotFoundError(login);
        }

        if (user.resetPassword?.resetCode !== resetCode) {
            throw new Error('Invalid reset code.');
        }

        if (!user.resetPassword?.expire) {
            throw new Error('Reset code expiry information is missing or invalid.');
        }

        const expirationDate = new Date(user.resetPassword.expire);

        if (isNaN(expirationDate.getTime())) {
            throw new Error('Invalid expiration date.');
        }

        if (new Date() > expirationDate) {
            throw new Error('Reset code has expired.');
        }

        user.passwordHash = await createPasswordHash(newPassword);
        await user.save();

        return 'Password successfully changed.';
    }

    getAppURL(): string {

        return process.env.NODE_ENV === 'production'
            ? process.env.FRONTEND_URL || 'defaultProductionURL'
            : process.env.LOCALHOST_URL || 'defaultTestURL';
    }

    async findUserByEmail(email: string): Promise<IUser | null> {

        return this.findByField({email});
    }

    private async findByField(field: Partial<UserCreationData>): Promise<IUser | null> {

        return this.model.findOne(field) as Promise<IUser | null>;
    }

    private async findUserByLogin(login: string) {
        if (await isEmail(login)) {

            return await this.findUserByEmail(login);
        } else {

            return await this.findUserByFullName(login);
        }
    }

    private async findUserByFullName(fullName: string): Promise<IUser | null> {

        return this.model.findOne({ fullName }) as Promise<IUser | null>;
    }
}
export default new UserService();
