import { OAuth2Client } from "../client.js";

import type { OAuth2Tokens } from "../oauth2.js";

const authorizationEndpoint = "https://www.epicgames.com/id/authorize";
const tokenEndpoint = "https://api.epicgames.dev/epic/oauth/v2/token";
const tokenRevocationEndpoint = "https://api.epicgames.dev/epic/oauth/v2/revoke";

export class EpicGames {
	private client: OAuth2Client;

	constructor(clientId: string, clientSecret: string, redirectURI: string) {
		this.client = new OAuth2Client(clientId, clientSecret, redirectURI);
	}

	public createAuthorizationURL(state: string, scopes: string[]): URL {
		const url = this.client.createAuthorizationURL(authorizationEndpoint, state, scopes);
		return url;
	}

	public async validateAuthorizationCode(code: string): Promise<OAuth2Tokens> {
		const tokens = await this.client.validateAuthorizationCode(tokenEndpoint, code, null);
		return tokens;
	}

	public async refreshAccessToken(refreshToken: string): Promise<OAuth2Tokens> {
		const tokens = await this.client.refreshAccessToken(tokenEndpoint, refreshToken, null);
		return tokens;
	}

	public async revokeToken(token: string): Promise<void> {
		await this.client.revokeToken(tokenRevocationEndpoint, token);
	}
}
