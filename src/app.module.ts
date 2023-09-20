import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { FlashcardModule } from './flashcard/flashcard.module';

@Module({
  imports: [AuthModule, FlashcardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
