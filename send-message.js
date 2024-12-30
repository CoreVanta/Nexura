const fetch = require('node-fetch');

module.exports = async (req, res) => {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const BOT_TOKEN = 7884645245:AAEdfmJ7qzap_N0oLQzQ9IEnJEolOtTL7x4; // استبدل هذا بالتوكن الخاص بالبوت
    const CHAT_ID = 6875281230;  // استبدل هذا بمعرف الدردشة الخاص بك
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
        return res.status(400).json({ error: 'All fields are required.' });
    }

    const text = `📩 New Contact Form Message:\n\n👤 Name: ${name}\n📧 Email: ${email}\n💬 Message: ${message}`;

    try {
        const response = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ chat_id: CHAT_ID, text }),
        });

        if (response.ok) {
            res.status(200).json({ message: 'Message sent successfully!' });
        } else {
            res.status(500).json({ error: 'Failed to send message.' });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred.' });
    }
};
