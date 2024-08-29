const axios = require('axios');
const readlineSync = require('readline-sync');

// api 
const apikey = 'AIzaSyAhCvw2ZZh3NvXr0W7MHc5ekzAViHC4LcQ';

//função para extrair o ID do video do link do yt
function extractVideoId(url){
    const videoIdMatch = url.match(/(?:https?:\/\/)?(?:www\.)?youtube\.com\/.*v=([^&]+)/) || 
                        url.match(/(?:https?:\/\/)?(?:www\.)?youtu\.be\/([^?]+)/);
    return videoIdMatch ? videoIdMatch[1] : null;
}

//função para obter título do video
async function getVideoTitle(videoId) {
    const url = `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${apikey}&part=snippet`;
    try {
        const response = await axios.get(url);
        const videoTitle = response.data.items[0].snippet.title;
        return videoTitle;
    } catch (error){
        console.log('deu erro aqui, ó!', error);
        return null;
    }
}

//solicita a pessoa um link
const videoUrl = readlineSync.question('insira um link do youtube: ');
const videoId = extractVideoId(videoUrl);

if (videoId) {
    getVideoTitle(videoId)
    .then(title => {
        if (title) {
            console.log(`O titulo do video é: ${title}`);
        } else {
            console.log('deu erro aí, colega.');
        }
    })
    .catch(error => {
        console.log('ocorreu um erro ao obter o link: ', error);
    });
} else {
    console.log('URL do youtube inválida. Favor insira certo.')
}