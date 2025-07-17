const ReactCompilerConfig = {
  target: '19'
};

module.exports = function (api) {
  api.cache(true);
  return {
    "presets": [
      '@babel/preset-env',
      '@babel/preset-react',
      '@babel/preset-typescript',
    ],
    plugins: [
      ['babel-plugin-react-compiler', ReactCompilerConfig],
    ],
  };
};