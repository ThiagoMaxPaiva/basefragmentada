import { useQuery } from "@tanstack/react-query";
import type { DailyMission } from "@shared/schema";

export function useDailyMissions() {
  return useQuery<DailyMission[]>({
    queryKey: ["/api/missions/daily"],
  });
}
