// Webpack 5 - pollyfill fix
module.exports = function override(config) {
  // Configure fallback for missing Node.js core modules
  config.resolve = {
    ...config.resolve,
    fallback: {
      ...config.resolve.fallback,
      assert: false,
      buffer: false,
      child_process: false,
      crypto: false,
      dns: false,
      fs: false,
      http: false,
      https: false,
      net: false,
      os: false,
      path: false,
      stream: false,
      tls: false,
      url: false,
      util: false,
      zlib: false,
    },
  };

  return config;
};
