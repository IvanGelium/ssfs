// @ts-ignore
exports.handler = async function (event, context) {
  // URL вашего Google Apps Script

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby4LYUuc0aed9UsS6BDwBXitoLLUKp2Wzy2RSaaODfb4oStNaZMY1yR0l_XNdFKAGCS/exec'

  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: event.body,
    });

    const data = await response.text();

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: data,
    };

  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};

// this.apiUrl = apiUrl;
// this.sessionToken = localStorage.getItem('santa_session');


exports.register = async function (name, password, description = '') {
  const response = await fetch(SCRIPT_URL, {
    method: 'POST',
    // mode: 'no-cors', // или 'cors' если настроено
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      action: 'register',
      name: name,
      password: password,
      description: description
    })
  });
  // const test = await response.text()
  // console.log('response.text(): ', test)
  // console.log('raw: ', response)
  return response.json();
}

exports.login = async function (name, password) {
  const response = await fetch(SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({
      action: 'login',
      name: name,
      password: password
    })
  });
  const result = await response.json();
  if (result.success) {
    localStorage.setItem('santa_session', result.sessionToken);
  }
  return result;
}

exports.getWard = async function (sessionToken) {
  if (!sessionToken) {
    throw new Error('Необходима авторизация');
  }

  const response = await fetch(SCRIPT_URL, {
    method: 'POST',
    body: JSON.stringify({
      action: 'get_ward',
      sessionToken: sessionToken
    })
  });
  return response.json();
}

exports.getWard = async logout() {
  localStorage.removeItem('santa_session');
  // this.sessionToken = null;
}