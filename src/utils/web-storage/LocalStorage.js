const LocalStorage = {
  set: (key, value) => {
    if(key && value) {
      window.localStorage.setItem(key, JSON.stringify(value));
    }    
  },

  get: (key, isJson) => {
    if(key) {
      if(isJson) {
        const jsonString = window.localStorage.getItem(key);

        try {
          const jsonData = JSON.parse(jsonString);
          return jsonData;
        } catch(e) {
          console.error(`LocalStorage.get - ${e}`);
        }
      } else {
        return window.localStorage.getItem(key);
      }
    }
  },

  remove: (key) => {
    if(key) {
      window.localStorage.removeItem(key);
    }
  }
}

export default LocalStorage;