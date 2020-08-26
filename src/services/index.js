import api from '@/services/api';
import actions from '@/store/ducks/actions';
import store from '@/store';


export const Services = {
  //get
  get,

  //user
  logIn,
  logOut,
  change_password,
  change_pic,

  //chat
  get_user_list_chat,

  //album
  upload_image_to_album,
  set_album_cover,

  //info
  fav_toggle,
};

//get
function get(url,set) {
  api.get(url, {
  })
  .then((response) => {
    set(response.data.payload);
    console.log('s',response.data.payload);
  }, (error) => {
    console.log(error);
  });
}


//user
function logIn(member_number,password,setFail) {
  let body = new FormData();
  body.append('member_number', member_number);
  body.append('password', password);
  body.append('uniID', 'test2');
  body.append('OsType', 'ios');
  body.append('OsVersion', '1');
  body.append('VersionCode', '1');
  body.append('BuildNo', '1');
  body.append('DeviceName', 'test');

  api.post('user/login', body,{
  })
  .then((response) => {
    if(response.data.status=='success') store.dispatch(actions.loginAction(response.data));
      else setFail(1);
  }, (error) => {
    console.log(error);
  });
}

function logOut() {
  api.post('user/logout', {
  })
  .then((response) => {
    if(response.data.status=='success') store.dispatch(actions.logoutAction());
  }, (error) => {
    console.log(error);
  });
}

function change_password(member_number,old_password,password,password_confirmation,setWarning) {
  let body = new FormData();
  body.append('member_number', member_number);
  body.append('old_password', old_password);
  body.append('password', password);
  body.append('password_confirmation', password_confirmation);

  api.post('user/changePassword', body,{
  })
  .then((response) => {
    console.log('adaf',response.data);
    if(response.data.status=='error'){
      // if(response.data.payload) setWarning(response.data.payload[0]);
      if(response.data.msg=="Incorrect Password") setWarning('密碼錯誤!');
    }
    else if(response.data.status=='success') setWarning('更改密碼成功!');
  }, (error) => {
    console.log(error);
  });
}

function change_pic(uri,set) {
  let body = new FormData();
  const type = uri.split('.').pop();
  const photo = {
    uri: uri,
    type: 'image/'+type,
    name: 'photo.jpg',
  };
  body.append('image', photo);

  api.post('user/uploadProfile', body,{
  })
  .then((response) => {
    console.log(response.data);
    if(set) set();
  }, (error) => {
    console.log(error);
  });
}


//album
function upload_image_to_album(id,uri,getID) {
  let body = new FormData();
  const type = uri.split('.').pop();
  const photo = {
    uri: uri,
    type: 'image/'+type,
    name: 'photo.jpg',
  };
  body.append('image', photo);

  api.post('album/photo/'+id, body,{
  })
  .then((response) => {
    // console.log('dsd',response.data);
    if(getID) getID(response.data.payload.id);
  }, (error) => {
    console.log(error);
  });
}

function set_album_cover(album_id,photo_id) {
  let body = new FormData();
  body.append('album_id', album_id);
  body.append('photo_id', photo_id);

  api.post('album/setCover', body,{
  })
  .then((response) => {
    console.log('dsd',response.data);
    // if(getID) getID(response.data.payload.id);
  }, (error) => {
    console.log(error);
  });
}


//chat
function get_user_list_chat(set) {
  // const token = storage.getToken();
  // console.log(storage.getToken());
    api.get('user/list', {
      // firstName: 'Finn',
    })
    .then((response) => {
      // console.log(response.data.payload.data);
      set(response.data.payload.data);
    }, (error) => {
      console.log(error);
    });
}


//info
function fav_toggle(id) {
  let body = new FormData();
  body.append('event_id', id);

  api.post('event/fav', body,{
  })
  .then((response) => {
    // alert(response.data.status);
  }, (error) => {
    console.log(error);
  });
}



