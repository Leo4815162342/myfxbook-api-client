import fetch from 'node-fetch';

import querystring from 'querystring';

const API_ROOT_URL = 'https://www.myfxbook.com/api';

interface ApiConstructor {
  email: string;
  password: string;
}

interface ApiResponseBase {
  error: boolean;
  message: string;
}

interface LoginData extends ApiResponseBase {
  session: string;
}

interface OutlookData extends ApiResponseBase {
  symbols: OutlookSymbol[];
  general: OutlookGeneral;
}

interface MyAccounts extends ApiResponseBase {
  accounts: Account[];
}

interface WatchedAccounts extends ApiResponseBase {
  accounts: WatchedAccount[];
}

interface OpenOrders extends ApiResponseBase {
  accounts: OpenOrder[];
}

interface OpenTrades extends ApiResponseBase {
  accounts: Trade[];
}

interface TradeHistory extends ApiResponseBase {
  history: Trade[];
}

interface DailyGain extends ApiResponseBase {
  dailyGain: DayGain[];
}

interface Gain extends ApiResponseBase {
  value: number;
}

interface DayGain {
  date: string;
  value: number;
  profit: number;
}

interface Trade extends OpenOrder {
  profit: number;
  pips: number;
  swap: number;
  magic: number;
}

interface OpenOrder {
  openTime: string;
  symbol: string;
  action: string;
  sizing: { type: string; value: string };
  openPrice: number;
  tp: number;
  sl: number;
  comment: string;
}

interface Account {
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

interface WatchedAccount {
  name: string;
  gain: number;
  drawdown: number;
  demo: boolean;
  change: number;
}

interface OutlookSymbol {
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

interface OutlookGeneral {
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

class MyfxbookApi {
  private readonly email: string;
  private readonly password: string;
  private session: string;

  private getLoginDataPromise: Promise<LoginData>;

  constructor({ email, password }: ApiConstructor) {
    this.email = email;
    this.password = password;
  }

  /** Get session id (cached value is returned upon subsequent or parallel requests)*/
  private async getSessionId() {
    if (!this.session) {
      this.getLoginDataPromise = this.getLoginDataPromise || this.login();

      const loginData = await this.getLoginDataPromise;

      this.session = this.session || loginData.session;
    }

    return this.session;
  }

  private async makeApiCall<T extends ApiResponseBase>(
    endpoint: string,
    params: { [key: string]: string }
  ): Promise<T> {
    const url = `${API_ROOT_URL}/${endpoint}.json?${querystring.stringify(params)}`;

    const rawResponse = await fetch(url, { method: 'post' });
    const textResponse = await rawResponse.text();

    let isError = false;
    let erroMessage = '';
    let parsedData: T;

    try {
      parsedData = JSON.parse(textResponse);

      if (parsedData.error) {
        isError = true;
        erroMessage = parsedData.message;
      }
    } catch (error) {
      const errText = `${endpoint} error: ${JSON.stringify(error)}`;
      const originalResponse = `Original response: ${JSON.stringify(textResponse)}`;

      isError = true;
      erroMessage = `${errText}. ${originalResponse}`;
    }

    if (isError) {
      throw new Error(erroMessage);
    }

    return parsedData;
  }

  /**
   * Fetches login data object
   */
  private async login() {
    console.log('START LOGIN CALL');
    return this.makeApiCall<LoginData>('login', {
      email: this.email,
      password: this.password
    });
  }

  /**
   * Logs out from current session
   */
  private async logout() {
    return this.makeApiCall<ApiResponseBase>('logout', {
      session: await this.getSessionId()
    });
  }

  /**
   * Get list of all accounts
   */
  public async getMyAccounts() {
    return this.makeApiCall<MyAccounts>('get-my-accounts', {
      session: await this.getSessionId()
    });
  }

  /**
   * Get list of all watched accounts
   */
  public async getWatchedAccounts() {
    return this.makeApiCall<WatchedAccounts>('get-watched-accounts', {
      session: await this.getSessionId()
    });
  }

  /**
   * Get all open orders for a given account
   * @param id identifier of a trading account
   */
  public async getOpenOrders(id: number) {
    return this.makeApiCall<OpenOrders>('get-open-orders', {
      session: await this.getSessionId(),
      id: String(id)
    });
  }

  /**
   * Get all open trades for a given account
   * @param id identifier of a trading account
   */
  public async getOpenTrades(id: number) {
    return this.makeApiCall<OpenTrades>('get-open-trades', {
      session: await this.getSessionId(),
      id: String(id)
    });
  }

  /**
   * Get history of all trades for a given account
   * @param id identifier of a trading account
   */
  public async getHistory(id: number) {
    return this.makeApiCall<TradeHistory>('get-history', {
      session: await this.getSessionId(),
      id: String(id)
    });
  }

  /**
   * Get daily breakdown of all gains for a given account within time range
   * @param id identifier of a trading account
   * @param start start date, format : yyyy-MM-dd
   * @param end end date, format : yyyy-MM-dd
   */
  public async getDailyGain(id: number, start: string, end: string) {
    return this.makeApiCall<DailyGain>('get-daily-gain', {
      session: await this.getSessionId(),
      id: String(id),
      start,
      end
    });
  }

  /**
   * Get total gain for a given account within time range
   * @param id identifier of a trading account
   * @param start start date, format : yyyy-MM-dd
   * @param end end date, format : yyyy-MM-dd
   */
  public async getGain(id: number, start: string, end: string) {
    return this.makeApiCall<Gain>('get-gain', {
      session: await this.getSessionId(),
      id: String(id),
      start,
      end
    });
  }

  /** Get Myfxbook Community Outlook data */
  public async getCommunityOutlook() {
    return this.makeApiCall<OutlookData>('get-community-outlook', {
      session: await this.getSessionId()
    });
  }
}

export default MyfxbookApi;

const myfx = new MyfxbookApi({
  email: '',
  password: ''
});

myfx
  .getGain(1018059, '2014-08-19', '2014-08-20')
  .then(data => console.log(JSON.stringify(data)))
  .catch(err => console.log(err));
