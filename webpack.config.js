var minimize = process.argv.indexOf('--minify') !== -1;

this.config = {
  entry: {
    "app.purple": [
      "./src/main/webapp/app/scripts/app.js",
    ]
  },
  output: {
    path: "./src/main/webapp/dist",
    filename: "purple.bundle.js"
  },
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: [
      'bower_components',
      'node_modules',
      'src/main/webapp/app/scripts',
    ],
    alias: {
      //'jquery': 'bower_components/jquery/dist/jquery.js'
    }
  },
  module: {
    loaders: [{
      test: /\.css$/,
      loader: "style!css!sass"
    }]
  },
  jshint: {
    emitErrors: true,
    failOnHint: false
  }
}

if (minimize) {
  this.config.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    },
    mangle: false
  }));
}

module.exports = this.config;
