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
  private email: string;
  private password: string;
  private session: string;

  private loginApiCall: Promise<LoginData>;

  constructor({ email, password }: ApiConstructor) {
    this.email = email;
    this.password = password;
  }

  private async getSessionId() {
    if (!this.session) {
      const loginData = await this.login();
      this.session = loginData.session;
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

  private async login() {
    this.loginApiCall =
      this.loginApiCall ||
      this.makeApiCall<LoginData>('login', {
        email: this.email,
        password: this.password
      });
    return this.loginApiCall;
  }

  private async logout() {
    return this.makeApiCall<ApiResponseBase>('logout', {
      session: await this.getSessionId()
    });
  }

  public async getMyAccounts() {
    return this.makeApiCall<MyAccounts>('get-my-accounts', {
      session: await this.getSessionId()
    });
  }

  public async getWatchedAccounts() {
    return this.makeApiCall<WatchedAccounts>('get-watched-accounts', {
      session: await this.getSessionId()
    });
  }

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
  .getCommunityOutlook()
  .then(data => console.log(data))
  .catch(err => console.log(err));

// private async apiLogin() {
//   const loginUrl = `${API_ROOT_URL}/login.json?email=${this.login}&password=${this.password}`;

//   const response = await fetch(loginUrl, { method: 'post' });
//   const textResponse = await response.text();

//   let parsedData: LoginData;

//   try {
//     parsedData = JSON.parse(textResponse);

//     parsedData = {
//       error: false,
//       message: '',
//       session: this.session
//     };

//   } catch (error) {
//     const loginErrorMessage = `Login error. Error body: ${JSON.stringify(
//       error
//     )}. Original response: ${textResponse}`;

//     parsedData = {
//       error: true,
//       message: loginErrorMessage,
//       session: ''
//     };
//   }

//   return parsedData;
// }

// interface ApiConstructor {
//   login: string;
//   password: string;
// }

// interface OutlookData {
//   error: boolean;
//   message: string;
//   symbols?: Symbol[];
//   general?: General;
// }

// export default class OutlookApi {
//   private login: string;
//   private password: string;
//   private session: string;

//   constructor({ login, password }: ApiConstructor) {
//     this.login = login;
//     this.password = password;
//     this.session = '';
//   }

//   public async getOutlookData(): Promise<OutlookData> {
//     const { error: loginDataError, message, session } = await this.getLoginData();

//     if (loginDataError || !session) {
//       return {
//         error: true,
//         message: message
//       };
//     }

//     const outlookUrl = `${API_ROOT_URL}/get-community-outlook.json?session=${session}`;

//     const response = await fetch(outlookUrl, { method: 'post' });

//     const textResponse = await response.text();

//     let parsedData: OutlookData;

//     try {
//       parsedData = JSON.parse(textResponse);
//     } catch (error) {
//       const outlookErrorMessage = `Get outlook data error. Error body: ${JSON.stringify(
//         error
//       )}. Original response: ${textResponse}`;

//       parsedData = {
//         error: true,
//         message: outlookErrorMessage
//       };
//     }

//     return parsedData;
//   }

// }
// }
