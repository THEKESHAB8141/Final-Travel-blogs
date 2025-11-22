exports.handler = async function(event, context) {
  try {
    const body = JSON.parse(event.body || '{}');
    // Example serverless function: in production you might send an email, write to a DB, or call an API.
    console.log('Received booking:', body);
    return {
      statusCode: 200,
      body: JSON.stringify({ok:true, received: body})
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: JSON.stringify({error: 'failed'}) };
  }
};
