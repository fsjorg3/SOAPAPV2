const http = require('http');

http.get('http://127.0.0.1:5501/info/inf-2021.html', (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    const links = [...data.matchAll(/<a[^>]+href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)]
      .map(m => ({ href: m[1], text: m[2].replace(/<[^>]+>/g, '').trim() }));
    console.log(JSON.stringify(links, null, 2));
  });
}).on('error', (err) => {
  console.log('Error: ' + err.message);
});
