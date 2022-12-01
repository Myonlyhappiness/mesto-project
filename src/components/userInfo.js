export default class UserInfo {
  constructor(profileAvatar, profileName, profileJobInfo){
  this.profileAvatar = profileAvatar
  this.profileName = profileName;
  this.profileJobInfo = profileJobInfo;
  }

  getUserInfo(){
    this._userData = {};
    this._userData.profileAvatar = this.profileAvatar;
    this._userData.profileName = this.profileName;
    this._userData.profileJobInfo = this.profileJobInfo;
    return this._userData;
  }

setUserInfo({name, about, _id}){
  this.profileName.textContent = name;
  this.profileJobInfo.textContent = about;
  this.id = _id;
  }

setUserAvatar({avatar}){
  this.profileAvatar.src = avatar;
}
}
