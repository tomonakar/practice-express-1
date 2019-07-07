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

# 10. SQLの基礎

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

# 11. RDBにおけるデータモデリング

## データ中心アプローチ
- データベース管理したい対象（エンティティ）を決める
- それらとの関わりを考える
- データとして持つ項目をまとめる

### 1. エンティティを決める
- 単体で管理する必要があり、それを親として別のデータが付属するような物
    - 日記帳を例に見る
        -  `日記のページ` はエンティティ.
        - `書いた日` `日記の内容` は、日記のページに付属するデータなのでエンティティではない


### 2. エンティティの関連を考える
- エンティティ同士の関わり：リレーションシップ(Relationship)を考える
- 厳密に関係を分析して定義する必要がある

#### カーディナリティ（関係性の数の対応）
- リレーションシップを持つ両者の数の対応がどうなっているか
- 例えば、 `クラス` と `生徒` のカーディナリティは、 `1 対 多` の関係と分析できる
- 例えば、 `クラス` と `クラスの教室` のカーディナリティは、 `1 対 1` の関係と分析できる
- カーディナリティは、モデル化しようとしている現実の状況によって、変わることに注意する必要がある

#### オプショナリティ（任意性）
- 必ず関係が成り立つかどうか
- `クラスには担任の先生がつく`　  オプショナリティ無し
- `先生は授業を担当する`  　　　　オプショナリティ有り

#### エンティティの従属性
- リレーションシップで繋がれるエンティティで、片方が存在しないと、もう片方も存在できないかどうか
- `従属エンティティ` 他のいずれかのエンティティに存在しており、それがなくなると存在できないエンティティ
- `独立エンティティ` 単独で存在できるエンティティ


### 3. データとして持つ項目をまとめる
- `属性`：各エンティティに含まれるデータとなる項目
    - `日記ページ` に対しては、その日付や内容、 `人` に対しては、名前や性別が属性

### 4. ER図
- エンティティ・リレーションシップ・カーディナリティ・属性などをER図にまとめる

以上が、データ中心アプローティによるデータモデリングの流れとなる。

## 適切にデータモデル設計がされていないテーブル

```
 id | write_date |       body       | user_name  | user_gender
----+------------+------------------+------------+-------------
  1 | 2019-02-25 | よく寝た         | 山田寝太郎 | 男
  2 | 2019-02-26 | 昼寝した         | 山田寝太郎 | 男
  3 | 2019-02-26 | 今日は晴れでした | 鈴木ひより | 女
  4 | 2019-02-26 | 成長を感じる     | 石垣高雄   | 男
  5 | 2019-02-27 | 今日も成長した   | 石垣高雄   | 男
  6 | 2019-02-27 | 雨が降りました   | 鈴木ひより | 女
  7 | 2019-02-28 | 寝すぎた         | 山田寝太郎 | 男
  8 | 2019-02-28 | くもりでした     | 鈴木ひより | 女
  9 | 2019-02-28 | 飛躍の一日だった | 石垣高雄   | 男
 10 | 2019-02-28 | 2月は寝てた      | 山田寝太郎 | 男
(10 rows)
```

- データの実体が散らばり良くない設計（非正規形）となっている
  - 日記帳とユーザ二つのエンティティが混ざり合ったテーブルとなっている
  - 例えば、ユーザ名を変えた場合、複数行に変更が入り、管理が煩雑となる（データ数が増えると非常に辛くなる）

### データの抽出

```
SELECT write_date, body FROM pages WHERE user_name='山田寝太郎';

 write_date |    body
------------+-------------
 2019-02-25 | よく寝た
 2019-02-26 | 昼寝した
 2019-02-28 | 寝すぎた
 2019-02-28 | 2月は寝てた
(4 rows)

SELECT user_name, user_gender from pages WHERE write_date='2019-02-27';

 user_name | user_gender
-----------+------------
 石垣高雄   | 男
 鈴木ひより | 女
(2 rows)

```

## 上記の非正規形のテーブルを正規化する
### 人テーブルを作る

`CREATE TABLE users (userid SERIAL PRIMARY KEY, name VARCHAR(16), gender CHAR(1));`

- データを投入する

```
INSERT INTO users (name, gender) VALUES ('山田寝太郎', '男');
INSERT INTO users (name, gender) VALUES ('鈴木ひより', '女');
INSERT INTO users (name, gender) VALUES ('石垣高雄', '男');
```

### 日記テーブルを作る

- ユーザテーブルのデータと紐づけるために、外部キー `userid` を定義する

`CREATE TABLE diaries (id SERIAL PRIMARY KEY, write_date DATE, body TEXT, userid INTEGER);`

- データを投入する

`INSERT INTO diaries (write_date, body, userid) VALUES ('2019-02-25', 'よく寝た', 1);`


### 作成したそれぞれのテーブルを確認する

```
SELECT * FROM users;
SELECT * FROM diaries;

 userid |    name    | gender
--------+------------+--------
      1 | 山田寝太郎 | 男
      2 | 鈴木ひより | 女
      3 | 石垣高雄   | 男
(3 rows)

 id | write_date |       body       | userid
----+------------+------------------+--------
  1 | 2019-02-25 | よく寝た         |      1
(1 row)
```

### テーブルに列を追加する
`ALTER TABLE テーブル名 ADD 追加する列の名前 データ型;`

# 12 テーブル結合
## 下準備
```
# db作成
docker exec -it expres1-postgres bash
psql -U postgres
CREATE DATABASE TEMPLATE template0 diary3;

# データ投入
$ curl -o- https://progedu.github.io/rdb-study/dump_diary3.sql | psql diary3 -U postgres -h 0.0.0.0;
```

### 内部結合
- 結合に使う列の値がどちらのテーブルにもそろって存在したときのみ、結果にその行を含める



```
SELECT
    name,
    body
FROM
    diaries
    JOIN
        users
    ON  diaries.userid = users.userid
WHERE
    gender = '男';
```

- INNER JOIN と書ける

```
SELECT
    id,
    body,
    comment
FROM
    diaries
    INNER JOIN
        comments
    ON  diaries.id = comments.diary_id;
```

### 外部結合
- 結合時に、指定したテーブル行を全て残しつつ結合ができる
  - 左外部結合 (LEFT JOIN) ベン図の左側を含む
  - 右外部結合 (RIGHT JOIN) ベン図の右側を含む
  - 完全外部結合 (FULL JOIN) ベン図の論理積以外を含む


```
SELECT
    id,
    body,
    comment
FROM
    diaries
    LEFT JOIN
        comments
    ON  diaries.id = comments.diary_id;
```

### ORDER BYによる並び替え

```
SELECT
    id,
    body,
    comment
FROM
    diaries
    LEFT JOIN
        comments
    ON  diaries.id = comments.diary_id
ORDER BY
    id;
```

# 13. インデックス

### シーケンシャルスキャン

- EXPLAIN で　インデックスが無いテーブルのSQL実行速度を測定する

`EXPLAIN ANALYZE SELECT * FROM scores WHERE score = 100;`

```
ranking=# explain analyze select * from scores where score = 100;
                                                       QUERY PLAN
------------------------------------------------------------------------------------------------------------------------
 Gather  (cost=1000.00..12593.73 rows=154 width=24) (actual time=7.088..56.780 rows=617 loops=1)
   Workers Planned: 2
   Workers Launched: 2
   ->  Parallel Seq Scan on scores  (cost=0.00..11578.33 rows=64 width=24) (actual time=0.190..40.826 rows=206 loops=3)
         Filter: (score = 100)
         Rows Removed by Filter: 333128
 Planning Time: 1.170 ms
 Execution Time: 62.150 ms
(8 rows)
```

- 62.150msは時間がかかり過ぎているのでインデックスを使って短縮させる
- インデックスがない場合、RDBはシーケンシャルに条件を全て探索するのでデータ量に比例して実行時間が伸びていく
- EXPLAIN の結果に Seq Scanと表示されている


### インデックスを付与

- `scores` テーブルの `score` 列にインデックスをはる

`CREATE INDEX ON scores (score);`

- EXPLAIN ANALYZE で計測

```
ranking=# EXPLAIN ANALYZE SELECT * FROM scores WHERE score = 100;
                                                           QUERY PLAN
---------------------------------------------------------------------------------------------------------------------------------
 Index Scan using scores_score_idx on scores  (cost=0.42..531.55 rows=154 width=24) (actual time=0.195..17.556 rows=617 loops=1)
   Index Cond: (score = 100)
 Planning Time: 0.741 ms
 Execution Time: 23.760 ms
(4 rows)

(END)
```

- 3倍くらい早くなった
- インデックスを付与すると、探索に必要な情報がインデックスにまとめられ、 実際のテーブル行全てを探索する必要はなくなるので実行速度は向上する

# セキュリティ対策

| 脆弱性                                                               | 影響 | 内容                                                              |
| -------------------------------------------------------------------- | ---- | ----------------------------------------------------------------- |
| OS コマンド・インジェクション                                        | 大   | 任意の OS のコマンドを実行できてしまう                            |
| SQL インジェクション                                                 | 大   | 任意の SQL というデータベースを操作するコマンドを実行できてしまう |
| ディレクトリ・トラバーサル	大	任意のファイルを閲覧、操作できてしまう |
| セッションハイジャック                                               | 大   | 利用者のセッションが乗っ取られてしまう                            |
| クロスサイト・スクリプティング (XSS)                                 | 中   | スクリプトにより Web サイトの改ざんができてしまう                 |
| クロスサイト・リクエストフォージェリ (CSRF)                          | 中   | 利用者の意図しない操作がされてしまう                              |
| HTTP ヘッダインジェクション                                          | 中   | 偽ページの表示などができてしまう                                  |
| クリックジャッキング                                                 | 小   | 利用者の意図しないクリックをしてしまう                            |