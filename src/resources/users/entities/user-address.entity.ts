import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'
import { randomUUID } from 'node:crypto'

export class UserAddress {
  @ApiProperty({ example: 'Brazil' }) country: string
  @ApiProperty({ example: 'São José dos Campos' }) city: string
  @ApiProperty({ example: 'São Paulo' }) state: string
  @Exclude() createdAt: Date
  @Exclude() updatedAt: Date
  @Exclude() id: string

  constructor(data: UserAddress) {
    Object.assign(this, data)
  }

  public static mock(): UserAddress {
    const data = {
      country: 'Brazil',
      city: 'São José dos Campos',
      state: 'São Paulo',
      createdAt: new Date('2021-05-09T17:57:34.000Z'),
      updatedAt: new Date('2021-05-09T17:57:34.000Z'),
      id: randomUUID()
    }
    return data as UserAddress
  }
}