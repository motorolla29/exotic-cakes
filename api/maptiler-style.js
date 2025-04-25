export const config = { runtime: 'edge' };

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const style = searchParams.get('style') || 'streets';

  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'content-type': 'application/json', allow: 'GET' },
    });
  }

  const url =
    `https://api.maptiler.com/maps/${style}/style.json` +
    `?key=${process.env.MAPTILER_KEY}`;

  try {
    const response = await fetch(url, { next: { revalidate: 3600 } });

    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, max-age=3600',
      },
    });
  } catch (err) {
    console.error('MapTiler style proxy error:', err);
    return new Response(
      JSON.stringify({ error: 'Failed to fetch style.json' }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
}
