import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  idTG: string;

  @Prop()
  pseudo: string;

  @Prop()
  isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);

export interface CreateUserDto {
  idTG: string;
  pseudo: string;
  isAdmin: boolean;
}
