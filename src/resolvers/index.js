import Resolver from '@forge/resolver';
import api, { route } from '@forge/api';

const resolver = new Resolver();

resolver.define('getIssueDescription', async ({ payload }) => {
  const issueKey = payload.issueKey;

  const response = await api.asApp().requestJira(route`/rest/api/3/issue/${issueKey}?fields=description`);
  const data = await response.json();

  const description = data.fields.description?.content
    ?.map(block => block.content?.map(text => text.text).join(' '))
    .join('\n') || 'No description';

  return description;
});



export const handler = resolver.getDefinitions();
