import { Injectable, Inject } from '@nestjs/common';
import { AuthConfig } from './aws-auth.config';
import {
	AuthenticationDetails,
	CognitoUser,
	CognitoUserPool,
	CognitoUserAttribute,
} from 'amazon-cognito-identity-js';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthRegisterDto } from './dto/register.dto';

@Injectable()
export class AwsAuthService {
	private userPool: CognitoUserPool;

	constructor(@Inject('AuthConfig') private readonly authConfig: AuthConfig) {
		console.log('this.authConfig', this.authConfig);
		this.userPool = new CognitoUserPool({
			UserPoolId: this.authConfig.userPoolId,
			ClientId: this.authConfig.clientId,
		});
	}

	public authenticateUser(user: AuthCredentialsDto) {
		const { name, password } = user;

		const authenticationDetails = new AuthenticationDetails({
			Username: name,
			Password: password,
		});

		const userData = {
			Username: name,
			Pool: this.userPool,
		};

		const newUser = new CognitoUser(userData);

		return new Promise((resolve, reject) => {
			return newUser.authenticateUser(authenticationDetails, {
				onSuccess: result => {
					resolve(result);
				},
				onFailure: err => {
					reject(err);
				},
			});
		});
	}

	async register(authRegisterRequest: AuthRegisterDto) {
		const { name, email, password } = authRegisterRequest;
		return new Promise(((resolve, reject) => {
			return this.userPool.signUp(name, password, [new CognitoUserAttribute({ Name: 'email', Value: email })], null, (err, result) => {
				if (!result) {
					reject(err);
				} else {
					resolve(result.user);
				}
			});
		}));
	}
}
