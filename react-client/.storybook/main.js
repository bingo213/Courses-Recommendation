module.exports = {
  // "stories": ["../src/atoms/**/*.stories.mdx", "../src/**/*.stories.@(js|jsx|ts|tsx)"],
  stories: [
    '../src/atoms/**/*.stories.@(mdx|ts|tsx|js|jsx)',
    '../src/components/**/*.stories.@(mdx|ts|tsx|js|jsx)',
  ],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
};
