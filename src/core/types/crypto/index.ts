
export interface Crypto {
  hash: (text: string) => string
  uuid: () => string
}
