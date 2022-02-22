'use strict';

var dbm;
var type;
var seed;

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
	db.createTable('paintings', {
		id: {
			type: 'string',
			primaryKey: true,
		},
		name: {
			type: 'string',
			notNull: true,
		},
		description: {
			type: 'string',
			notNull: true,
		},
		token_id: {
			type: 'int',
			notNull: true,
		},
		start: { type: 'string' },
	});

	return null;
};

exports.down = function (db) {
	db.dropTable('paintings');

	return null;
};

exports._meta = {
	version: 1,
};
