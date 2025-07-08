const baseUrl = 'http://172.17.12.101:8083/hatchery'
//const devUrl1 = 'http://13.216.66.214:8080/nafarm-authentication'
export const apis = {
  //authentication
  ownerLogin: baseUrl + '/users/login',
  driverRegister: baseUrl + '/users/register',
  driversStatusDetails: baseUrl + '/checkin/driver-details',
  driverCheckinFromAvailableList: baseUrl + '/checkin',
  driversList: baseUrl + '/users',
  roundwiseDriverDetails: baseUrl + '/checkin/completed-drivers',
  availableDriversListForCheckIn: baseUrl + '/checkin/available-drivers',
}
