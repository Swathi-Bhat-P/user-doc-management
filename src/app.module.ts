import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { DocumentsModule } from './documents/documents.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/user.entity';
import { Document } from './documents/document.entity';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '1234',
      database: 'user_docs',
      entities: [User, Document],
      synchronize: true,
    }),

    AuthModule, UsersModule, DocumentsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
