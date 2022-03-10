import axios from 'axios';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const URL = 'http://mock.pl';
const MOCKED_RESPONSE = { title: 'Mocked response' };

const client = axios.create();
const server = setupServer(rest.post(URL, (req, res, ctx) => res(ctx.json(MOCKED_RESPONSE))));

beforeAll(() => server.listen());
afterAll(() => server.close());

it('works because post data is not defined', async () => {
  const response = await client.post(URL);

  expect(response.data).toEqual(MOCKED_RESPONSE);
});

it('does not work because there is a post data', async () => {
  const response = await client.post(URL, {});

  expect(response.data).toEqual(MOCKED_RESPONSE);
});
