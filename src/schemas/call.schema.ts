import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type CallDocument = Call & Document;

@Schema()
export class Call {
  @Prop() author: string;
  @Prop() id: string;
  @Prop() name: string;
  @Prop() symbol: string;
  @Prop() why: string;

  @Prop(
    raw({
      ethereum: { type: String },
    }),
  )
  platforms: any;

  @Prop() callPrice: number;
  @Prop() callDate: string;
  @Prop() GeckoURL: string;
  @Prop() running: boolean;
  @Prop() closedDate: string;
  @Prop() closedPrice: number;
}

export const CallSchema = SchemaFactory.createForClass(Call);

export interface CreateCallDto {
  author: string;
  id: string;
  name: string;
  symbol: string;
  why: string;
  platforms: {
    ethereum: string;
  };
  callPrice: number;
  callDate: string;
  GeckoURL: string;
}
