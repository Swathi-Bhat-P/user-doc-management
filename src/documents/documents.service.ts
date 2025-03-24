import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Document } from './document.entity';
import { User } from '../users/user.entity';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private docRepo: Repository<Document>,
    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async create(data: { title: string; filePath: string; userId: number }) {
    const user = await this.userRepo.findOneBy({ id: data.userId });
    const document = this.docRepo.create({
      title: data.title,
      filePath: data.filePath,
      uploadedBy: user,
    });
    return this.docRepo.save(document);
  }

  async findAll() {
    return this.docRepo.find({ relations: ['uploadedBy'] });
  }

  async findOne(id: number) {
    return this.docRepo.findOne({ where: { id }, relations: ['uploadedBy'] });
  }

  async update(id: number, title: string) {
    const doc = await this.docRepo.findOneBy({ id });
    if (doc) {
      doc.title = title;
      return this.docRepo.save(doc);
    }
    return null;
  }

  async remove(id: number) {
    return this.docRepo.delete(id);
  }
}
