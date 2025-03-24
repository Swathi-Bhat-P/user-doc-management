import {
    Controller,
    Post,
    UseInterceptors,
    UploadedFile,
    Body,
    Get,
    Param,
    Delete,
    Patch,
    UseGuards,
    Req,
  } from '@nestjs/common';
  import { FileInterceptor } from '@nestjs/platform-express';
  import { diskStorage } from 'multer';
  import { JwtAuthGuard } from '../common/jwt.guard';
  import { RolesGuard } from '../common/roles.guard';
  import { DocumentsService } from './documents.service';
  import { extname } from 'path';
  
  @Controller('documents')
  @UseGuards(JwtAuthGuard)
  export class DocumentsController {
    constructor(private readonly docService: DocumentsService) {}
  
    @Post()
    @UseGuards(new RolesGuard('editor'))
    @UseInterceptors(
      FileInterceptor('file', {
        storage: diskStorage({
          destination: './uploads',
          filename: (req, file, cb) => {
            const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
            cb(null, `${file.fieldname}-${uniqueSuffix}${extname(file.originalname)}`);
          },
        }),
      }),
    )
    async upload(@UploadedFile() file: Express.Multer.File, @Body('title') title: string, @Req() req) {
      // console.log("in doc controller:",req.user.userId)
      //getting Jwt guard payload after jwt authentication
      let user = req.user
      return this.docService.create({
        title,
        filePath: file.path,
        userId: user.sub,
      });
    }
  
    @Get()
    findAll() {
      return this.docService.findAll();
    }
  
    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.docService.findOne(+id);
    }
  
    @Delete(':id')
    @UseGuards(new RolesGuard('editor'))
    remove(@Param('id') id: string) {
      return this.docService.remove(+id);
    }
  
    @Patch(':id')
    @UseGuards(new RolesGuard('editor'))
    async update(@Param('id') id: string, @Body() body: any) {
      return this.docService.update(+id, body.title);
    }
  }
  