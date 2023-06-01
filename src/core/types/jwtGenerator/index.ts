export interface PayloadJwt {
  id: string
}
export interface JwtPayload {
  id: string
  iss?: string | undefined
  sub?: string | undefined
  aud?: string | string[] | undefined
  exp?: number | undefined
  nbf?: number | undefined
  iat?: number | undefined
  jti?: string | undefined
}

export interface JwtGenerator {
  create: (payload: PayloadJwt) => string
  decode: (token: string) => JwtPayload | null
  verify: (token: string) => unknown
}
