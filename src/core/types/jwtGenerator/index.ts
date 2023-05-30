export interface PayloadJwt {
  id: string
}

export interface JwtGenerator {
  create: (payload: PayloadJwt) => string
}
