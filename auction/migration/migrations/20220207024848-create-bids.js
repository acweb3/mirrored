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
	db.createTable('bids', {
		id: {
			type: 'string',
			primaryKey: true,
		},
		amount: { type: 'decimal', notNull: true },
		painting_id: {
			type: 'string',
			notNull: true,
			foreignKey: {
				name: 'bids_painting_id_fk',
				table: 'paintings',
				rules: {
					onDelete: 'CASCADE',
					onUpdate: 'RESTRICT',
				},
				mapping: {
					painting_id: 'id',
				},
			},
		},
		owner_address: 'string',
		timestamp: { type: 'timestamp' },
	});

	return null;
};

exports.down = function (db) {
	db.dropTable('bids');

	return null;
};

exports._meta = {
	version: 1,
};
