import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { retryWhen } from 'rxjs';
import { User } from 'src/common/decorators/user.decorators';
import { Users } from 'src/entities/Users';
import { CreateWorkspaceDto } from './dto/create-workspace.dto';
import { WorkspacesService } from './workspaces.service';

@ApiTags('WORKSPACE')
@Controller('api/workspaces')
export class WorkspacesController {
  constructor(private workspacesService: WorkspacesService) {}
  // @Get()
  // getMyWorkspaces(@Param('myId', ParseIntPipe) myId: number) {
  //   return this, this.workspacesService.findMyWorkspace(myId); // 문자열 형태를 숫자로
  // }

  @Get()
  getMyWorkspaces(@User() user: Users) {
    return this, this.workspacesService.findMyWorkspace(user.id);
  }

  @Post()
  createWorkspace(@User() user: Users, @Body() body: CreateWorkspaceDto) {
    return this.workspacesService.createWorkspace(
      body.workspace,
      body.url,
      user.id,
    );
  }
}


