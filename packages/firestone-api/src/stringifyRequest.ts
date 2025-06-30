export const stringifyRequest = (request: CompleteRequestData) => {
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

export interface CompleteRequestData {
  type: string;
  userId: string;
  sessionId: string;
  gameVersion: string;
  parameters?: (string | number)[];
  serverName: string;
}
