module.exports = {
  types: [
    { type: 'feat', section: '✨ Features' },
    { type: 'fix', section: '🐛 Bug Fixes' },
    { type: 'perf', section: '⚡ Performance Improvements' },
    { type: 'refactor', section: '♻️ Code Refactoring' },
    { type: 'docs', section: '📚 Documentation' },
    { type: 'test', section: '🧪 Tests' },
    { type: 'build', section: '🏗️ Build System' },
    { type: 'ci', section: '👷 CI/CD' },
    { type: 'chore', section: '🔧 Chores' },
    { type: 'style', section: '💄 Styling' },
    { type: 'revert', section: '⏪ Reverts' }
  ],
  commitUrlFormat: '{{host}}/{{owner}}/{{repository}}/commit/{{hash}}',
  compareUrlFormat: '{{host}}/{{owner}}/{{repository}}/compare/{{previousTag}}...{{currentTag}}',
  issueUrlFormat: '{{host}}/{{owner}}/{{repository}}/issues/{{id}}',
  userUrlFormat: '{{host}}/{{user}}',
  releaseCommitMessageFormat: 'chore(release): {{currentTag}}',
  bumpFiles: [
    {
      filename: 'package.json',
      type: 'json'
    }
  ]
};