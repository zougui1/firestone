import WebSocket from 'ws';

const sessionId = '';
const userId = '';
const serverName = 'Elmbrook';
const gameVersion = '900';

const errors = [];

if (!sessionId) errors.push('missing session ID');
if (!userId) errors.push('missing user ID');

if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

const stringifyRequest = (request) => {
  const firstPart = [
    request.type,
    request.userId,
    request.sessionId,
    ...(request.parameters ?? []),
  ].join('|==|');

  const wholeRequest = [
    firstPart,
    request.serverName,
    request.gameVersion,
  ].join('|-+-|');

  return wholeRequest;
}

const tryServer = async (url) => {
  const socket = new WebSocket(url, {
    rejectUnauthorized: false,
  });

  await new Promise((resolve, reject) => {
    socket.on('open', resolve);
    socket.on('error', reject);
  });

  await new Promise((resolve, reject) => {
    socket.on('message', resolve);
    socket.on('error', reject);
    setTimeout(reject, 10000);

    console.error()
    socket.send(Buffer.from(stringifyRequest({
      sessionId,
      userId,
      serverName,
      gameVersion,
      type: 'StartCampaignBattle',
      parameters: [0, 0],
    }), 'utf8'));
  });
}

(async () => {
  for (let i = 0; i < 30; i++) {
    try {
      const url = `wss://ws${i}.holydaygames.org/`;
      console.log('trying url:', url);
      await tryServer(url);
      console.log('found url:', url);
      return;
    } catch (error) {

    }
  }
})();
