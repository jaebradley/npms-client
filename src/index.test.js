import {
  search,
  getSuggestions,
  getPackageInformation,
  getPackagesInformation,
} from '.';

describe('integration test', () => {
  describe('#search', () => {
    it('should search with term "fruit"', async () => {
      const response = await search({ terms: ['fruit'] });
      expect(response).toBeDefined();
    });
  });

  describe('#getSuggestions', () => {
    it('should get suggestions for term "fruit"', async () => {
      const response = await getSuggestions({ terms: ['fruit'] });
      expect(response).toBeDefined();
    });
  });

  describe('#getPackageInformation', () => {
    it('should get package information for fruit', async () => {
      const response = await getPackageInformation('fruit');
      expect(response).toBeDefined();
    });
  });

  describe('#getPackagseInformation', () => {
    it('should get package information for react, react-dom, and prop-types', async () => {
      const response = await getPackagesInformation(['react', 'react-dom', 'prop-types']);
      expect(response).toBeDefined();
    });
  });
});
