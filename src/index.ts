import MyfxbookApi from './myfxbook-api';

export { MyfxbookApi };

const myfx = new MyfxbookApi({
  email: '',
  password: ''
});

myfx
  .getCommunityOutlookByCountry('eurusd')
  .then(data => console.log(JSON.stringify(data)))
  .catch(err => console.log(err));
