import { useEffect, useMemo, useState } from "react";
import { FlatList, View } from "react-native";
import { MatchDetails, RiotService } from "../..//api/Riot";
import ChampionCard, { ChampionData } from "../../components/championcard";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { selectChampions, setChampions } from "../../state/slices/dataSlices";
import {
  selectChampionMasteries,
  selectCurrentProfile,
  setChampionMasteries,
} from "../../state/slices/selectionSlices";

const REGION = "euw1";

export default function Page() {
  const account = useAppSelector(selectCurrentProfile);
  const masteries = useAppSelector(selectChampionMasteries);
  const champions = useAppSelector(selectChampions);
  const dispatch = useAppDispatch();

  const [matches, setMatches] = useState<MatchDetails[]>([]);
  const [godPlayedChampions, setGodPlayedChampions] = useState<
    [string[], string[]]
  >([[], []]);

  useEffect(() => {
    if (account === undefined) return;
    // Get masteries
    RiotService.FetchChampionsMastery(account.puuid, REGION).then((m) => {
      dispatch(setChampionMasteries(m));
    });

    // Get matches
    RiotService.FetchMatchHistory(account.puuid, 5).then((matchIds) => {
      matchIds.forEach((matchId) => {
        RiotService.FetchMatchDetails(matchId).then((matchDetails) =>
          setMatches((old) => [...old, matchDetails]),
        );
      });
    });

    // Get champions if not already in cache
    if (champions.length > 0) return;
    RiotService.FetchChampions("en_GB").then((result) => {
      const champions = Object.values(result.data);
      dispatch(setChampions(champions));
    });
  }, [account]);

  useEffect(() => {
    if (account === undefined) return;
    setGodPlayedChampions(
      RiotService.ChampionsGodOrPlayed(matches, account.puuid, "CHERRY"),
    );
  }, [matches]);

  const championMasteries: ChampionData[] = useMemo(() => {
    return masteries
      .map((mastery) => {
        const champion = champions.at(mastery.championId);
        if (champion === undefined) return undefined;
        const isGod =
          godPlayedChampions[0].find(
            (championName) => championName === champion.name,
          ) !== undefined;

        return {
          championName: champion.name,
          championTitle: champion.title,
          championIcon: RiotService.GetChampionImage(champion.image.full),
          championPartype: champion.partype,
          championTags: champion.tags.join(", "),
          championLevel: mastery.championLevel,
          championExp: `${mastery.championPoints}/${mastery.championPoints + mastery.championPointsUntilNextLevel}`,
          seasonMilestone: mastery.championSeasonMilestone,
          championLastPlayed: mastery.lastPlayTime,
          markRequiredForNextLevel: mastery.markRequiredForNextLevel,
          tokensEarned: mastery.tokensEarned,
          championGod: isGod,
        };
      })
      .filter((r) => r !== undefined);
  }, [champions, masteries, godPlayedChampions]);

  console.log(championMasteries[4]);

  return (
    <View>
      <FlatList
        data={championMasteries}
        renderItem={({ item }) => <ChampionCard championData={item} />}
      />
    </View>
  );
}
