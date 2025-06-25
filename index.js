import pkg from "whatsapp-web.js"
const { Client, LocalAuth } = pkg;
import qrcode from "qrcode-terminal"
import cron from "node-cron" // caso queira enviar mensagens agendadas.

const client = new Client({
    authStrategy: new LocalAuth()
})

client.on('qr', (qr) => { // gera o qrcode para conectar, via terminal
    qrcode.generate(qr, { small: true });
})

client.on('message', message => { // se enviar 'oí, receberá: olá
    if (message.body.toLowerCase() === 'oi') {
        message.reply('Olá')
    }
})

client.on('ready', () => { // quando se conectar, vai aparecer no console.log e chamar a function sendMessageTest
    console.log('Tudo pronto!')
    sendMessageTest();
})

async function sendMessageTest() { // mensagem inicial
    const numero = '5511999999999'
    try {
        await client.sendMessage(`${numero}@c.us`, mensagemInicial());
    } catch (err) {
        console.error(err);
    }
}

function mensagemInicial() { // texto definido
    const texto = `
        Olá, como vai? Prazer em Conhecer-lhe. \n
        Me chamo Isaac. Desenvolvi isto para você :)
    `
    return texto;
}

client.initialize()


