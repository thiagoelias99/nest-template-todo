import { ApiProperty } from '@nestjs/swagger'
import { Exclude } from 'class-transformer'

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
}