import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Req,
  Body,
  Param,
  Res,
  Query,
} from '@nestjs/common';
import { CallsService } from './calls.service';
import { Response } from 'express';

@Controller('calls')
export class CallsController {
  constructor(private callsService: CallsService) {}

  @Post()
  async addCall(@Body() req) {
    console.log(req);
    return this.callsService.createCall(req);
  }

  @Get()
  getCalls(@Query() query) {
    if (query.raw === 'true') {
      return this.callsService.findRawCalls();
    }
    return this.callsService.findAllCalls();
  }

  @Get('infos/:id')
  async getCallInfos(@Param('id') id: string, @Res() res: Response) {
    this.callsService.getCallInfos(id).subscribe((coinInfo) => {
      res.send(coinInfo);
    });
  }

  @Patch()
  async updateCall(@Body() body) {
    return await this.callsService.updateCall(body);
  }

  @Delete(':id')
  async deleteCall(@Param('id') id) {
    return await this.callsService.deleteCall(id);
  }
}
