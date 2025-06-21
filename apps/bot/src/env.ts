import envVar from 'env-var';

const NODE_ENV = envVar.get('NODE_ENV').default('development').asEnum(['development', 'production']);

export const env = {
  isDev: NODE_ENV === 'development',

  socket: {
    port: envVar.get('SOCKET.PORT').required().asPortNumber(),
    domain: envVar.get('SOCKET.DOMAIN').required().asString(),
  },

  firestone: {
    userId: envVar.get('FIRESTONE.USER_ID').required().asString(),
    server: envVar.get('FIRESTONE.SERVER').required().asString(),
    freeDurationSeconds: 3 * 60,
    cycleDurationSeconds: 6 * 60 * 60,
    blindTimeoutSeconds: 60,

    socket: {
      uri: envVar.get('FIRESTONE.SOCKET.URI').required().asUrlString(),
    },
  },
};
