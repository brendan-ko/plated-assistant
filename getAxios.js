const axios = require('axios');

function getBoxes(configHeader) {
  return axios.get('https://pltd-staging.com/api/v2/boxes.json', configHeader)
  .then(boxRes => {
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
    return userRes.data.user;
  })
  .catch(error => {
    console.log("user error");
    console.log(error);
    return true;
  })
}

// function handleWelcomeAxiosRequest(configHeader) {
//   const user = getUser(configHeader);
//   const boxes = getBoxes(configHeader);

//   return Promise.all([boxes, user])
//     .then(([boxesRes, userRes]) => {
//       const userContext = {
//         'name': 'user',
//         'lifespan': 5,
//         'parameters': { 'user': userRes }
//       };
//       const boxesContext = {
//         'name': 'boxes',
//         'lifespan': 5,
//         'parameters': { 'boxes': boxesRes }
//       };
//       return {
//         'userContext': userContext,
//         'boxesContext': boxesContext,
//       }
//     })
//     .catch(error => {
//       console.log(error);
//     })
// }


module.exports = {
  'getBoxes': getBoxes,
  'getUser': getUser,
};