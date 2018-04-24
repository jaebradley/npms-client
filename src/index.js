import axios from 'axios';
import qs from 'qs';

import buildSearchQuery from './buildSearchQuery';
import PACKAGE_TYPES from './packageTypes';

const NPMS_API_BASE_URL = 'https://api.npms.io/v2';

const search = ({
  terms,
  scope = null,
  author = null,
  maintainer = null,
  exclude = {
    packageTypes: [PACKAGE_TYPES.DEPRECATED, PACKAGE_TYPES.INSECURE, PACKAGE_TYPES.UNSTABLE],
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
  }).then(response => response.data)
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
  }).then(response => response.data)
);

const getPackageInformation = packageName => axios.get(`${NPMS_API_BASE_URL}/package/${packageName}`).then(response => response.data);

const getPackagesInformation = packageNames => axios.post(
  `${NPMS_API_BASE_URL}/package/mget`,
  packageNames,
).then(response => response.data);

export {
  search,
  getSuggestions,
  getPackageInformation,
  getPackagesInformation,
  PACKAGE_TYPES,
};
