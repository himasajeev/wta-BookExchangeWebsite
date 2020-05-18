const {QueryTypes} = require('sequelize');
const express = require("express");
const db = require("../models");

async function FindBookByName(bookname) {
    await db.sequelize.query(
        'SELECT * FROM book WHERE bookname LIKE :search_name',
        {
            replacements: {search_name: '%' + bookname + '%'},
            type: QueryTypes.SELECT
        }
    ).then(books => {
        console.log(books)
        return books
    })

}

async function FindBookByAuthor(author) {
    await db.sequelize.query(
        'SELECT * FROM book WHERE author LIKE :search_name',
        {
            replacements: {search_name: '%' + author + '%'},
            type: QueryTypes.SELECT
        }
    ).then(books => {
        console.log(books)
        return books
    })
}


async function FindBookBySub(sub) {
    await db.sequelize.query(
        'SELECT * FROM book WHERE subject LIKE :search_name',
        {
            replacements: {search_name: '%' + sub + '%'},
            type: QueryTypes.SELECT
        }
    ).then(books => {
        console.log(books)
        return books
    })
}

async function BooksOfUser(userid) {
    await db.sequelize.query(
        'SELECT * FROM book WHERE id IN (SELECT bookId from book_belongs_to where UserId=?)',
        {
            replacements: [userid],
            type: QueryTypes.SELECT
        }
    ).then(books => {
        console.log(books)
        return books
    })
}

module.exports = {FindBookByAuthor, FindBookByName, FindBookBySub, BooksOfUser}