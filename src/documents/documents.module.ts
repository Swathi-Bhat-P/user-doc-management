import { Module } from '@nestjs/common';
import { DocumentsController } from './documents.controller';
import { DocumentsService } from './documents.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Document } from './document.entity';
import { User } from 'src/users/user.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Document, User]), AuthModule],
  controllers: [DocumentsController],
  providers: [DocumentsService],
  exports: [DocumentsService]
})
export class DocumentsModule { }
