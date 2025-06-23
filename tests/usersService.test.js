const usersService = require('../service/usersService');
const usersRepository = require('../repositories/usersRepository');

// Mock repo
jest.mock('../repositories/usersRepository');

describe('usersService', () => {
  afterEach(() => jest.clearAllMocks());

  it('crée un utilisateur', async () => {
    usersRepository.create.mockResolvedValue({
      firstname: 'Test',
      lastname: 'User',
      email: 'test@example.com',
      password: 'password123'
    });

    const user = await usersService.createUser({
      firstname: 'Test',
      lastname: 'User',
      email: 'test@example.com',
      password: 'password123'
    });

    expect(usersRepository.create).toHaveBeenCalledWith({
      firstname: 'Test',
      lastname: 'User',
      email: 'test@example.com',
      password: 'password123'
    });
    expect(user.newUser).toHaveProperty('email', 'test@example.com');
  });
  it('récupère tous les utilisateurs', async () => {
    usersRepository.findAll.mockResolvedValue([
      { firstname: 'Test', lastname: 'User', email: 'test@example.com' }
    ]);

    const users = await usersService.getAllUsers();
    expect(usersRepository.findAll).toHaveBeenCalled();
    expect(users).toHaveLength(1);
    expect(users[0]).toHaveProperty('email', 'test@example.com');
  });
  it('récupère un utilisateur par ID', async () => {
    usersRepository.findByPk.mockResolvedValue({
      firstname: 'Test',
      lastname: 'User',
      email: 'test@example.com'
    });
    const user = await usersService.getUserById('someUserId');
    expect(usersRepository.findByPk).toHaveBeenCalledWith('someUserId');
    expect(user).not.toBeNull();
    expect(user.email).toBe('test@example.com');
  });
  it('récupère un utilisateur par email', async () => {
    usersRepository.getUserByEmail = jest.fn().mockResolvedValue({
      firstname: 'Test',
      lastname: 'User',
      email: 'test@example.com'
    });

    const user = await usersService.getUserByEmail('test@example.com');
    expect(usersRepository.getUserByEmail).toHaveBeenCalledWith('test@example.com');
    expect(user).not.toBeNull();
    expect(user.email).toBe('test@example.com');
  });
});