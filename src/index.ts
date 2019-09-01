import MyfxbookApi from './myfxbook-api';
import * as interfaces from './myfxbook-api.interfaces';
export { MyfxbookApi, interfaces };

const myfx = new MyfxbookApi({
  email: '',
  password: ''
});

myfx
  .getDailyData(631370, '2013-03-22', '2013-03-27')
  .then(data => console.log(JSON.stringify(data)))
  .catch(err => console.log(err));
