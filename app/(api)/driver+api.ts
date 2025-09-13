import { neon } from "@neondatabase/serverless";

export async function GET(request: Request) {
  try {
    const sql = neon(`${process.env.DATABASE_URL}`);
    
    // get lat/lng from query params
    // currently lat/lng aren't present
    const { searchParams } = new URL(request.url);
    const riderLat = parseFloat(searchParams.get("lat") || "");
    const riderLng = parseFloat(searchParams.get("lng") || "");
    const radiusKm = parseFloat(searchParams.get("radius") || "2"); // default 2km

    if (isNaN(riderLat) || isNaN(riderLng)) {
      return Response.json({ error: "missing or invalid lat/lng" }, { status: 400 });
    }

    // haversine formula in SQL (assuming drivers table has lat, lng columns)
    const response = await sql`
      SELECT *, (
        6371 * acos(
          cos(radians(${riderLat}))
          * cos(radians(lat))
          * cos(radians(lng) - radians(${riderLng}))
          + sin(radians(${riderLat}))
          * sin(radians(lat))
        )
      ) AS distance
      FROM drivers
      WHERE (
        6371 * acos(
          cos(radians(${riderLat}))
          * cos(radians(lat))
          * cos(radians(lng) - radians(${riderLng}))
          + sin(radians(${riderLat}))
          * sin(radians(lat))
        )
      ) < ${radiusKm}
      ORDER BY distance ASC
    `;

    return Response.json({ data: response });
  } catch (error) {
    console.error("error fetching nearby drivers:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}