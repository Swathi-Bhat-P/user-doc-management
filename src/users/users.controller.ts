import {
    Controller,
    Get,
    Patch,
    Param,
    Delete,
    Body,
    UseGuards,
    Req,
  } from '@nestjs/common';
  import { UsersService } from './users.service';
  import { JwtAuthGuard } from '../common/jwt.guard';
  import { RolesGuard } from '../common/roles.guard';
  
  @Controller('users')
  @UseGuards(JwtAuthGuard)
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @Get()
    @UseGuards(new RolesGuard('admin'))
    findAll() {
      return this.usersService.findAll();
    }
  
    @Patch(':id/role')
    @UseGuards(new RolesGuard('admin'))
    updateRole(@Param('id') id: string, @Body('role') role: string) {
      return this.usersService.updateRole(+id, role);
    }
  
    @Delete(':id')
    @UseGuards(new RolesGuard('admin'))
    remove(@Param('id') id: string) {
      return this.usersService.remove(+id);
    }
  
    @Get('me')
    getProfile(@Req() req) {
      return req.user;
    }
  }
  