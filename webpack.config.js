var minimize = process.argv.indexOf('--minify') !== -1;

this.config = {
  entry: {
    "app.purple": [
      "./src/main/webapp/app/scripts/app.js",
    ],
    "app.purple.styles": [
      "./bower_components/bootstrap/dist/css/bootstrap.css",
      './src/main/webapp/app/styles/main.scss',
    ]
  },
  output: {
    path: "./src/main/webapp/dist",
    filename: "[name].bundle.js",
    publicPath: "/"
  },
  resolve: {
    extensions: ['', '.js'],
    modulesDirectories: [
      'bower_components',
      'node_modules',
      'src/main/webapp/app/scripts',
    ],
    alias: {
    }
  },
  module: {
    loaders: [{
     test: /\.scss$/,
      loader: "style!css!sass"
    }, {
      test: /\.css$/,
      loaders: ['style', 'css']
    }, {
     test: /\.(png|gif|woff|woff2|eot|ttf|svg)$/,
     loaders: ['url-loader']
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
