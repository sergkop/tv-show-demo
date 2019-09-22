const {getShowStatus} = require('./index');

test('show with upcoming episode', async () => {
  const res = await getShowStatus('Ozark');
  expect(res).toMatchObject({
    name: expect.any(String),
    status: expect.any(String),
  });
  expect(res.status).toBe(
    'Episode 1 from season 3 was announced, but no date yet',
  );
});
