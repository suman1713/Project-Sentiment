const path = require('path');

module.exports = {
  entry: {
    timeline: './src/assets/js/timeline.js',
    login: './src/assets/js/login.js'
  },
  output: {
    path: path.resolve(__dirname, 'public/assets/js'),
    filename: '[name].js'
  },
  resolve: {
    alias: {
      vue: 'vue/dist/vue.js'
    }
  }
};
