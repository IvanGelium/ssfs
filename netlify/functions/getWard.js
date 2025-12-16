
exports.handler = async function (event, context) {

  const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycby4LYUuc0aed9UsS6BDwBXitoLLUKp2Wzy2RSaaODfb4oStNaZMY1yR0l_XNdFKAGCS/exec'
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  let clientData = {};
  if (event.body) {
    try {
      clientData = JSON.parse(event.body);
      console.log('📥 Client data parsed:', clientData);
    } catch (e) {
      console.log('⚠️ Client data not JSON:', event.body);
      clientData = { raw: event.body };
    }
  }

  const requestBody = {
    action: 'get_ward',
    timestamp: new Date().toISOString(),
    source: 'netlify-proxy',
    ...clientData // Распаковываем данные от клиента
  };


  try {
    const response = await fetch(SCRIPT_URL, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify(requestBody),
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