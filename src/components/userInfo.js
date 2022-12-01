export default class UserInfo {
  constructor(profileAvatar, profileName, profileJobInfo){
  this.profileAvatar = profileAvatar
  this.profileName = profileName;
  this.profileJobInfo = profileJobInfo;

  }

  setUserInfo({avatar, name, about, _id}){
  this.profileAvatar.src = avatar;
  this.profileName.textContent = name;
  this.profileJobInfo.textContent = about;
  this.id = _id;
  }
}
