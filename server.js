const express = require('express');
const axios = require('axios');
const querystring = require('querystring');
const app = express();

const CLIENT_ID = 'TON_CLIENT_ID';  // Remplace par ton client_id Discord
const CLIENT_SECRET = 'TON_CLIENT_SECRET';  // Remplace par ton client_secret Discord
const REDIRECT_URI = 'https://ton-domaine.com/callback';  // L'URL de redirection que tu as configurée dans Discord Developer Portal
const TOKEN_URL = 'https://discord.com/api/oauth2/token';  // L'URL d'API Discord pour échanger le code contre un token

// Endpoint callback pour gérer la redirection après l'authentification de l'utilisateur
app.get('/callback', async (req, res) => {
  const code = req.query.code;  // Le code d'autorisation envoyé par Discord dans l'URL de redirection

  if (!code) {
    return res.send('Code d\'autorisation manquant.');
  }

  // Paramètres pour échanger le code contre un token d'accès
  const data = querystring.stringify({
    client_id: CLIENT_ID,
    client_secret: CLIENT_SECRET,
    code: code,
    grant_type: 'authorization_code',
    redirect_uri: REDIRECT_URI,
    scope: 'bot',
  });

  try {
    // Envoie une requête POST à Discord pour échanger le code contre un token
    const response = await axios.post(TOKEN_URL, data, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    const accessToken = response.data.access_token;  // Le token d'accès du bot

    // Affiche le token ou fais ce que tu veux avec
    res.send(`Bot ajouté avec succès ! Token : ${accessToken}`);
  } catch (error) {
    res.send('Erreur lors de l\'authentification.');
  }
});

// Démarre le serveur sur le port 3000
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
