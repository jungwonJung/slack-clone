import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/entities/Users';
import { Repository } from 'typeorm';
import bcrypt from 'bcrypt';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
import { ChannelMembers } from 'src/entities/ChannelMembers';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(Users)
    private usersRepository: Repository<Users>,
    @InjectRepository(WorkspaceMembers)
    private workspaceMembersRepositoy: Repository<WorkspaceMembers>,
    @InjectRepository(ChannelMembers)
    private channelMembersRepositoy: Repository<ChannelMembers>,
  ) {}

  async join(email: string, nickname: string, password: string) {
    const user = this.usersRepository.findOne({ where: { email } });

    if (user) {
      throw new UnauthorizedException('이미 존재하는 사용자입니다');
    }
    const hashedPassword = await bcrypt.hash(password, 12);

    const returned = await this.usersRepository.save({
      email,
      nickname,
      password: hashedPassword,
    });

    const workspaceMembers = new WorkspaceMembers();
    workspaceMembers.UserId = returned.id;
    workspaceMembers.WorkspaceId = 1;

    await this.channelMembersRepositoy.save({
      UserId: returned.id,
      ChannelId: 1,
    });

    return true;
  }

  async findByEmail(email: string) {
    return this.usersRepository.findOne({
      where: { email },
      select: ['id', 'email', 'password'],
    });
  }
}
