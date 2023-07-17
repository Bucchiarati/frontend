exports.up = (pgm) => {
    pgm.createTable('reservations', {
        id: 'id',
        name: {
            type: 'varchar(50)',
            notNull: true,
        },
        surname: {
            type: 'varchar(50)',
            notNull: true,
        },
        documentType: {
            type: 'varchar(50)',
            notNull: true,
        },
        documentNumber: {
            type: 'int',
            notNull: true,
        },
        email: {
            type: 'varchar(50)',
            notNull: true,
        },
        date: {
            type: 'date',
            notNull: true,
        },
        type: {
            type: 'varchar(50)',
            notNull: true,
        },
        quantity: {
            type: 'int',
            notNull: true,
        },
        description: {
            type: 'varchar(50)',
            notNull: true,
        },
        created_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
        updated_at: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    });

}

exports.down = (pgm) => {
    pgm.dropTable('users');
    pgm.dropTable('reservations');
}
