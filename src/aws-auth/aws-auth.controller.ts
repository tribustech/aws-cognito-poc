import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AwsAuthService } from './aws-auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthRegisterDto } from './dto/register.dto';

@Controller('aws-auth')
export class AwsAuthController {
	constructor(private readonly awsAuthService: AwsAuthService) { }

	@Post('login')
	async login(@Body() authenticateRequest: AuthCredentialsDto) {
		try {
			return await this.awsAuthService.authenticateUser(authenticateRequest);
		} catch (e) {
			throw new BadRequestException(e.message);
		}
	}

	@Post('register')
	async register(@Body() AuthRegisterDto: AuthRegisterDto) {
		if (
			AuthRegisterDto.password.length < 8 ||
			!/[a-z]/.test(AuthRegisterDto.password) ||
			!/[A-Z]/.test(AuthRegisterDto.password) ||
			!/[0-9]/.test(AuthRegisterDto.password)
		) {
			throw new BadRequestException('Password requirements not met.');
		}
		try {
			return await this.awsAuthService.register(AuthRegisterDto);
		} catch (e) {
			throw new BadRequestException(e.message);
		}
	}
}
