import { httpClient } from '../../../lib/axios';
import { userStorage } from '../storage';
import { generateJWT } from '../../../shared/utilities/jwt';

class AuthServices {
    #endPoint = '/users'

    async getUserByEmail(email) {
        const response = await httpClient.get(`${this.#endPoint}?email=${email}`);
        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
            return response.data[0];
        }
        return null;
    }

    async signUp(payload) {
        try {
            const userResponse = await this.getUserByEmail(payload.email);
            if (userResponse) {
                return userResponse;
            }
            const token = await generateJWT(
                { email: payload.email, role: "admin" },
            );
            const response = await httpClient.post(this.#endPoint, { ...payload, token });
            return response.data;
        } catch (e) {
            throw new Error(e);
        }
    }

    async login(payload) {
        try {
            const userResponse = await this.getUserByEmail(payload.email);
            if (!userResponse) {
                throw new Error('User not found');
            }
            if (userResponse.password !== payload.password) {
                throw new Error('Invalid password or email');
            }
            return userResponse;
        } catch (e) {
            throw new Error(e);
        }
    }

    async getMe() {
        const token = userStorage.get()
        const response = await httpClient.get(`${this.#endPoint}?token=${token}`);

        if (response.data && Array.isArray(response.data) && response.data.length > 0) {
            return response.data[0];
        }

        return null;
    }
}

export default new AuthServices;