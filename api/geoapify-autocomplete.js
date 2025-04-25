export const config = { runtime: 'edge' };

export default async function handler(req) {
  const { searchParams } = new URL(req.url);
  const text = searchParams.get('text');
  const limit = searchParams.get('limit') || '5';
  const filter = searchParams.get('filter') || 'countrycode:gb';
  const lang = searchParams.get('lang') || 'en';

  if (req.method !== 'GET') {
    return new Response(JSON.stringify({ error: 'Method Not Allowed' }), {
      status: 405,
      headers: { 'content-type': 'application/json', allow: 'GET' },
    });
  }
  if (!text || text.length < 3) {
    return new Response(
      JSON.stringify({ error: "The 'text' must be at least 3 characters." }),
      { status: 400, headers: { 'content-type': 'application/json' } }
    );
  }

  const url =
    `https://api.geoapify.com/v1/geocode/autocomplete` +
    `?text=${encodeURIComponent(text)}` +
    `&apiKey=${process.env.GEOAPIFY_KEY}` +
    `&limit=${limit}` +
    `&filter=${encodeURIComponent(filter)}` +
    `&lang=${lang}`;

  try {
    const response = await fetch(url, { next: { revalidate: 300 } });
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
    console.error('Geoapify autocomplete error:', err);
    return new Response(
      JSON.stringify({ error: 'Failed to get data from Geoapify' }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
}
