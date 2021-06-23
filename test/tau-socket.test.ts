import { TauSocket } from '../src/tau-socket';
// import WebSocket from 'ws';

// jest.mock('ws', () => {
//   class MockedWebSocket {}

//   return MockedWebSocket;
// });

const ERR_INVALID_URL = 'ERR_INVALID_URL';
// const successMessage = 'Successfully authenticated with TAU and listening for events...';

describe('TauSocket', () => {
  let socket: TauSocket;

  beforeAll(() => {
    socket = new TauSocket();
  });

  afterEach(async () => {
    await socket.close();
  });

  it('should return an error for invalid URL', done => {
    socket
      .connect({
        url: 'notarealurl/ws/',
        token: '',
      })
      .catch(result => {
        expect(result.error.code).toBe(ERR_INVALID_URL);
        done();
      });
  });

  // it('should return success', done => {
  //   // TODO stub/fake the websocket connection events
  //   socket
  //     .connect({
  //       url: '',
  //       token: '',
  //       isSecure: false,
  //     })
  //     .then(result => {
  //       expect(result.message).toBe(successMessage);
  //       done();
  //     });
  // });
});
