const config = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-leading-blank': [2, 'always'],
    'footer-leading-blank': [2, 'always'],
    'header-max-length': [2, 'always', 100],
    'subject-case': [
      2,
      'never',
      [],
    ],
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'improvement',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
      ],
    ],
  },
}

module.exports = config

