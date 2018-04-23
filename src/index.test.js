import {
  search,
  getSuggestions,
} from './';

describe('integration test', () => {
  describe('#search', () => {
    it('should search with term "fruit"', async () => {
      const response = await search({ terms: ['fruit'] });
      console.log(response);
    });
  });

  describe('#getSuggestions', () => {
    it('should get suggestions for term "fruit"', async () => {
      const response = await getSuggestions({ terms: ['fruit'] });
      console.log(response);
    });
  });
});
