module.exports = {
  types: [
    { type: 'feat', section: 'Features' },
    { type: 'fix', section: 'Bug Fixes' },
    { type: 'perf', section: 'Performance Improvements' },
    { type: 'revert', section: 'Reverts' },
    { type: 'docs', section: 'Documentation', hidden: false },
    { type: 'style', section: 'Styles', hidden: true },
    { type: 'refactor', section: 'Code Refactoring', hidden: false },
    { type: 'test', section: 'Tests', hidden: true },
    { type: 'build', section: 'Build System', hidden: true },
    { type: 'ci', section: 'CI/CD', hidden: true },
    { type: 'chore', section: 'Chores', hidden: true }
  ],
  skip: {
    changelog: false
  }
};
