"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

const fmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: site.timezone,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export default function LocalTime({ seconds = false }: { seconds?: boolean }) {
  const [now, setNow] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => {
      const t = fmt.format(new Date());
      setNow(seconds ? t : t.slice(0, 5));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [seconds]);

  return (
    <time suppressHydrationWarning className="tabular-nums">
      {now ?? "--:--"}
    </time>
  );
}
