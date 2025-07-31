import Resolver from '@forge/resolver';
import api, { route } from '@forge/api';

const resolver = new Resolver();

// Alle Issues aus einem Projekt holen
resolver.define('getIssuesForProject', async ({ payload }) => {
  const projectKey = payload.projectKey;

  const response = await api.asApp().requestJira(
    route`/rest/api/3/search?jql=project=${projectKey}&fields=summary&maxResults=50`
  );
  const data = await response.json();
  console.log(data);
  console.log(JSON.stringify(data, null, 2));

  const issues = data.issues.map(issue => ({
    key: issue.key,
    summary: issue.fields.summary
  }));

  return issues;
});

// Beschreibung für ein einzelnes Issue holen
resolver.define('getIssueDescription', async ({ payload }) => {
  const issueKey = payload.issueKey;

  const response = await api.asApp().requestJira(route`/rest/api/3/issue/${issueKey}?fields=description`);
  const data = await response.json();

  const description = data.fields.description?.content
    ?.map(block => block.content?.map(text => text.text).join(' '))
    .join('\n') || 'Keine Beschreibung';

  return description;
});

export const handler = resolver.getDefinitions();
