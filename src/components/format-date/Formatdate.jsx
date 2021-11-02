import React from "react";
import { formatRelative, subDays } from "date-fns";
export default function Formatdate({ timestamp }) {
  return (
    <div>
      {formatRelative(subDays(new Date(timestamp), 3), new Date(timestamp))}
    </div>
  );
}
