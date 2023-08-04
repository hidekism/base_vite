# Vite Base Files

## 🔴 使い方

### 🔸 インストール

``` txt
npm install
```

### 🔸 ローカルサーバー起動

``` txt
npm run dev
```

### 🔸 ビルド

``` txt
npm run build
```


## 🔴 HTML

* src ディレクトリ内に .html ファイルを置く。
* 下層ページもディレクトリを用意して .html ファイルを置いていけばOK。
* Pugを使用する場合 `vite-plugin-pug` を使用しているので、.html 内に `<pug>` タグを記述していく。
* PHP はビルドできない。

## 🔴 Sass

* サイト全体のファイルは sass 直下の style.scss。
* 各ページ用のファイルは sass/page 内に置く。
* HTML 側では直接 .scss ファイルを読み込む。

## 🔴 JavaScript

* 基本的には js ディレクトリ直下の scripts.js をサイト共通で使用する。
* ファイルを分割して import で読み込み 1 ファイルにバインドする。
* 各ページ用のファイルを用意することも可能だが、ファイル名が保証できない。

## 🔴 画像

* public/assets/images 内に格納。
* ディレクトリをきって格納することも可能。
* 圧縮はしないので、圧縮する場合は別途対応。
