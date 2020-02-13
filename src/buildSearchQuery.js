// https://api-docs.npms.io/#api-Search-ExecuteSearchQuery

const formattedScope = (scope) => {
  if (scope.indexOf('@') === 0) {
    return scope;
  }

  return `@${scope}`;
};

const buildSearchQuery = ({
  terms,
  scope,
  author,
  maintainer,
  exclude,
  include,
  boostExactMatches,
  packageScoreMultiplier,
  packageScoreWeights,
}) => {
  const queryTerms = [`${terms.join('+')}`];

  if (scope) {
    queryTerms.push(`scope:${formattedScope(scope)}`);
  }

  if (author) {
    queryTerms.push(`author:${author}`);
  }

  if (maintainer) {
    queryTerms.push(`maintainer:${maintainer}`);
  }

  const keywords = [];
  if (exclude && exclude.keywords && exclude.keywords.length > 0) {
    exclude.keywords.forEach((keyword) => keywords.push(`-${keyword}`));
  }

  if (include && include.keywords && include.keywords.length > 0) {
    include.keywords.forEach((keyword) => keywords.push(keyword));
  }

  if (keywords.length > 0) {
    queryTerms.push(`keywords:${keywords.join(',')}`);
  }

  const excludePackageTypes = [];
  if (exclude && exclude.packageTypes && exclude.packageTypes.length > 0) {
    exclude.packageTypes.forEach((packageType) => excludePackageTypes.push(packageType));
    queryTerms.push(`not:${excludePackageTypes.join(',')}`);
  }

  const includePackageTypes = [];
  if (include && include.packageTypes && include.packageTypes.length > 0) {
    include.packageTypes.forEach((packageType) => includePackageTypes.push(packageType));
    queryTerms.push(`is:${includePackageTypes.join(',')}`);
  }

  if (typeof boostExactMatches === 'boolean') {
    queryTerms.push(`boost-exact:${boostExactMatches}`);
  }

  if (packageScoreMultiplier) {
    queryTerms.push(`score-effect:${packageScoreMultiplier}`);
  }

  if (packageScoreWeights) {
    if (packageScoreWeights.quality) {
      queryTerms.push(`quality-weight:${packageScoreWeights.quality}`);
    }

    if (packageScoreWeights.popularity) {
      queryTerms.push(`popularity-weight:${packageScoreWeights.popularity}`);
    }

    if (packageScoreWeights.maintenance) {
      queryTerms.push(`maintenance-weight:${packageScoreWeights.maintenance}`);
    }
  }

  return queryTerms.join('+');
};

export default buildSearchQuery;
