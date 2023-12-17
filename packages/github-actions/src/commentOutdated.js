import { exec } from 'child_process';
import { markdownTable } from 'markdown-table';

// @ts-check
/** @param {import('@types/github-script').AsyncFunctionArguments} AsyncFunctionArguments */
export async function commentOutdated({ github, context }) {
  const outdatedMarkdown = await getOutdatedOutput();
  const { owner, repo, number: issue_number } = context.issue;
  const comments = await github.rest.issues.listComments({
    owner,
    repo,
    issue_number,
  });
  const comment = comments.data.find(({ user, body }) => {
    return (user.login =
      'github-actions[bot]' && body.startsWith('# Outdated Packages'));
  });
  const body = ['# Outdated Packages', outdatedMarkdown].join('\n');
  if (comment) {
    console.log(`Updating existing comment: ${comment.id}`);
    await github.rest.issues.updateComment({
      owner,
      repo,
      comment_id: comment.id,
      body,
    });
  } else {
    console.log('Creating new comment');
    await github.rest.issues.createComment({
      owner,
      repo,
      issue_number,
      body,
    });
  }
}

async function getOutdatedOutput() {
  const output = await new Promise((resolve) => {
    exec('pnpm -r --format=json outdated', (_, stdout) => {
      resolve(stdout);
    });
  });
  const outdatedPackageData = JSON.parse(output);
  const data = [['Package', 'Current', 'Latest', 'Dependents']];
  for (let name of Object.keys(outdatedPackageData)) {
    const entry = outdatedPackageData[name];
    if (entry.dependencyType === 'devDependencies') {
      name += ' (dev)';
    }
    data.push([
      name,
      entry.current,
      entry.latest,
      entry.dependentPackages.map(({ location }) => location).join(', '),
    ]);
  }
  return markdownTable(data);
}
