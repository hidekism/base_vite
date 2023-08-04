import { defineConfig } from 'vite'
import globule from 'globule'
import { resolve } from 'path';
import pugPlugin from 'vite-plugin-pug'

const htmlFileList = globule.find('./src/**/*.html', {
  ignore: [
    './src/_*.html'
  ]
})
const cssFileList = globule.find('./src/sass/**/*.scss', {
  ignore: [
    './src/**/_*.scss',
    './src/sass/component/**/*.scss',
    './src/sass/foundation/**/*.scss',
    './src/sass/global/**/*.scss',
    './src/sass/layout/**/*.scss',
    './src/sass/utility/**/*.scss'
  ]
})
const jsFileList = globule.find('./src/js/**/*.js', {
  ignore: [
    './src/js/**/_*.js',
    './src/js/lib/**/*.js',
  ]
})

const inputFiles = {};
for (let i = 0; i < htmlFileList.length; i++) {
  const file = htmlFileList[i];
  inputFiles[file.replace('./src/','').slice(0,-5)] = resolve(__dirname, file );
}
for (let i = 0; i < cssFileList.length; i++) {
  const file = cssFileList[i];
  inputFiles[file.replace('./src/','').slice(0,-4)] = resolve(__dirname, file );
}

/**
 * Pug用データ
 */
const env = {
  url: {
    dev: 'http:localhost',
    prod: 'https://example.com'
  },
  siteData: require('./sitedata.json')
}

export default defineConfig(({command}) => {
  return {
    root: './src',
    build: {
      outDir: '../dist',
      emptyOutDir: true,
      polyfillModulePreload: false,
      rollupOptions: {
        input: inputFiles,
        output: {
          entryFileNames: (chunkInfo) => {
            return `assets/js/[name].js`;
          },
          chunkFileNames: (chunkInfo) => {
            return `assets/js/[name].js`;
          },
          assetFileNames: (assetInfo) => {
            if (/\.(css)$/.test(assetInfo.name)) {
              return 'assets/[ext]/[name].css'
            }
            if (/\.(gif|jpeg|jpg|png|svg|webp)$/.test(assetInfo.name)) {
              return 'assets/images/[name].[ext]';
            }
            return 'assets/[name].[ext]'
          }
        }
      },
    },
    // server: {
    //   proxy: {
    //     '/': 'http://sample.local/'
    //   }
    // },
    css: {
      devSourcemap: true
    },
    plugins: [
      pugPlugin({
        pretty: true
      },{
        envUrl: (command === 'build')? env.url.prod : env.url.dev, // コマンドが build かどうかで環境変数を変える
        siteName: env.siteData.siteName,
        siteUrl: env.siteData.siteUrl,
        pageMeta: env.siteData.pageMeta
      })
    ]
  }
})
