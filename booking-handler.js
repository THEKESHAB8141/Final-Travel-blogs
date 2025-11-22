// booking-handler.js
// Netlify Function to receive booking submissions and forward to a webhook (optional).
exports.handler = async function(event, context) {
  try {
    // Support form-encoded and JSON bodies
    let data = {};
    const ct = (event.headers && (event.headers['content-type'] || event.headers['Content-Type'])) || '';
    if(ct.includes('application/json')) {
      data = JSON.parse(event.body || '{}');
    } else {
      // parse x-www-form-urlencoded
      const params = new URLSearchParams(event.body || '');
      params.forEach((v,k) => { data[k]=v; });
    }

    // Forward to external webhook if configured
    const webhook = process.env.WEBHOOK_URL || null;
    if(webhook) {
      try {
        // POST JSON to webhook
        const res = await fetch(webhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({source: 'netlify-function', data})
        });
        // don't fail hard if webhook returns non-200 -- just log
        if(!res.ok) {
          console.log('Webhook returned', res.status);
        }
      } catch(err) {
        console.log('Webhook error', err && err.message);
      }
    }

    // Example: return 200 with JSON
    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true, received: data })
    };
  } catch(err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message })
    };
  }
};
