require('dotenv/config');

const devConfig = [
  {
    name: 'default',
    type: 'postgres',
    host: '192.168.99.100',
    port: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'gostack_gobarber',
    entities: ['./src/modules/**/infra/typeorm/entities/*.ts'],
    migrations: ['./src/shared/infra/typeorm/migrations/*.ts'],
    cli: {
      migrationsDir: './src/shared/infra/typeorm/migrations',
    },
  },
  {
    name: 'mongo',
    type: 'mongodb',
    host: '192.168.99.100',
    port: 27017,
    database: 'gostack_gobarber',
    useUnifiedTopology: true,
    entities: ['./src/modules/**/infra/typeorm/schemas/*.ts'],
  },
];

const prodConfig = [
  {
    name: 'default',
    type: 'postgres',
    host: '192.168.99.100',
    port: 5432,
    username: 'postgres',
    password: 'docker',
    database: 'gostack_gobarber',
    entities: ['./dist/modules/**/infra/typeorm/entities/*.js'],
    migrations: ['./dist/shared/infra/typeorm/migrations/*.js'],
    cli: {
      migrationsDir: './dist/shared/infra/typeorm/migrations',
    },
  },
  {
    name: 'mongo',
    type: 'mongodb',
    host: '192.168.99.100',
    port: 27017,
    database: 'gostack_gobarber',
    useUnifiedTopology: true,
    entities: ['./dist/modules/**/infra/typeorm/schemas/*.js'],
  },
];

module.exports =
  process.env.NODE_ENV === 'development' ? devConfig : prodConfig;
