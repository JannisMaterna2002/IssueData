import Resolver from '@forge/resolver';
import api, { route } from '@forge/api';

const resolver = new Resolver();

resolver.define('getIssueDetails', async ({payload}) => {
  const {issueKey} = payload;
  const response = await api.asUser().requestJira(route`/rest/api/3/issue/${issueKey}?fields=description`);
  const data = await response.json();
  const description = data.fields.description?.content;
  return description;
});

export const handler = resolver.getDefinitions();
