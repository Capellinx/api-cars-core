
export interface TokenService {
   generateToken(payload: Record<string, any>): Promise<string>
}