import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]),
  forwardRef(() => AuthModule), // Include AuthModule to access JwtService

  ],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService]

})
export class UsersModule { }
