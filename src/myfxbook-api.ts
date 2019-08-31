import fetch from 'node-fetch';
import querystring from 'querystring';
import * as Myfxbook from './myfxbook-api.interfaces';

const API_ROOT_URL = 'https://www.myfxbook.com/api';

class MyfxbookApi {
  private readonly email: string;
  private readonly password: string;
  private session: string;

  private getLoginDataPromise: Promise<Myfxbook.LoginData>;

  constructor({ email, password }: Myfxbook.ApiConstructor) {
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

  private async makeApiCall<T extends Myfxbook.ApiResponseBase>(
    endpoint: string,
    params: { [key: string]: string }
  ): Promise<T> {
    const url = `${API_ROOT_URL}/${endpoint}.json?${querystring.stringify(params)}`;

    const rawResponse = await fetch(url, { method: 'post' });
    const textResponse = await rawResponse.text();

    let isError = false;
    let errorMessage = '';
    let parsedData: T;

    try {
      parsedData = JSON.parse(textResponse);

      if (parsedData.error) {
        isError = true;
        errorMessage = parsedData.message;
      }
    } catch (error) {
      const errText = `${endpoint} error: ${JSON.stringify(error)}`;
      const originalResponse = `Original response: ${JSON.stringify(textResponse)}`;

      isError = true;
      errorMessage = `${errText}. ${originalResponse}`;
    }

    if (isError) {
      throw new Error(errorMessage);
    }

    return parsedData;
  }

  /**
   * Fetches login data object
   */
  private async login() {
    return this.makeApiCall<Myfxbook.LoginData>('login', {
      email: this.email,
      password: this.password
    });
  }

  /**
   * Logs out from current session
   */
  private async logout() {
    return this.makeApiCall<Myfxbook.ApiResponseBase>('logout', {
      session: await this.getSessionId()
    });
  }

  /**
   * Get list of all accounts
   */
  public async getMyAccounts() {
    return this.makeApiCall<Myfxbook.MyAccounts>('get-my-accounts', {
      session: await this.getSessionId()
    });
  }

  /**
   * Get list of all watched accounts
   */
  public async getWatchedAccounts() {
    return this.makeApiCall<Myfxbook.WatchedAccounts>('get-watched-accounts', {
      session: await this.getSessionId()
    });
  }

  /**
   * Get all open orders for a given account
   * @param id id of a trading account
   */
  public async getOpenOrders(id: number | string) {
    return this.makeApiCall<Myfxbook.OpenOrders>('get-open-orders', {
      session: await this.getSessionId(),
      id: String(id)
    });
  }

  /**
   * Get all open trades for a given account
   * @param id id of a trading account
   */
  public async getOpenTrades(id: number | string) {
    return this.makeApiCall<Myfxbook.OpenTrades>('get-open-trades', {
      session: await this.getSessionId(),
      id: String(id)
    });
  }

  /**
   * Get history of all trades for a given account
   * @param id id of a trading account
   */
  public async getHistory(id: number | string) {
    return this.makeApiCall<Myfxbook.TradeHistory>('get-history', {
      session: await this.getSessionId(),
      id: String(id)
    });
  }

  /**
   * Get daily breakdown of all gains for a given account within time range
   * @param id id of a trading account
   * @param start start date, format : yyyy-MM-dd
   * @param end end date, format : yyyy-MM-dd
   */
  public async getDailyGain(id: number | string, start: string, end: string) {
    return this.makeApiCall<Myfxbook.DailyGain>('get-daily-gain', {
      session: await this.getSessionId(),
      id: String(id),
      start,
      end
    });
  }

  /**
   * Get total gain for a given account within time range
   * @param id id of a trading account
   * @param start start date, format : yyyy-MM-dd
   * @param end end date, format : yyyy-MM-dd
   */
  public async getGain(id: number | string, start: string, end: string) {
    return this.makeApiCall<Myfxbook.Gain>('get-gain', {
      session: await this.getSessionId(),
      id: String(id),
      start,
      end
    });
  }

  /** Get Myfxbook Community Outlook data */
  public async getCommunityOutlook() {
    return this.makeApiCall<Myfxbook.OutlookData>('get-community-outlook', {
      session: await this.getSessionId()
    });
  }

  /**
   * Get community outlook data broken down by a country for provided symbol
   * @param symbol a trading instrument (currency pair)
   */
  public async getCommunityOutlookByCountry(symbol: string) {
    return this.makeApiCall<Myfxbook.OutlookDataByCountry>('get-community-outlook-by-country', {
      session: await this.getSessionId(),
      symbol
    });
  }

  /**
   * Get daily breakdown of all account data within time range
   * @param id id of a trading account
   * @param start start date, format : yyyy-MM-dd
   * @param end end date, format : yyyy-MM-dd
   */
  public async getDailyData(id: number | string, start: string, end: string) {
    return this.makeApiCall<Myfxbook.DailyData>('get-data-daily', {
      session: await this.getSessionId(),
      id: String(id),
      start,
      end
    });
  }
}

export default MyfxbookApi;
