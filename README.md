
## What is 絵文字くん

GithubでSlackのカスタム絵文字を表示できるChrome Extensionです。
殺伐としたIssue、PullRequestに一時の癒やしを与えてくれます。

## インストール方法

### Slackのカスタム絵文字ファイルを取得する

1. [Test token generator](https://api.slack.com/docs/oauth-test-tokens) からトークンを作成する
2. [emoji.list取得の代理サーバ](https://vert-choucroute-30567.herokuapp.com/) にトークンをペーストし、`Generate`をクリックする
3. 2で生成されたURLを `Copy to clipboard` をクリックしてコピーする

### Chome拡張として設定する

1. コードをチェックアウト
2. Chromeで `chrome://extensions` にアクセスする
3. `デベロッパーモード` をチェックする
4. `パッケージ化されていない拡張機能を読み込む...` をクリックする
5. コードのディレクトリを選択する
6. ツールバーに絵文字くんのアイコンが表示される
7. 絵文字くんのアイコンをクリックして、テキスト欄にコピーしたURLをペーストする
8. `setup` ボタンをクリックする

*[emoji.list取得の代理サーバ]: ソースは[こちら](https://github.com/YUTA-FUJITA/emoji-server)
