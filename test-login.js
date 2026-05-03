async function test() {
  const reg = await fetch('http://localhost:3000/api/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'test_admin2@example.com', password: 'testpassword', role: 'admin', name: 'Test' })
  });
  console.log('Register status:', reg.status);
  console.log(await reg.json());
  
  const login = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: 'test_admin2@example.com', password: 'testpassword' })
  });
  console.log('Login status:', login.status);
  console.log(await login.json());
}
test();
