"use strict";
var bcrypt = require("bcrypt");
exports.seed = function (knex) {
    // Deletes ALL existing entries
    return knex('users').del()
        .then(function () {
        // Inserts seed entries
        return knex('users').insert([
            {
                id: 1,
                username: 'test1',
                password: bcrypt.hashSync('pass1', 14),
                admin: 1,
                host: 'test_host_1',
                cert: '6969696969696969696969696969696969696969696969696969696969696969696969',
                macaroon: '6969696969696969696969696969696969696969696969696969696969696969696969',
                pubkey: '6969696969696969696969696969696969696969696969696969696969696969696969'
            },
            {
                id: 2,
                username: 'test2',
                password: bcrypt.hashSync('pass2', 14),
                host: 'test_host_2',
                cert: '420420420420420420420420420420420420420420420420420420420420420420420420420',
                macaroon: '420420420420420420420420420420420420420420420420420420420420420420420420420',
                pubkey: '420420420420420420420420420420420420420420420420420420420420420420420420420'
            },
        ]);
    });
};
