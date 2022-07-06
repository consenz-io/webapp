- [Back to Main](../README.md)
- [Set Up](#set-up)
- [Run](#run)

# 1. <a id="set-up">Set Up</a>

## 1.1 ENV variables

Copy .env.example content to a new file '.env'

## 1.2. Install Packages

```
cd backend
npm install
```

## 1.3 Initialize Database

```
docker-compose up
npm run sync
```

# 2. <a id="run">Run Backend</a>

## 2.1. Start Hasura

```
docker-compose up
npm run console
```

## 2.2 Changes in Hasura

Changes in the Hasura console create new migration folders.  
Each has two files:  
_down.sql_ - for rollbacks  
_up.sql_ script that was run to make the update  
After every change - check that the necessary script appears in relevant _down.sql_,  
since this file is not always generated correctly.  
After every pull - update Hasura locally: 
```
npm run sync
```