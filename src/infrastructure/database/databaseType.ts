export interface IDatabase {
  connect: (MONGO_URI: string) => Promise<void>
}
