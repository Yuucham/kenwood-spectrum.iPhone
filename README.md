# KENWOOD DPX-550風スペアナサイト

iPhone Safari向けのレトロなカーオーディオ風スペクトラムアナライザーです。

## 機能
- マイク入力をリアルタイム解析してスペクトラム表示
- 音楽ファイルの再生とスペクトラム表示
- AudD APIを使った曲名・アーティスト認識
- DPX-550風LEDバー表示

## iPhoneで使うときの注意
Safariの仕様上、SpotifyやApple Musicアプリ内部の音声を直接取得できません。音楽をiPhone本体のスピーカーから流し、Safariのマイクで拾う方式です。イヤホン利用時はマイクで音を拾えない場合があります。HTTPSで公開し、Safariでマイクを許可してください。

## 公開方法（Render）
このプロジェクトには `render.yaml` を含めています。Node.js対応ホスティングに必要な起動設定は記入済みです。

1. このZIPを展開し、4つの元ファイル（`index.html`、`server.js`、`package.json`、`render.yaml`）をGitHubリポジトリのルートに置きます。
2. Renderで「New +」→「Blueprint」を選び、そのGitHubリポジトリを接続します。
3. `AUDD_API_TOKEN` の入力欄にAudDで取得したAPIトークンを登録してデプロイします。
4. Renderが発行する `https://...onrender.com` のURLをSafariで開きます。

## セキュリティ
AudDのAPIトークンは `index.html` に書かないでください。Renderの環境変数 `AUDD_API_TOKEN` にだけ設定してください。

## 制限
- 曲名認識にはAudDのAPIトークンが必要です。利用条件・料金・回数制限はAudDの公式情報を確認してください。
- iPhone実機でマイク許可が必要です。
- 無料ホスティングでは、一定時間アクセスがないと起動に時間がかかる場合があります。
