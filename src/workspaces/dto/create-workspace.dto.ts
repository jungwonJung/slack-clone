import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateWorkspaceDto {
  @ApiProperty({
    example: '슬랙',
    description: '워크스페이스명',
  })
  @IsString()
  @IsNotEmpty()
  public workspace: string;

  @ApiProperty({
    example: 'sleact',
    description: 'url 주소',
  })
  @IsString()
  @IsNotEmpty()
  public url: string;
}
