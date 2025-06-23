const inscriptionsService = require('../service/inscriptionsService');
const inscriptionsRepository = require('../repositories/inscriptionsRepository');

jest.mock('../repositories/inscriptionsRepository');

describe('inscriptionsService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('crée une inscription', async () => {
    const inscriptionData = { userId: 'u1', travel: 't1' };
    inscriptionsRepository.create.mockResolvedValue(inscriptionData);

    const result = await inscriptionsService.createInscription(inscriptionData);
    expect(inscriptionsRepository.create).toHaveBeenCalledWith(inscriptionData);
    expect(result).toEqual(inscriptionData);
  });

  it('récupère une inscription par id', async () => {
    const inscription = { _id: 'i1', userId: 'u1', travel: 't1' };
    inscriptionsRepository.findByPk.mockResolvedValue(inscription);

    const result = await inscriptionsService.getInscriptionsById('i1');
    expect(inscriptionsRepository.findByPk).toHaveBeenCalledWith('i1');
    expect(result).toEqual(inscription);
  });
});