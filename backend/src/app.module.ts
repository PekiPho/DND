import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoomModule } from './room/room.module';
import { CharacterModule } from './character/character.module';
import { TokenModule } from './token/token.module';
import { MapModule } from './map/map.module';
import { ChatModule } from './chat/chat.module';
import { SpellModule } from './spell/spell.module';
import { UserModule } from './user/user.module';
import { ItemModule } from './item/item.module';
import { CombatTrackerModule } from './combat-tracker/combat-tracker.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'dnd_mysql_db',
      port: 3306,
      username: process.env.MYSQL_USER,
      password: process.env.MYSQL_PASSWORD,
      database: process.env.MYSQL_DATABASE,
      autoLoadEntities: true,
      synchronize: true

    }),
    RoomModule,
    CharacterModule,
    TokenModule,
    MapModule,
    ChatModule,
    SpellModule,
    UserModule,
    ItemModule,
    CombatTrackerModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
