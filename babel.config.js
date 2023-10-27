module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./main'],
        extensions: [
          '.ts',
          '.tsx',
          '.js',
          '.ios.js',
          '.android.js',
          '.ios.ts',
          '.android.ts',
        ],
        alias: {
          main: './main',
        },
      },
    ],
    'react-native-reanimated/plugin',
  ],
};
