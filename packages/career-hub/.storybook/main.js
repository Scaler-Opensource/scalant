const path = require('path');
const webpack = require('webpack');

module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx)'],
  addons: ['@storybook/addon-essentials'],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => {
    // Add alias
    config.plugins.push(
      new webpack.ProvidePlugin({
        React: 'react',
      })
    );
    config.resolve.alias = {
      ...config.resolve.alias,
      '@components': path.resolve(__dirname, '../../components/src'),
    };

    // Handle plain CSS files
    config.module.rules.push({
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
      include: path.resolve(__dirname, '../'),
    });

    config.module.rules.push({
      test: /\.s[ac]ss$/i,
      exclude: /\.module\.s[ac]ss$/, // Exclude CSS Modules
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'sass-loader',
          options: {
            additionalData: `@use "@components/styles/theme.scss" as *;`,
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    });

    // ✅ CSS Modules: *.module.scss
    config.module.rules.push({
      test: /\.module\.s[ac]ss$/,
      use: [
        'style-loader',
        {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[name]__[local]___[hash:base64:5]',
              namedExport: false,
            },
            sourceMap: true,
          },
        },
        {
          loader: 'sass-loader',
          options: {
            additionalData: `@use "@components/styles/theme.scss" as *;`,
          },
        },
      ],
      include: path.resolve(__dirname, '../'),
    });

    return config;
  },
};

