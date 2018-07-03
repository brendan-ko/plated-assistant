const axios = require('axios');

function getBoxes(configHeader) {
  return axios.get('https://pltd-staging.com/api/v2/boxes/future.json', configHeader)
  .then(boxRes => {
    console.log(boxRes.data);
    return boxRes.data.boxes;
  })
  .catch(error => {
    console.log("box error");
    console.log(error);
    return true;
  })
}

function getUser(configHeader) {
  return axios.get('https://pltd-staging.com/api/v2/me.json', configHeader)
  .then(userRes => {
    console.log(userRes.data);
    return userRes.data.user;
  })
  .catch(error => {
    console.log("user error");
    console.log(error);
    return true;
  })
}



module.exports = {
  getBoxes: getBoxes,
  getUser: getUser,
};