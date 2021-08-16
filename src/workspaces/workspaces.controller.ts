import {
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WorkspacesService } from './workspaces.service';

@ApiTags('WORKSPACE')
@Controller('api/workspaces')
export class WorkspacesController {
  constructor(private workspacesService: WorkspacesService) {}
  @Get('/:myId')
  getMyWorkspaces(@Param('myId', ParseIntPipe) myId: number) {
    return this, this.workspacesService.findMyWorkspace(myId); // 문자열 형태를 숫자로
  }
}
