import { HttpModule, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Call, CallSchema } from '../schemas/call.schema';
import { CallsService } from './calls.service';
import { CallsController } from './calls.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Call.name, schema: CallSchema }]),
    HttpModule,
  ],
  providers: [CallsService],
  controllers: [CallsController],
})
export class CallsModule {}
