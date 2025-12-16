
exports.handler = async function (event, context) {

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby4LYUuc0aed9UsS6BDwBXitoLLUKp2Wzy2RSaaODfb4oStNaZMY1yR0l_XNdFKAGCS/exec'
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };
  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: headers,
      body: {
        action: 'register',
        ...event.body
      },
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