const {getShowStatus} = require('./index');

async function expectShowStatus(name, status) {
  const res = await getShowStatus(name);
  expect(res).toMatchObject({
    name: expect.any(String),
    status: expect.any(String),
  });
  expect(res.status).toBe(status);
}

test('show with upcoming episode', async () => {
  await expectShowStatus(
    'Ozark',
    'Episode 1 from season 3 was announced, but no date yet',
  );
});
