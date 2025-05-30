import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './database/database.module';
import { UsersModule } from './modules/users/users.module';
import { ProfilesModule } from './modules/profiles/profiles.module';
import { BooksModule } from './modules/books/books.module';
import { AuthorsModule } from './modules/authors/authors.module';
import { BookReviewModule } from './modules/book-review/book-review.module';
import { CategoryModule } from './modules/category/category.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    DatabaseModule,
    UsersModule,
    ProfilesModule,
    BooksModule,
    AuthorsModule,
    BookReviewModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
