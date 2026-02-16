

export interface SaleRow {
  created_at: string;
  amount: number;
}

export interface DailySale {
  day: string;
  amount: number;
  percent: number;
}

// types/auth.ts
export interface JwtPayload {
  userId: string;
  email?: string;
  // otros campos según tu token
}

// Para extender el objeto Request de Express
declare global {
  namespace express {
    interface Request {
      user?: JwtPayload;
    }
  }
}
