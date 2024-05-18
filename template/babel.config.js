module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
    [
      '@hancleee/babel-plugin-react-native-pxtodp',
      {
        uiWidth: 375,
        includes: ['src/'],
        excludes: [],
        superIncludes: [],
        extraKeyNames: [],
      },
    ],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.ts', '.tsx', '.json'],
        alias: {
          '@': ['./src'],
        },
      },
    ],
  ],
};
