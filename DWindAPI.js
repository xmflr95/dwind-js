function DWindAPI() {
  let defaultOpt = {
    method: 'GET', // *GET, POST, DELETE, PUT, PATCH ...
    mode: 'cors', // no-cors, *cors, same-origin
    cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
    credential: 'same-origin', // include(cors), *same-origin, omit
    headers: {
      'Content-Type': 'application/json',
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: 'follow', // manual, *follow, error
    referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    // body: JSON.stringify(data),
  };

  return function(config) {    
    let { url, method, params, data } = config;
    
    if (params) {
      if (method.toUpperCase() === 'GET') {
        url = addQueryString(url, params);
      } else if (method.toUpperCase() === 'DELETE') {
        if (url.charAt(url.length - 1) === '/') {
          url = url.substring(0, url.length - 1);
        }
        let val = Object.values(params)[0];        
        url += `/${val}`;
      } else {
        url = addQueryString(url, params);
      }
    }

    let option = {
      ...defaultOpt,
      method,
      body: JSON.stringify(data)
    }
    
    return fetch(url, option);
  }
};

const dwind = new DWindAPI();

dwind.defaultOpt = {
  method: 'GET', // *GET, POST, DELETE, PUT, PATCH ...
  mode: 'cors', // no-cors, *cors, same-origin
  cache: 'default', // *default, no-cache, reload, force-cache, only-if-cached
  credential: 'same-origin', // include(cors), *same-origin, omit
  headers: {
    'Content-Type': 'application/json',
    // 'Content-Type': 'application/x-www-form-urlencoded',
  },
  redirect: 'follow', // manual, *follow, error
  referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  // body: JSON.stringify(data),
}

dwind.get = async function(url, params) { 
  if (params) {
    //JSON.parse(JSON.stringify(params)) 
    url = addQueryString(url, params);
  }

  const response = await fetch(url, this.defaultOpt);
      
  if (response.ok) {
    let json = await response.json();
    return json;
  } else {
    let err = new Error(`${response.status} ${response.statusText}`);
    err.name = "[DWind Error]";
    // throw new Error(err);
    throw err;
  }
};

dwind.post = async function(url, options) {
  // let data = options !== undefined ? options.data : {};
  let params = options || {};
  const opt = {
    ...this.defaultOpt,
    method: 'POST',
    body: JSON.stringify(params.data)
  };
  
  const response = await fetch(url, opt);

  if (response.ok) {
    let json = await response.json();
    return json;
  } else {
    var err = new Error(`${response.status} ${response.statusText}`);
    err.name = "[DWind Error]";
    throw err;
  }
};

dwind.delete = async function(url, options) {
  if (options) {
    if (url.charAt(url.length - 1) === '/') {
      url = url.substring(0, url.length - 1);
    }
    let val = Object.values(options)[0];
    url += `/${val}`;
  }
  const opt = {
    ...this.defaultOpt,
    method: 'DELETE'
  };
  
  const response = await fetch(url, opt);

  if (response.ok) {
    let json = await response.json();
    return json;
  } else {
    var err = new Error(`${response.status} ${response.statusText}`);
    err.name = "[DWind Error]";
    throw err;
  }
};

dwind.put = async function(url, options) {
  let params = options || {};
  const opt = {
    ...this.defaultOpt,
    method: 'PUT',
    body: JSON.stringify(params.data)
  };
  
  const response = await fetch(url, opt);

  if (response.ok) {
    let json = await response.json();
    return json;
  } else {
    var err = new Error(`${response.status} ${response.statusText}`);
    err.name = "[DWind Error]";
    throw err;
  }
};

dwind.patch = async function(url, options) {
  let params = options || {};
  const opt = {
    ...this.defaultOpt,
    method: 'PATCH',
    body: JSON.stringify(params.data)
  };
  
  const response = await fetch(url, opt);

  if (response.ok) {
    let json = await response.json();
    return json;
  } else {
    var err = new Error(`${response.status} ${response.statusText}`);
    err.name = "[DWind Error]";
    throw err;
  }
};

dwind.flush = function() {
  console.log("flush on");
}

// Uitl
function addQueryString(url, query) {
  let kv = Object.entries(query);
  for (let i = 0; i < kv.length; i++) {
    if (i === 0) {
      url += `?${kv[i][0]}=${kv[i][1]}`;
    } else {
      url += `&${kv[i][0]}=${kv[i][1]}`;
    }
  }

  return url;
}

export default dwind;
// export const DWind = DWindAPI;