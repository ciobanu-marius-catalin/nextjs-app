const path = require("path");

function resolve(dir) {
  return path.join(__dirname, dir);
}

module.exports = {
  productionBrowserSourceMaps: true,
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Important: return the modified config
    config.resolve.alias = {
      ...config.resolve.alias,
      "@": resolve("./src"),
    };

    return config;
  },
};
// module.exports = {
//   webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
//     // Important: return the modified config
//     return config
//   },
// }