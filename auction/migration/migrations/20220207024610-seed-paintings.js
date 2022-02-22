'use strict';
const { v4: uuid } = require('uuid');

var dbm;
var type;
var seed;

const collabs = [
	'Brian T.',
	'Casara',
	'Chad',
	'Courtney W.',
	'Emillie',
	'Eric',
	'Jakob',
	'James',
	'Jenna',
	'Jess',
	'Joelle',
	'Jonny',
	'Justin S.',
	'Kara',
	'Kris',
	'KRL',
	'Lori G.',
	'Rach Stewart',
	'Ryan N.',
	'Weatherby',
];

/**
 * We receive the dbmigrate dependency from dbmigrate initially.
 * This enables us to not have to rely on NODE_PATH.
 */
exports.setup = function (options, seedLink) {
	dbm = options.dbmigrate;
	type = dbm.dataType;
	seed = seedLink;
};

exports.up = function (db) {
	collabs.forEach((collab, i) => {
		db.insert(
			'paintings',
			['id', 'name', 'description', 'token_id'],
			[
				uuid(),
				`Reflection: Cody Mayer X ${collab}`,
				'Welcome to Mirrored, a world of never ending sunsets and sunrises to get lost in. Mint your own endless sky below and enjoy your stay 🤍.',
				i,
				// new Date(),
			]
		);
	});

	return null;
};

exports.down = function (db) {
	return null;
};

exports._meta = {
	version: 1,
};
