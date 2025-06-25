import { simulateDetailedMission } from '@zougui/firestone.war-machines/campaign';

self.onmessage = (event: MessageEvent<Parameters<typeof simulateDetailedMission>>) => {
  const [summary, warMachines, options] = event.data;

  const result = simulateDetailedMission(summary, warMachines, {
    ...options,
    onChange: data => postMessage({ type: 'onChange', data }),
  });

  result.match(
    data => postMessage({ type: 'result', data }),
    error => postMessage({ type: 'error', data: error }),
  );
}
