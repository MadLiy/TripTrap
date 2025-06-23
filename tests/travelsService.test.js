const travelsService = require('../service/travelsService');
const travelsRepository = require('../repositories/travelsRepository');

jest.mock('../repositories/travelsRepository');

describe('travelsService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('crée un voyage', async () => {
    const travelData = { destination: 'Paris', price: 1000 };
    travelsRepository.create.mockResolvedValue(travelData);

    const result = await travelsService.createTravel(travelData);
    expect(travelsRepository.create).toHaveBeenCalledWith(travelData);
    expect(result).toHaveProperty('success', true);
    expect(result.newTravel).toEqual(travelData);
  });

  it('récupère un voyage par id', async () => {
    const travel = { _id: '123', destination: 'Paris' };
    travelsRepository.findByPk.mockResolvedValue(travel);

    const result = await travelsService.getTravelById('123');
    expect(travelsRepository.findByPk).toHaveBeenCalledWith('123');
    expect(result).toEqual(travel);
  });
});