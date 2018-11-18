import { select, effect } from 'easy-peasy'

import { generateId, sleep } from './util';

// helpers

const INITIAL_CLUSTER_SIZE = 4;
const ASYNC_RESPONSE_DELAY = () => 400 + Math.random() * 1100;

export const appNames = {
  Hd: 'Hadoop',
  Ra: 'Rails',
  Ch: 'Chronos',
  St: 'Storm',
  Sp: 'Spark',
};

const createNewServer = () => ({
  id: generateId(),
  created: new Date(),
  spawning: false,
  destroying: false,
  apps: [],
});

const createNewApp = (server, type) => ({
  id: generateId(),
  created: new Date(),
  spawning: false,
  destroying: false,
  serverId: server.id,
  type,
  label: appNames[type],
});

const initialCluster = [...Array(INITIAL_CLUSTER_SIZE)].map(createNewServer);

// selectors
const runningServersSelector = select((state) => state.servers.filter(server => !server.spawning && !server.destroying));

const destroyableServersSelector = select((state) => state.servers.filter(server => !server.destroying));

const capacityLeftSelector = select(
  (state) => state.runningServers.reduce((slots, server) => slots + 2 - server.apps.length, 0),
  [runningServersSelector],
);

const serverWithLowestLoadSelector = select(
  (state) => {
    const sortedServers = state.runningServers
      .filter(server => server.apps.length < 2)
      .sort((a, b) => a.apps.length - b.apps.length);
    return sortedServers.length > 0 ? sortedServers[0] : null;
  },
  [runningServersSelector]
);

const allAppsSelector = select((state) => {
  return state.servers
    .flatMap(server => server.apps)
    .sort((a, b) => a.created - b.created);
});

const runningAppsSelector = select(
  (state) => state.allApps.filter(app => !app.spawning && !app.destroying),
  [allAppsSelector],
);

const destroyableAppsSelector = select(
  (state) => state.allApps.filter(app => !app.destroying),
  [allAppsSelector],
);

// store model
export const model = {
  // state
  servers: initialCluster, // spawned servers and running apps

  // selectors
  runningServers: runningServersSelector,
  destroyableServers: destroyableServersSelector,
  capacityLeft: capacityLeftSelector,
  serverWithLowestLoad: serverWithLowestLoadSelector,

  allApps: allAppsSelector,
  runningApps: runningAppsSelector,
  destroyableApps: destroyableAppsSelector,

  // actions
  
  addServer: effect(async (dispatch) => {
    const server = createNewServer();
    dispatch.addServerRequest({ server });
    await sleep(ASYNC_RESPONSE_DELAY());
    dispatch.addServerSuccess({ id: server.id });
  }),
  addServerRequest: (state, { server }) => {
    server.spawning = true;
    state.servers.push(server);
  },
  addServerSuccess: (state, { id }) => {
    const server = state.servers.find(server => server.id === id);
    if (server) {
      server.spawning = false;
    }
  },

  destroyServer: effect(async (dispatch, { id } = {}, getState) => {
    const state = getState();
    const server = id ? state.destroyableServers.find(server => server.id === id) : state.destroyableServers[0];
    if (server) {
      dispatch.destroyServerRequest({ id: server.id });

      // if server had apps on it schedule starting them on another server
      const { apps } = server;
      apps.forEach(app => dispatch.addApp({ type: app.type }));

      await sleep(ASYNC_RESPONSE_DELAY());
      dispatch.destroyServerSuccess({ id: server.id });
    }
  }),
  destroyServerRequest: (state, { id }) => {
    const server = state.servers.find(server => server.id === id);
    if (server) {
      server.destroying = true;
      server.apps.forEach(app => app.destroying = true);
    }
  },
  destroyServerSuccess: (state, { id }) => {
    state.servers = state.servers.filter(server => server.id !== id);
  },

  addApp: effect(async (dispatch, { type }, getState) => {
    const state = getState();
    const serverWithLowestLoad = state.serverWithLowestLoad;
    if (serverWithLowestLoad) {
      const app = createNewApp(serverWithLowestLoad, type);
      dispatch.addAppRequest({ app, serverId: serverWithLowestLoad.id });
      await sleep(ASYNC_RESPONSE_DELAY());
      dispatch.addAppSuccess({ appId: app.id, serverId: serverWithLowestLoad.id });
    } else {
      // TODO toast "app could not be started"
    }
  }),
  addAppRequest: (state, { app, serverId }) => {
    const server = state.servers.find(server => server.id === serverId);
    app.spawning = true;
    server.apps.push(app);
  },
  addAppSuccess: (state, { appId, serverId }) => {
    const server = state.servers.find(server => server.id === serverId);
    if (server) {
      const app = server.apps.find(app => app.id === appId);
      app.spawning = false;
    }
  },

  destroyApp: effect(async (dispatch, { type }, getState) => {
    const state = getState();
    const latestAppsOfType = state.destroyableApps.filter(app => app.type === type);
    const app = latestAppsOfType.length > 0 ? latestAppsOfType[0] : null;

    if (app) {
      dispatch.destroyAppRequest({ appId: app.id, serverId: app.serverId });
      await sleep(ASYNC_RESPONSE_DELAY());
      dispatch.destroyAppSuccess({ appId: app.id, serverId: app.serverId });
    }
  }),
  destroyAppRequest: (state, { appId, serverId }) => {
    const server = state.servers.find(server => server.id === serverId);
    if (server) {
      const app = server.apps.find(app => app.id === appId);
      if (app) {
        app.destroying = true;
      }
    }
  },
  destroyAppSuccess: (state, { appId, serverId }) => {
    const server = state.servers.find(server => server.id === serverId);
    server.apps = server.apps.filter(app => app.id !== appId);
  },
};
