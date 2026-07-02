/* mr.havath */
import { useState } from "react";
import { updateVisitorGeolocation } from "@/lib/visitor-tracker";
import { Compass, Navigation } from "lucide-react";

// Hadhi Havath's coordinates (from the provided maps.app.goo.gl coordinates)
const HADHI_LAT = 11.4178893;
const HADHI_LON = 75.9025932;

export function InteractiveMap() {
  const [gpsStatus, setGpsStatus] = useState<"idle" | "scanning" | "locked" | "denied">("idle");
  const [distance, setDistance] = useState<number | null>(null);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([
    "// SecOps Geo-Lock Module Initialized",
    "// Target: Hadhi Havath (Calicut, Kerala)",
    "// Click anywhere on this widget to establish GPS handshake..."
  ]);

  const addLog = (log: string) => {
    setTerminalLogs((prev) => [...prev, log].slice(-6)); // keep last 6 logs
  };

  const handleLocate = () => {
    if (!navigator.geolocation) {
      addLog("[ERR] Geolocation is not supported by this browser.");
      setGpsStatus("denied");
      return;
    }

    setGpsStatus("scanning");
    addLog("[~] Requesting client geolocation credentials...");
    addLog("[~] Pinging GPS satellites...");

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Calculate distance
        const dist = calculateDistance(HADHI_LAT, HADHI_LON, latitude, longitude);
        setDistance(dist);
        setGpsStatus("locked");

        addLog("[SUCCESS] Client GPS handshake established.");
        addLog(`[LAT] ${latitude.toFixed(6)} | [LON] ${longitude.toFixed(6)}`);
        addLog(`[RANGE] ${dist.toFixed(1)} km range vector calculated.`);
        addLog("[+] Uplinking precise geolocation metadata to SecOps DB...");

        // Save location to database
        updateVisitorGeolocation(latitude, longitude);
      },
      (error) => {
        console.error(error);
        setGpsStatus("denied");
        addLog("[WARN] Geolocation access denied by client browser.");
        addLog("[WARN] Fallback: relying on IP-based geo-routing.");
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  };

  // Haversine formula
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  return (
    <div
      onClick={() => {
        if (gpsStatus === "idle") {
          handleLocate();
        }
      }}
      className={`glass rounded-2xl p-4 border border-border/50 relative overflow-hidden flex flex-col gap-4 shadow-lg min-h-[350px] transition-all duration-300 ${
        gpsStatus === "idle" ? "cursor-pointer hover:border-[color:var(--neon)]/50 group/widget" : ""
      }`}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 grid-bg opacity-10 pointer-events-none" />
      
      {/* Map iframe */}
      <div className="relative w-full h-48 rounded-xl overflow-hidden border border-border/30 bg-black">
        <iframe
          title="Hadhi Havath Location Map"
          src="https://maps.google.com/maps?q=11.4178893,75.9025932&z=13&t=m&hl=en&output=embed"
          className="w-full h-full border-none opacity-85 transition-all duration-700"
          style={{
            filter: "invert(90%) hue-rotate(180deg) brightness(95%) contrast(90%) grayscale(20%)",
          }}
          loading="lazy"
        />
        {/* Neon scan lines overlay */}
        <div className="absolute inset-0 pointer-events-none scanlines opacity-30" />
        
        {/* GPS status badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 rounded-full bg-black/80 border border-border/40 px-2.5 py-1 text-[10px] font-mono backdrop-blur-sm select-none">
          <span className={`size-1.5 rounded-full animate-pulse ${
            gpsStatus === "locked" ? "bg-green-500 animate-pulse-glow" :
            gpsStatus === "scanning" ? "bg-yellow-500" :
            gpsStatus === "denied" ? "bg-red-500 animate-none" : "bg-neutral-500"
          }`} />
          {gpsStatus === "locked" && "GPS LOCKED"}
          {gpsStatus === "scanning" && "SCANNING..."}
          {gpsStatus === "denied" && "GPS BYPASSED"}
          {gpsStatus === "idle" && "GEO STANDBY"}
        </div>
      </div>

      {/* Cyber diagnostics terminal */}
      <div className="flex-1 rounded-xl bg-black/40 border border-border/30 p-3.5 font-mono text-xs text-muted-foreground flex flex-col justify-between min-h-[120px]">
        <div className="space-y-1.5">
          {terminalLogs.map((log, index) => (
            <div
              key={index}
              className={`${
                log.startsWith("[SUCCESS]") ? "text-green-500/90 font-semibold" :
                log.startsWith("[WARN]") ? "text-yellow-500/90" :
                log.startsWith("[ERR]") ? "text-red-500/90 font-bold" : "text-muted-foreground"
              }`}
            >
              {log}
            </div>
          ))}
        </div>

        <div className="mt-3 pt-3 border-t border-border/10 flex items-center justify-between">
          <button
            onClick={handleLocate}
            disabled={gpsStatus === "scanning"}
            className={`group inline-flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-mono transition-all duration-300 ${
              gpsStatus === "locked"
                ? "bg-green-500/10 border border-green-500/40 text-green-400"
                : gpsStatus === "scanning"
                ? "bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 cursor-wait"
                : "bg-[color:var(--neon)]/10 border border-[color:var(--neon)]/30 text-[color:var(--neon)] hover:bg-[color:var(--neon)]/20 hover:neon-border cursor-pointer"
            }`}
          >
            {gpsStatus === "locked" ? (
              <>
                <Navigation className="size-3.5 animate-bounce text-green-400" />
                Refetch GPS
              </>
            ) : gpsStatus === "scanning" ? (
              <>
                <Compass className="size-3.5 animate-spin text-yellow-400" />
                Locking GPS...
              </>
            ) : (
              <>
                <Compass className="size-3.5 group-hover:rotate-45 transition-transform duration-300" />
                Establish GPS Lock
              </>
            )}
          </button>
          
          {distance !== null && (
            <div className="text-[10px] text-right">
              <span className="text-[color:var(--neon-3)] block font-semibold">{distance.toFixed(1)} km</span>
              <span className="text-[9px] uppercase tracking-wider text-muted-foreground/60">Distance Vector</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
