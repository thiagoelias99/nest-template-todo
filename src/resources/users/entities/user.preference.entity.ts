export class UserPreference {
  constructor(
    public language: string,
    public createdAt: Date,
    public updatedAt: Date
  ) { }
  theme: string
}