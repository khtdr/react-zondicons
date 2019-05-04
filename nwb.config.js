module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactZondicons',
      externals: {
        react: 'React'
      }
    }
  },
  webpack: {
    config(config) {
      config.resolve.extensions = [".js", ".ts", ".tsx"];
      config.module.rules.push({
        "test": /\.tsx?$/,
        "loader": "awesome-typescript-loader"
      });
      return config;
    }
  }
}
