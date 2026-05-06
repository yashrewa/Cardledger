"use client";

import { useRouter } from "next/navigation";

type CycleOption = {
  id: string;
  label: string;
};

export default function CycleSelector({
  cycles,
  selectedCycleId,
}: {
  cycles: CycleOption[];
  selectedCycleId: string;
}) {
  const router = useRouter();

  return (
    <select
      className="input cycle-selector"
      value={selectedCycleId}
      onChange={(event) => router.push(`/?cycleId=${event.target.value}`)}
    >
      {cycles.map((cycle) => (
        <option key={cycle.id} value={cycle.id}>
          {cycle.label}
        </option>
      ))}
    </select>
  );
}
