import React from 'react'

import * as SQLite from "expo-sqlite"

const db = SQLite.openDatabase('chat.db')

const deleteConversation = async (conv_id) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
          tx.executeSql('delete from messages where conv_id = ?', [conv_id])
      },
      (t, error) => { console.log("error delete conservation"); console.log(error); reject(error) },
      (_t, success) => { console.log("deleted conservation"); resolve(success)}
    )
  })
}

const getMessages = async (conv_id,setMessagesFunc) => {
  return new Promise((resolve, reject) => {
    db.transaction(
      tx => {
        tx.executeSql(
          // 'SELECT * FROM messages ORDER BY createdAt ASC',
          'SELECT * FROM messages where conv_id = ?', [conv_id],
          (_, { rows: { _array } }) => {
            _array.forEach(item => {
              item.user = JSON.parse(item.user_str);
              delete item.user_str;
            });
            setMessagesFunc(_array);
            // console.log(_array);
          }
        );
      },
      (t, error) => { console.log("db error load messages"); console.log(error);reject(error) },
      (_t, success) => { console.log("loaded messages"); resolve(success)}
    )
  })
}

const dropDatabaseTablesAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'drop table messages',
        [],
        (_, result) => { resolve(result) },
        (_, error) => { console.log("error dropping users table"); reject(error)
        }
      )
    })
  })
}

const setupDatabaseAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(tx => {
        tx.executeSql(
          // 'create table if not exists users (id integer primary key not null, name text);'
          // 'create table if not exists messages  (_id integer primary key not null);'
          'create table if not exists messages  (_id integer primary key not null, conv_id integer, createdAt text,text text,type text, image text, video text, audio text,is_sender integer, user_str text);'
          );
      },
      (_, error) => { console.log("db error creating tables"); console.log(error); reject(error) },
      (_, success) => { console.log('creating tables success'); resolve(success)}
    )
  })
}

const insertMessages = (msgArray,conv_id) => {
    // db.transaction(function (tx) {
        for(let i=0;i<msgArray.length;i++){
            insertOneMessage(msgArray[i],conv_id);
        }
    // });
}

const insertOneMessage = (msg,conv_id) => {
    const save_msg = Object.assign({}, msg);
    save_msg.conv_id = conv_id;
    save_msg.user_str = JSON.stringify(save_msg.user);
    save_msg.createdAt = save_msg.createdAt.toString();
    delete save_msg.user;
    delete save_msg.createdAt;

    const cols = Object.keys(save_msg).join(", ");
    const placeholders = Object.keys(save_msg).fill('?').join(", ");
    db.transaction( tx => {
        tx.executeSql('INSERT INTO messages (' + cols + ') VALUES (' + placeholders + ')', Object.values(save_msg) );
      },
      (t, error) => { console.log("db error insertMessage"); console.log(t,error);},
    )
}



export const chatDatabase = {
  deleteConversation,
  insertMessages,
  getMessages,
  setupDatabaseAsync,
  dropDatabaseTablesAsync,
}