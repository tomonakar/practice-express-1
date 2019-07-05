#!/bin/sh
PG_USER='postgres'
DB_NAME='diary3'
GH_PAGES="https://progedu.github.io/rdb-study/"
SQL_DUMP="dump_${DB_NAME}.sql"



$SUDO dropdb --if-exists "$DB_NAME"
$SUDO createdb -T template0 "$DB_NAME"

curl -o- "${GH_PAGES}${SQL_DUMP}" | $SUDO psql "$DB_NAME"

