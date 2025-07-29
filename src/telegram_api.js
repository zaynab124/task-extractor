const cleanMessage = require('./cleanMessage');
const saveMessage = require('./saveMessage');

exports.main = async (req, res) => {
  try {
    const body = req.body || JSON.parse(req.body);
    const text = body.message?.text;
    const sender = body.message?.chat?.id;

    if (text && sender) {
      const cleaned = cleanMessage(text);
      await saveMessage('telegram', sender, cleaned);
    }

    return res
      ? res.status(200).send('OK')
      : { statusCode: 200, body: 'OK' };
  } catch (err) {
    console.error('Telegram error:', err);
    return res
      ? res.status(500).send('Error')
      : { statusCode: 500, body: 'Error' };
  }
};
