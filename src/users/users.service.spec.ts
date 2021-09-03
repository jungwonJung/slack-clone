import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ChannelMembers } from 'src/entities/ChannelMembers';
import { Users } from 'src/entities/Users';
import { WorkspaceMembers } from 'src/entities/WorkspaceMembers';
import { UsersService } from './users.service';

class MockUserRepository {
  #data = [{ id: 1, email: 'wjdwjd1501@gmail.com' }];
  findOne({ where: email }) {
    const data = this.#data.find((v) => v.email === email);
    if (data) {
      return data;
    }
    return null;
  }
}
class MockWorkspaceMembersRepository {}
class MockChannelMembersRepository {}

describe('UsersService', () => {
  // describe 는 하나의 테스트 묶음
  // beforeeach 는 각가의 it 전에 실행된다
  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      // 가짜 모듈생성
      providers: [
        UsersService, // { provide : UsersService, useClass : UsersService} 랑 동일한거임
        {
          provide: getRepositoryToken(Users),
          useClass: MockUserRepository,
          // useClass : process.env.NODE_ENV === 'production' ? UsersRepository : MockUserRepository  배포환경일땐 실제 db 사용하겟다 이런식으로도 가능
        },
        {
          provide: getRepositoryToken(WorkspaceMembers),
          useClass: MockWorkspaceMembersRepository,
        },
        {
          provide: getRepositoryToken(ChannelMembers),
          useClass: MockChannelMembersRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService); // 가짜모듈을 서비스에 넣어놓음
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('find by eamil은 email을 통해 유저를 찾는다', () => {
    expect(service.findByEmail('wjdwjd1501@gmail.com')).resolves.toStrictEqual({
      // 객체비교할때는 toStrictEqual 를 사용하라고한다
      // async 를 붙힌 promise 는 항상 resolves 를 붙히자
      email: 'wjdwjd1501@gmail.com',
      id: 1,
    });
  });

  // it.todo('find by email 은 email로 유저를 못찾으면 null 을반환'); // 미래에 할 테스트들은 todo 로
  it('find by eamil은 email을 통해 유저를 찾는다', () => {
    expect(service.findByEmail('wjd오타501@gmail.com')).toBe(null);
  });
});
