import { Module } from '@nestjs/common';
import { AuthConfig } from './aws-auth.config';
import { AwsAuthService } from './aws-auth.service';
import { AwsAuthController } from './aws-auth.controller';

@Module({
	providers: [AuthConfig, AwsAuthService],
	controllers: [AwsAuthController]
})
export class AwsAuthModule {}
