import fetch from 'node-fetch';

const API_ROOT = 'https://www.myfxbook.com/api';

interface ApiConstructor {
  login: string;
  password: string;
  requestHeaders?: Headers;
}

interface ApiResponseBase {
  error: boolean;
  message: string;
}

interface LoginDataResponse extends ApiResponseBase {
  session: string;
}

interface OutlookResponse extends ApiResponseBase {
  symbols?: OutlookSymbol[];
  general?: OutlookGeneral;
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
  private login: string;
  private password: string;
  private session: string = '';
  private requestHeaders: Headers;

  constructor({ login, password, requestHeaders }: ApiConstructor) {
    this.login = login;
    this.password = password;
  }

  private async getSessionId() {

    if (!this.session) {
      const loginData = await this.apiLogin();

      if (loginData.error || !loginData.session) {
        throw loginData;
      }

      this.session = loginData.session;
    } 

    return this.session;

  }

  private async apiLogin() {
    const loginUrl = `${API_ROOT}/login.json?email=${this.login}&password=${this.password}`;

    const response = await fetch(loginUrl, { method: 'post' });
    const textResponse = await response.text();

    let parsedData: LoginDataResponse;

    try {
      parsedData = JSON.parse(textResponse);

      parsedData = {
        error: false,
        message: '',
        session: this.session
      };

    } catch (error) {
      const loginErrorMessage = `Login error. Error body: ${JSON.stringify(
        error
      )}. Original response: ${textResponse}`;

      parsedData = {
        error: true,
        message: loginErrorMessage,
        session: ''
      };
    }

    return parsedData;
  }
}

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

//     const outlookUrl = `${API_ROOT}/get-community-outlook.json?session=${session}`;

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



  }
// }
