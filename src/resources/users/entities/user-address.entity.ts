export class UserAddress {
  constructor(
    public country: string,
    public createdAt: Date,
    public updatedAt: Date
  ) { }
  city?: string
  state?: string
}