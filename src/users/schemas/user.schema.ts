import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = HydratedDocument<User>;

@Schema() //schema of user for mongoose, @prop defines schema properties
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;
  
  @Prop({required: true, minlength: 6})
  password: string;

  @Prop( {default: Date.now })
  createdAt: Date;
  
}

//middleware for encrypt password with bcrypt before inserting on DB
const UserSchema = SchemaFactory.createForClass(User);

async function encryptPassword(next) { 
  if (!this.isModified('password')) { //if password has not modified skip unnecesary encryption
    return next();
  }
  try {
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(this.get('password'), saltOrRounds); //hash password with 10 rounds
    this.set('password', hash);
    next();
  } 
  catch (error) {
    next(error);
  }
}

UserSchema.pre('save', encryptPassword); //executes password encryption before saving document

export { UserSchema };