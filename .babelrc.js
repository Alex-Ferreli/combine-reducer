module.exports = {
  env: {
    cjs: {
      presets: [
        ["@babel/preset-env", {
          targets: {
            browsers: ["last 2 versions", "safari >= 7"]
          }
        }],
        "@babel/preset-typescript"
      ],
      plugins: ["@babel/plugin-proposal-export-default-from"]
    },
    es6: {
      presets: [
        ["@babel/preset-env", {
          targets: {
            browsers: ["last 2 versions", "safari >= 7"]
          },
          modules: false
        }],
        "@babel/preset-typescript"
      ],
      plugins: ["@babel/plugin-proposal-export-default-from"]
    },
    test: {
      presets: [
        ["@babel/preset-env", {
          targets: {
            browsers: ["last 2 versions", "safari >= 7"]
          },
        }],
        "@babel/preset-typescript"
      ],
      plugins: ["@babel/plugin-proposal-export-default-from"]
    }
  }
}
