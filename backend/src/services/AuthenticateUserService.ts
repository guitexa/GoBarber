import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../config/auth';
import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

export default class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const sessionRepository = getRepository(User);

    const user = await sessionRepository.findOne({
      where: { email },
    });

    if (!user) {
      throw new AppError('Email or Password not valid', 401);
    }

    const checkPassword = await compare(password, user.password);

    if (!checkPassword) {
      throw new AppError('Email or Password not valid', 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id,
      expiresIn,
    });

    return {
      user,
      token,
    };
  }
}
