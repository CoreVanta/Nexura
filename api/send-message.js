const fetch = require('node-fetch');

module.exports = async (req, res) => {
    // السماح للطلبات من نطاق معين
    res.setHeader('Access-Control-Allow-Origin', 'https://nexura-git-main-ahmed-m-madanys-projects.vercel.app');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // التعامل مع طلب OPTIONS في حال كانت عملية preflight
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const BOT_TOKEN = process.env.BOT_TOKEN; // استبدل هذا بالتوكن الخاص بالبوت من البيئة
    const CHAT_ID = process.env.CHAT_ID;     // استبدل هذا بمعرف الدردشة الخاص بك من البيئة  
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
            const errorText = await response.text();
            res.status(500).json({ error: `Failed to send message: ${errorText}` });
        }
    } catch (error) {
        res.status(500).json({ error: 'An error occurred.' });
    }
};
