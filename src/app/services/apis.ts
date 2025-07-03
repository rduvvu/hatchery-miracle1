const baseUrl = 'http://172.17.12.28:9009/nafarm'
const devUrl1 = 'http://13.216.66.214:8080/nafarm-authentication'
const devUrl2 = 'http://13.216.66.214:8080/nafarm-buyer'
export const apis = {
  //authentication
  login: devUrl1 + '/login',

  buyerProfile: devUrl1 + '/profile/',
  updateProfile: devUrl1 +'/profile',
  getParcelLifecycle: devUrl2 + '/landparcel-lifecycle',
  getParcelDetails: devUrl2 + '/landparcels',
  getFarmerList: devUrl2 + '/buyer/farmer/',
  postLifecyle: devUrl2 + '/landparcel-lifecycle/save',
  getAllParcelLifeCycle: devUrl2 + '/landparcel-lifecycle/createdBy',
  getAllFarmerList: devUrl2 + '/farmers/list',
  addParcelinfo :devUrl2 + '/landparcels/land-parcels',
  updateParcelInfo: devUrl2+ '/landparcels/update-land-parcels',
  updateParcel :devUrl2 + '/landparcels/update-land-parcels', 
  updataLifecycle: devUrl2+ '/landparcel-lifecycle/update',
  getStatesInfo: devUrl2 + '/states',
  getDistrictsInfo: devUrl2 + '/districts?stateId=',
  getBlocksInfo: devUrl2 + '/blocks?districtId=',
  getMandalsInfo: devUrl2 + '/mandals?blockId=',
  getPanchayatInfo: devUrl2 + '/panchayat?mandalId=',
  getVillageInfo: devUrl2 + '/village?villageId=',
  getHamletInfo: devUrl2 + '/hamlet?villageId=',
  saveFarmerInfo: devUrl2 + '/buyer/farmer/save',
  updateFarmerInfo: devUrl2 + '/buyer/farmer/update',
  deleteParcel: devUrl2 + '/life-cycle-delete',
  parcelDelete:devUrl2+ '/landparcels/parcel-delete',
  registrationDetail: devUrl1 + '/registration',
  checkMobileNumber: devUrl1 + '/mobile-phone-exist/',
  checkaadharExist: devUrl1 + '/aadhaar-exist/',
  getFarmerCreditList: devUrl2 + '/farmer-credits/parcel',
  getFarmerCreditDetails: devUrl2 + '/farmer-credits/parcel',
  getProductServ :devUrl2 + '/farmer-credits/services',
  getParcelList :devUrl2 + '/farmer-parcel-list?farmerId',
  postCredits :devUrl2 + '/farmer-credits/save',
  numbervalidation: devUrl1 + '/validate-username?',
  sendOTP: devUrl1 + '/send-otp?',
  validateOTP: devUrl1 +'/validate-otp',
  resetPassword:devUrl1 + '/forgot-password',
  cropDropdown: baseUrl + '/look-up-drop-down'
}