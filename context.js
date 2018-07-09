function createContext(name, lifespan, data) {
  const paramData = {};
  paramData[name] = data;
  return {
    'name': name,
    'lifespan': lifespan,
    'parameters': paramData,
  }
}

module.exports = {
  'createContext': createContext,
}