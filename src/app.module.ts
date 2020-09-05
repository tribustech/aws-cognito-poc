import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AwsAuthModule } from './aws-auth/aws-auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  	imports: [
	  AwsAuthModule,
	  ConfigModule.forRoot({
		isGlobal: true,
	  }),
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
