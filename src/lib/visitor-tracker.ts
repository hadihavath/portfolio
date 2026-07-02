/* mr.havath */

export interface VisitorLog {
  id: string;
  created_at: string;
  ip: string;
  location: string;
  device: string;
  referrer: string;
  screen_resolution: string;
}

const LOCAL_STORAGE_KEY = "hadhi_portfolio_visitor_logs";

function getCleanUserAgent(): string {
  if (typeof window === "undefined") return "Server";
  const ua = navigator.userAgent;
  let browser = "Unknown";
  let os = "Unknown OS";

  // Browser detection (most specific signatures first to avoid false positives)
  if (ua.includes("OPR") || ua.includes("Opera") || ua.includes("OPiOS")) {
    browser = "Opera";
  } else if (ua.includes("Edge") || ua.includes("Edg/") || ua.includes("EdgA") || ua.includes("EdgiOS")) {
    browser = "Edge";
  } else if (ua.includes("Firefox") || ua.includes("FxiOS")) {
    browser = "Firefox";
  } else if (ua.includes("Chrome") || ua.includes("CriOS")) {
    browser = "Chrome";
  } else if (ua.includes("Safari") && !ua.includes("Chrome") && !ua.includes("CriOS")) {
    browser = "Safari";
  }

  // OS / Device detection
  if (ua.includes("Android")) {
    os = "Android";
  } else if (ua.includes("iPhone")) {
    os = "iPhone";
  } else if (ua.includes("iPad")) {
    os = "iPad";
  } else if (ua.includes("Windows")) {
    os = "Windows";
  } else if (ua.includes("Macintosh")) {
    // Check for iPad posing as Mac (Safari desktop mode)
    if (navigator.maxTouchPoints && navigator.maxTouchPoints > 1) {
      os = "iPad";
    } else {
      os = "macOS";
    }
  } else if (ua.includes("Linux")) {
    os = "Linux";
  }

  return `${browser} on ${os}`;
}

export async function trackVisit(): Promise<void> {
  if (typeof window === "undefined") return;

  // Prevent double tracking in the same session tab if desired,
  // but standard practice is to track page loads.
  const sessionKey = "hadhi_portfolio_tracked";
  if (sessionStorage.getItem(sessionKey)) return;
  sessionStorage.setItem(sessionKey, "true");

  try {
    // 1. Gather location and IP from a free service
    let ip = "127.0.0.1";
    let location = "Localhost";

    try {
      const geoRes = await fetch("https://ipapi.co/json/");
      if (geoRes.ok) {
        const geoData = await geoRes.json();
        ip = geoData.ip || "Unknown IP";
        location =
          `${geoData.city || ""}, ${geoData.region || ""}, ${geoData.country_name || ""}`.replace(
            /^,\s*|,\s*$/,
            "",
          );
        if (!location.trim()) location = "Unknown Location";
      }
    } catch {
      // Fallback if API fails or rate limited
      location = "Unavailable";
    }

    const log: VisitorLog = {
      id: Math.random().toString(36).substring(2, 11),
      created_at: new Date().toISOString(),
      ip,
      location,
      device: getCleanUserAgent(),
      referrer: document.referrer || "Direct",
      screen_resolution: `${window.screen.width}x${window.screen.height}`,
    };

    // 2. Check if Supabase is configured
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    let dbLogId = log.id;

    if (supabaseUrl && supabaseAnonKey) {
      try {
        // Send to Supabase Rest API directly to avoid importing heavy Supabase Client
        const res = await fetch(`${supabaseUrl}/rest/v1/visitor_logs`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            apikey: supabaseAnonKey,
            Authorization: `Bearer ${supabaseAnonKey}`,
            Prefer: "return=representation",
          },
          body: JSON.stringify({
            ip: log.ip,
            location: log.location,
            device: log.device,
            referrer: log.referrer,
            screen_resolution: log.screen_resolution,
          }),
        });
        if (res.ok) {
          const inserted = await res.json();
          if (inserted && inserted.length > 0 && inserted[0].id) {
            dbLogId = inserted[0].id;
          }
        }
      } catch (err) {
        console.error("Failed to insert log to Supabase:", err);
      }
    } else {
      // Save locally to localStorage as fallback/demo
      const existingLogs: VisitorLog[] = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY) || "[]",
      );
      existingLogs.unshift(log);
      // Keep only last 150 logs locally to save space
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existingLogs.slice(0, 150)));
    }

    sessionStorage.setItem("hadhi_portfolio_log_id", dbLogId.toString());
  } catch (error) {
    console.error("Failed to log visitor:", error);
  }
}

export async function updateVisitorGeolocation(latitude: number, longitude: number): Promise<void> {
  const logId = sessionStorage.getItem("hadhi_portfolio_log_id");
  if (!logId) return;

  const preciseLocString = `GPS: ${latitude.toFixed(6)}, ${longitude.toFixed(6)}`;

  try {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    if (supabaseUrl && supabaseAnonKey) {
      // Get the existing location to append GPS coordinates
      const getRes = await fetch(`${supabaseUrl}/rest/v1/visitor_logs?id=eq.${logId}&select=location`, {
        method: "GET",
        headers: {
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
      });

      let updatedLocation = preciseLocString;
      if (getRes.ok) {
        const data = await getRes.json();
        if (data && data.length > 0 && data[0].location) {
          const currentLoc = data[0].location;
          // Avoid duplicate updates
          if (currentLoc.includes("GPS:")) return;
          updatedLocation = `${currentLoc} (${preciseLocString})`;
        }
      }

      await fetch(`${supabaseUrl}/rest/v1/visitor_logs?id=eq.${logId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          apikey: supabaseAnonKey,
          Authorization: `Bearer ${supabaseAnonKey}`,
        },
        body: JSON.stringify({
          location: updatedLocation,
        }),
      });
    } else {
      // Local storage fallback
      const existingLogs: VisitorLog[] = JSON.parse(
        localStorage.getItem(LOCAL_STORAGE_KEY) || "[]",
      );
      const index = existingLogs.findIndex((l) => l.id.toString() === logId);
      if (index !== -1) {
        if (!existingLogs[index].location.includes("GPS:")) {
          existingLogs[index].location = `${existingLogs[index].location} (${preciseLocString})`;
          localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(existingLogs));
        }
      }
    }
  } catch (error) {
    console.error("Failed to update visitor geolocation:", error);
  }
}

export async function fetchVisitorLogs(): Promise<VisitorLog[]> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

  if (supabaseUrl && supabaseAnonKey) {
    try {
      const res = await fetch(
        `${supabaseUrl}/rest/v1/visitor_logs?select=*&order=created_at.desc&limit=150`,
        {
          method: "GET",
          headers: {
            apikey: supabaseAnonKey,
            Authorization: `Bearer ${supabaseAnonKey}`,
          },
        },
      );
      if (res.ok) {
        return await res.json();
      }
      throw new Error(`Supabase query failed with status: ${res.status}`);
    } catch (error) {
      console.error("Failed to fetch logs from Supabase:", error);
      return [];
    }
  } else {
    // Fetch from localStorage fallback
    return JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY) || "[]");
  }
}
