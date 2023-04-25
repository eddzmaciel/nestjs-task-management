import { Module } from '@nestjs/common';

import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [],
      inject: [],
      useFactory: async () => {
        return {
          uri: 'mongodb://localhost:27017/db_tasks?retryWrites=true&w=majority',
          //   user: '******',
          //   pass: '******',
          useNewUrlParser: true,
          useUnifiedTopology: true,
        };
      },
    }),
  ],
  exports: [MongooseModule],
})
export class MongodbModule {}
