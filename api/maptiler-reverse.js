export const config = { runtime: 'edge' };

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const lat = searchParams.get('lat');
  const lng = searchParams.get('lng');
  const language = searchParams.get('language') || 'en';
  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'content-type': 'application/json', allow: 'GET' },
    });
  }
  if (!lat || !lng) {
    return new Response(
      JSON.stringify({
        error: "The 'lat' and 'lng' parameters are required",
      }),
      { status: 400, headers: { 'content-type': 'application/json' } }
    );
  }

  const url =
    `https://api.maptiler.com/geocoding/${lng},${lat}.json` +
    `?key=${process.env.MAPTILER_KEY}&language=${language}`;

  try {
    const start = Date.now();
    const response = await fetch(url, { next: { revalidate: 300 } });
    const duration = Date.now() - start;
    console.log(`MapTiler API latency: ${duration}ms`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'content-type': 'application/json',
        'cache-control': 'public, max-age=300',
      },
    });
  } catch (err) {
    console.error('MapTiler reverse geocode error:', err);
    return new Response(
      JSON.stringify({ error: 'Failed to get data from MapTiler' }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
}
