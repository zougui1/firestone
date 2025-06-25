import { computeBestFormation } from '@zougui/firestone.war-machines/campaign';

self.onmessage = (event: MessageEvent<Parameters<typeof computeBestFormation>>) => {
  const [data] = event.data;
  const result = computeBestFormation(data);

  postMessage({ type: 'result', data: result });
}
