import { Module } from '@nestjs/common';
import { FlashcardController } from './flashcard.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { FLASHCARD_PACKAGE_NAME, FLASHCARD_SERVICE_NAME } from './flashcard.pb';

@Module({
  imports: [
    ClientsModule.register([{
      name: FLASHCARD_SERVICE_NAME,
      transport: Transport.GRPC,
      options: {
        url: '0.0.0.0:50052',
        'package': FLASHCARD_PACKAGE_NAME,
        protoPath: 'node_modules/soora-sr-proto/proto/flashcard.proto'
      }
    }])
  ],
  controllers: [FlashcardController]
})
export class FlashcardModule { }
