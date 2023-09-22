import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  CreateAttributeRequest,
  CreateAttributeResponse,
  CreateFlashcardRequest,
  CreateFlashcardResponse,
  FLASHCARD_SERVICE_NAME,
  FindAllArgsRequest,
  FindAllResponse,
  FindOneRequest,
  FindOneResponse,
  FlashcardServiceClient,
  GetShareLinkResponse,
  UpdateFlashcardRequest,
  UpdateFlashcardResponse,
} from './flashcard.pb';
import { ClientGrpc } from '@nestjs/microservices';
import { AuthGuard } from 'src/auth/auth.guard';
import { Observable } from 'rxjs';
import { UserId } from 'src/auth/user.decorator';

@Controller('flashcard')
@UseGuards(AuthGuard)
export class FlashcardController implements OnModuleInit {
  private svc: FlashcardServiceClient;
  @Inject(FLASHCARD_SERVICE_NAME)
  private readonly client: ClientGrpc;

  onModuleInit() {
    this.svc = this.client.getService<FlashcardServiceClient>(
      FLASHCARD_SERVICE_NAME,
    );
  }

  @Post()
  private async createFlashcard(
    @Body() body: CreateFlashcardRequest,
    @UserId() userId: string,
  ): Promise<Observable<CreateFlashcardResponse>> {
    body.userId = userId;
    return this.svc.createFlashcard(body);
  }

  @Get(':id')
  private async findOne(
    @Param('id' /** place some Mongoose.ObjectId validator here */) id: string,
  ): Promise<Observable<FindOneResponse>> {
    return this.svc.findOne({
      id,
    });
  }

  @Get()
  private async findAll(
    @Body() body: FindAllArgsRequest,
  ): Promise<Observable<FindAllResponse>> {
    return this.svc.findAll(body);
  }

  @Patch(':id')
  private async updateFlashcard(
    @Param('id' /** place some Mongoose.ObjectId validator here */) id: string,
    @Body() body: UpdateFlashcardRequest,
  ): Promise<Observable<UpdateFlashcardResponse>> {
    this.svc.findOne({ id });
    body.id = id;
    return this.svc.updateFlashcard(body);
  }

  @Delete(':id')
  private async deleteFlashcard(
    @Param('id' /** place some Mongoose.ObjectId validator here */) id: string,
    @Body() body: FindOneRequest,
  ): Promise<Observable<UpdateFlashcardResponse>> {
    this.svc.findOne({ id });
    body.id = id;
    return this.svc.deleteFlashcard(body);
  }

  @Get('share/link')
  private async getShareLink(@UserId() userId: string): Promise<Observable<GetShareLinkResponse>> {
    return this.svc.getShareLink({ userId });
  }

  @Get('view-shared/:token')
  private async viewFromShareLink(@Param('token') token: string): Promise<Observable<FindAllResponse>> {
    return this.svc.viewFromShareLink({ token });
  }

  @Post('/:id/attribute')
  private async createAttribute(@Body() body: CreateAttributeRequest): Promise<Observable<CreateAttributeResponse>> {
    return this.svc.createAttribute(body);
  }

  @Patch('/:id/review')
  private async reviewFlashcard(@Body() body: UpdateFlashcardRequest): Promise<Observable<UpdateFlashcardResponse>> {
    return this.svc.reviewFlashcard(body);
  }

}
