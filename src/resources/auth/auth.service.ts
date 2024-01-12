import { Injectable, UnauthorizedException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'

import * as bcrypt from 'bcrypt'
import { AuthDto } from './auth.dto'
import { UsersService } from 'src/resources/users/users.service'

export interface JwtPayload {
  id: string,
  email: string,
  name: string
}

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) { }

  async login({ password, email }: AuthDto) {
    const user = await this.usersService.findByEmail(email)
    if (!user) throw new UnauthorizedException('Email or password invalid')

    const isValidPassword = await bcrypt.compare(password, user.password)

    if (!isValidPassword) throw new UnauthorizedException('Email or password invalid')

    //Generate JWT
    const payload: JwtPayload = {
      id: user.id,
      email: user.email,
      name: `${user.firstName} ${user.lastName}`
    }

    return { accessToken: await this.jwtService.sign(payload) }
  }
}