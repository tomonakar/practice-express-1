# practice-express-1

## 1. [feature/init_project branch](https://github.com/tomonakar/practice-express-1/tree/feature/init_project)
## 概要
- プロジェクトの雛形作成
- `require` から `import/export` に切替え
- 簡単な `xss` 対策を行なった `photos router` を追加

### コマンド
- プロジェクト雛形作成
```
# プロジェクトの雛形を作成するジェネレータを導入
npm i -g express-generator

# プロジェクト作成
express --view=pug express-api
cd express-api
npm install
```

- サーバ起動

`DEBUG=express-api:* PORT=8000 npm start`

# 2. [feature/github_oauth]()
## 概要
- OAuth2.0 を使ったGitHub認証
- Node.jsのイベントループの仕組み

### 導入パッケージ
- passport : Web サービスとの外部認証を組み込むための プラットフォーム
- passport-github2 : passport が GitHub の認証を利用するためのモジュール
- express-session : Express でセッションを利用できるようにするためのモジュール

### Node.jsのイベントループの仕組み
1. setTimeout 関数に登録されたコールバック関数の実行
2. process.nextTick 関数に登録されているコールバック関数の実行
3. IO イベントの発生
4. IO イベントのコールバック関数の実行
5. process.nextTick 関数に登録されているコールバック関数の実行

### セッション用の秘密鍵　作成コマンド
`node -e "console.log(require('crypto').randomBytes(8).toString('hex'));"`

# 3. feature/mocha
## 概要
- mochaによるテストを確認
- 使い勝手はjestと対して変わらない
- 特に追記は無い

# 4. CircleCI
# 5. webpack
# 6. Jqery
# 7. AJAX
# 8. WebSocket
# 9. PostgreSQL 再入門
## memo

- postgreSQLコンテナ導入
`docker container exec -it expres1-postgres bash`

- コンテナにログイン
`docker container exec -it expres-postgres bash`

- コンテナからDBにログイン
`psql -U postgres`

- ローカルからpsqlでコンテナ上のDBにログイン
`psql -d secret_board -U postgres -h 0.0.0.0`

- DB内容を表示

```
\c secret_board
select * from "Post";
```

- DB初期化
```
drop database secret_board;
create database secret_board;
```

- webサービス起動
`node index.js`

# 10. SQL

```
# DB作成
CREATE DATABASE diary_1;

# DB接続
\c diary_1

# テーブル作成
- 主キー制約（重複・空はNG）
CREATE TABLE pages (write_date DATE PRIMARY KEY, body TEXT);


# テーブル一覧表示
\dt

＃挿入
INSERT INTO pages (write_date, body) VALUES ('2019-04-22', '最初の日記');

# 更新
UPDATE テーブル名 SET 列の名前=新しい値 WHERE 条件;


＃データ取得
SELECT body FROM pages;

# 削除
DELETE FROM pages WHERE write_date='2019-04-29';

# WHERE句：絞り込み
SELECT * FROM pages WHERE body LIKE '%寝た%';

# DROP：テーブル削除
DROP TABLE テーブル名;


```