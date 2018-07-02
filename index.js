// See https://github.com/dialogflow/dialogflow-fulfillment-nodejs
// for Dialogflow fulfillment library docs, samples, and to report issues
'use strict';

const functions = require('firebase-functions');
const { WebhookClient } = require('dialogflow-fulfillment');
const { Card, Suggestion } = require('dialogflow-fulfillment');


//axios
const axios = require('axios');
const getRecipes = () => {
  const recipes = [];
  axios.get('https://api.plated.com/api/v4/menus.json')
    .then(res => {
      return {
        mains: res.data.mains,
        desserts: res.data.desserts,
      }
    })
    .catch(error => {
      console.log(error);
    })
}

//html tag strip via regex

function htmlStrip(str) {
  return str.replace(/<[/?a-z]*>/g, '');
}

//handleNav function

function handleNav(agent, navStr) {

}

process.env.DEBUG = 'dialogflow:debug'; // enables lib debugging statements

exports.dialogflowFirebaseFulfillment = functions.https.onRequest((request, response) => {
  const agent = new WebhookClient({ request, response });
  console.log('Dialogflow Request headers: ' + JSON.stringify(request.headers));
  console.log('Dialogflow Request body: ' + JSON.stringify(request.body));

  function welcome(agent) {
    console.log(request);
    console.log(request.body);
    console.log(request.body.originalDetectIntentRequest.payload.user);
    const token = request.body.originalDetectIntentRequest.payload.user.accessToken;
    const config = {
      headers: { 'Authorization': "bearer " + token }
    };


    //  chain promise to setContext for both api requests

    return axios.get('https://pltd-staging.com/api/v2/boxes/future.json', config)
      .then(boxRes => {
        const boxes = boxRes.data;
        return axios.get('https://pltd-staging.com/api/v2/me.json', config)
          .then(userRes => {
            const user = userRes.data;
            console.log(boxes);
            console.log(user);
            agent.add("REQUEST FINISHED IN CLI");
          })
          .catch(error => {
            console.log("user error");
            console.log(error);
          })
      })
      .catch(error => {
        console.log("box error");
        console.log(error);
      })

    //  return axios.get('https://pltd-staging.com/api/v2/boxes/future.json', config)
    //     .then(res => {
    //       console.log(res.data);
    //       agent.add("WORKED");
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     })
  }


  //   function fallback(agent) {
  //     agent.add(`I didn't understand`);
  //     agent.add(`I'm sorry, can you try again?`);
  //   }

  // Uncomment and edit to make your own intent handler
  // uncomment `intentMap.set('your intent name here', yourFunctionHandler);`
  // below to get this function to be run when a Dialogflow intent is matched



  function recipeShow(agent) {
    return axios.get('https://api.plated.com/api/v4/menus.json')
      .then(res => {
        const { mains, desserts } = res.data;
        const firstMain = mains[0];
        const { name, equipment, description, ingredients, images } = firstMain;
        agent.add(new Card({
          title: name,
          imageUrl: `http://${images[4].image.url.slice(2)}`,
          text: description,
        }));
      })
      .catch(error => {
        console.log(error);
      })

  }

  function recipeShowTest(agent) {
    //   return axios.get('https://pltd-staging.com/api/v2/boxes/future.json')
    console.log(request.body.originalDetectIntentRequest.payload.user);
    return axios.get('https://api.plated.com/api/v4/menus.json')
      .then(res => {
        console.log(res.data);
        const { mains, desserts } = res.data;
        const firstMain = mains[0];
        const { name, equipment, description, ingredients, images, steps } = firstMain;
        const context = { 'name': 'recipe', 'lifespan': 5, 'parameters': { 'recipe': firstMain, 'step': 1 } };
        agent.setContext(context);
        const stepTotal = steps.length;
        agent.add(`OK, let's start! There are ${stepTotal} steps. To begin, say "Start at step 1."`)
      })
      .catch(error => {
        console.log(error);
      })

  }

  function recipeNav(agent) {
    const inboundContext = agent.getContext('recipe');
    console.log(inboundContext);
    const recipe = inboundContext.parameters.recipe;
    const inputParams = agent.parameters;
    if (inputParams.stepNumber && inputParams.stepNumber <= recipe.steps.length) {
      console.log(inputParams);
      const { stepNumber } = inputParams;
      const stepText = htmlStrip(recipe.steps[stepNumber - 1].description);
      const context = Object.assign(inboundContext, { 'parameters': { 'recipe': recipe, 'step': stepNumber } })
      console.log(context);
      agent.add(`Step ${stepNumber}: ${stepText}`);
      agent.setContext(context);
    }

    else if (inputParams.Navigation) {
      const { Navigation } = inputParams;
      let stepNumber, stepText, context;
      let curStep = inboundContext.parameters.step;
      switch (Navigation) {
        case 'next':
          if (curStep + 1 > recipe.steps.length) {
            stepNumber = curStep;
            context = Object.assign(inboundContext, { 'parameters': { 'recipe': recipe, 'step': stepNumber } });
            agent.add(`You're already at the final step! Say "repeat step" if you'd like me to repeat the last step.`)
            agent.setContext(context);
          }
          else {
            stepNumber = curStep + 1;
            stepText = htmlStrip(recipe.steps[stepNumber - 1].description);
            context = Object.assign(inboundContext, { 'parameters': { 'recipe': recipe, 'step': stepNumber } });
            agent.add(`Step ${stepNumber}: ${stepText}`);
            agent.setContext(context);
          }
          break;
        case 'previous':
          if (curStep - 1 < 1) {
            stepNumber = curStep;
            context = Object.assign(inboundContext, { 'parameters': { 'recipe': recipe, 'step': stepNumber } });
            agent.add(`You're currently on the first step. Say "repeat step" if you'd like me to repeat the first step.`)
            agent.setContext(context);
          }
          else {
            stepNumber = curStep - 1;
            stepText = htmlStrip(recipe.steps[stepNumber - 1].description);
            context = Object.assign(inboundContext, { 'parameters': { 'recipe': recipe, 'step': stepNumber } });
            agent.add(`Step ${stepNumber}: ${stepText}`);
            agent.setContext(context);
          }
          break;
        case 'repeat':
          stepNumber = curStep;
          stepText = htmlStrip(recipe.steps[stepNumber - 1].description);
          context = Object.assign(inboundContext, { 'parameters': { 'recipe': recipe, 'step': stepNumber } });
          agent.add(`Step ${stepNumber}: ${stepText}`);
          agent.setContext(context);
          break;
        default:
          agent.add("Sorry, there was a problem with navigation.");
      }
    }
    else {
      const steps = recipe.steps.length;
      agent.add(`Sorry, I didn't catch that. There are ${steps} steps. Please say which step you would like.`);
    }
  }

  function yourFunctionHandler(agent) {
    agent.add(`Howdy!`);
    agent.add(new Card({
      title: `Howdy!`,
      imageUrl: 'http://i0.kym-cdn.com/photos/images/newsfeed/001/091/507/ba8.png',
      text: `Asriel says 'Howdy!'`,
      //  text: `This is the body text of a card.  You can even use line\n  breaks and emoji! 💁`,
      buttonText: 'This is a button',
      buttonUrl: 'https://assistant.google.com/'
    })
    );
    //  agent.add(new Suggestion(`Quick Reply`));
    //  agent.add(new Suggestion(`Suggestion`));
    //  agent.setContext({ name: 'weather', lifespan: 2, parameters: { city: 'Rome' }});
  }

  // // Uncomment and edit to make your own Google Assistant intent handler
  // // uncomment `intentMap.set('your intent name here', googleAssistantHandler);`
  // // below to get this function to be run when a Dialogflow intent is matched
  // function googleAssistantHandler(agent) {
  //   let conv = agent.conv(); // Get Actions on Google library conv instance
  //   conv.ask('Hello from the Actions on Google client library!') // Use Actions on Google library
  //   agent.add(conv); // Add Actions on Google library responses to your agent's response
  // }
  // // See https://github.com/dialogflow/dialogflow-fulfillment-nodejs/tree/master/samples/actions-on-google
  // // for a complete Dialogflow fulfillment library Actions on Google client library v2 integration sample

  // Run the proper function handler based on the matched Dialogflow intent name
  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  //   intentMap.set('Default Fallback Intent', fallback);
  intentMap.set('TestIntent', yourFunctionHandler);
  intentMap.set('RecipeConfirmation', recipeShowTest);
  intentMap.set('RecipeNavigation', recipeNav);
  // intentMap.set('your intent name here', yourFunctionHandler);
  // intentMap.set('your intent name here', googleAssistantHandler);
  agent.handleRequest(intentMap);
});
