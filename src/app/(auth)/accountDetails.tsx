import { useEffect, useMemo, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StatusBar,
  StyleSheet
} from "react-native";
import { MatchDetails, RiotService } from "../../api/Riot";
import ChampionCard, { ChampionData } from "../../components/championcard";
import { useAppDispatch, useAppSelector } from "../../state/hooks";
import { selectChampions, setChampions } from "../../state/slices/dataSlices";
import {
  selectChampionMasteries,
  selectCurrentProfile,
  setChampionMasteries,
} from "../../state/slices/selectionSlices";
import ChampionListComponent from "../../components/championListComponent";
import { LinearGradient } from "expo-linear-gradient";
import { SafeAreaProvider } from "react-native-safe-area-context";

const REGION = "euw1";

export default function Page() {
  const account = useAppSelector(selectCurrentProfile);
  const masteries = useAppSelector(selectChampionMasteries);
  const champions = useAppSelector(selectChampions);
  const dispatch = useAppDispatch();

  const [championSearch, setChampionSearch] = useState("");

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
    RiotService.FetchMatchHistory(account.puuid).then((matchIds) => {
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
      RiotService.ChampionsGodOrPlayed(matches, account.puuid, "ARENA"),
    );
  }, [matches]);

  const championMasteries: ChampionData[] = useMemo(() => {
    return masteries
      .map((mastery) => {
        const champion = champions.find(
          (c) => c.key === mastery.championId.toString(),
        );
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
          championExp: `${mastery.championPoints}/${mastery.championPoints + mastery.championPointsSinceLastLevel}`,
          seasonMilestone: mastery.championSeasonMilestone,
          championLastPlayed: mastery.lastPlayTime,
          markRequiredForNextLevel: mastery.markRequiredForNextLevel,
          tokensEarned: mastery.tokensEarned,
          god: isGod,
          played: false,
        };
      })
      .filter((r) => r !== undefined);
  }, [champions, masteries, godPlayedChampions]);

  return (
    <SafeAreaProvider>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor="white" />
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          enabled
          style={{ flex: 1 }}
        >
          <LinearGradient
            colors={["#091428", "#0A1428"]}
            style={s.background}
          />
          <ChampionListComponent champions={championMasteries} />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
const s = StyleSheet.create({
  background: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "100%",
  },
});
