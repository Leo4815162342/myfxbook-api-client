export interface ApiConstructor {
  email: string;
  password: string;
}

export interface ApiResponseBase {
  error: boolean;
  message: string;
}

export interface LoginData extends ApiResponseBase {
  session: string;
}

export interface OutlookData extends ApiResponseBase {
  symbols: OutlookSymbol[];
  general: OutlookGeneral;
}

export interface MyAccounts extends ApiResponseBase {
  accounts: TradingAccount[];
}

export interface WatchedAccounts extends ApiResponseBase {
  accounts: WatchedAccount[];
}

export interface OpenOrders extends ApiResponseBase {
  accounts: OpenOrder[];
}

export interface OpenTrades extends ApiResponseBase {
  accounts: Trade[];
}

export interface TradeHistory extends ApiResponseBase {
  history: Trade[];
}

export interface DailyGain extends ApiResponseBase {
  dailyGain: DayGain[];
}

export interface Gain extends ApiResponseBase {
  value: number;
}

export interface DayGain {
  date: string;
  value: number;
  profit: number;
}

export interface Trade extends OpenOrder {
  profit: number;
  pips: number;
  swap: number;
  magic: number;
}

export interface OpenOrder {
  openTime: string;
  symbol: string;
  action: string;
  sizing: { type: string; value: string };
  openPrice: number;
  tp: number;
  sl: number;
  comment: string;
}

export interface TradingAccount {
  id: number;
  name: string;
  description: string;
  accountId: number;
  gain: number;
  absGain: number;
  daily: number;
  monthly: number;
  withdrawals: number;
  deposits: number;
  interest: number;
  profit: number;
  balance: number;
  drawdown: number;
  equity: number;
  equityPercent: number;
  demo: boolean;
  lastUpdateDate: string;
  creationDate: string;
  firstTradeDate: string;
  tracking: number;
  views: number;
  commission: number;
  currency: string;
  profitFactor: number;
  pips: number;
  invitationUrl: string;
  server: {
    name: string;
  };
}

export interface WatchedAccount {
  name: string;
  gain: number;
  drawdown: number;
  demo: boolean;
  change: number;
}

export interface OutlookSymbol {
  name: string;
  shortPercentage: number;
  longPercentage: number;
  shortVolume: number;
  longVolume: number;
  longPositions: number;
  shortPositions: number;
  totalPositions: number;
  avgShortPrice: number;
  avgLongPrice: number;
}

export interface OutlookGeneral {
  demoAccountsPercentage: number;
  realAccountsPercentage: number;
  profitablePercentage: number;
  nonProfitablePercentage: number;
  fundsWon: string;
  fundsLost: string;
  averageDeposit: string;
  averageAccountProfit: string;
  averageAccountLoss: string;
  totalFunds: string;
}