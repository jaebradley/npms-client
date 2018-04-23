import axios from 'axios';
import qs from 'qs';

import buildSearchQuery from './buildSearchQuery';

const NPMS_API_BASE_URL = 'https://api.npms.io/v2';

const search = ({
  terms,
  scope = null,
  author = null,
  maintainer = null,
  exclude = {
    packageTypes: [],
    keywords: [],
  },
  include = {
    packageTypes: [],
    keywords: [],
  },
  boostExactMatches = true,
  packageScoreMultiplier = null,
  packageScoreWeights = {
    quality: null,
    popularity: null,
    maintenance: null,
  },
  from = 0,
  size = 25,
}) => (
  axios.get(`${NPMS_API_BASE_URL}/search`, {
    // custom serializer because npms.io doesn't respect %2B (aka +) in q parameter
    paramsSerializer: params => `q=${params.q}&${qs.stringify({ from: params.from, size: params.size })}`,
    params: {
      q: buildSearchQuery({
        terms,
        scope,
        author,
        maintainer,
        exclude,
        include,
        boostExactMatches,
        packageScoreMultiplier,
        packageScoreWeights,
      }),
      from,
      size,
    },
  })
);

const getSuggestions = ({
  terms,
  size = 25,
}) => (
  axios.get(`${NPMS_API_BASE_URL}/search/suggestions`, {
    // custom serializer because npms.io doesn't respect %2B (aka +) in q parameter
    paramsSerializer: params => `q=${params.q}&${qs.stringify({ size: params.size })}`,
    params: {
      q: terms.join('+'),
      size,
    },
  })
);

export {
  search,
  getSuggestions,
};
