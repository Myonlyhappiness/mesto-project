export default class UserInfo {
  constructor({profileName, profileJobInfo}, api){
    this._profileName = profileName
    this._profileJobInfo = profileJobInfo
    this._api = api
  }

  getUserInfo(){
    return this._api.getUserInfo();
  }

  setUserInfo(popupNameField, popupJobField, callback){
    return this._api.updateUserInfo(popupNameField.value, popupJobField.value)
    .then((res) => {
      this._profileName.textContent = res.name;
      this._profileJobInfo.textContent = res.about;
      callback();
    })
  }
}
