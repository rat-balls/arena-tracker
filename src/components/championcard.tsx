import React from "react";
import { Image, Text, View } from "react-native";
let customFonts = {
  League: require("../assets/fonts/League.otf"),
};

export interface ChampionData {
  championName: string;
  championTitle: string;
  championIcon: string;
  championPartype: string;
  championTags: string;
  championLevel: number;
  championExp: string;
  seasonMilestone: number;
  championLastPlayed: number;
  markRequiredForNextLevel: number;
  tokensEarned: number;
  championGod: boolean;
}

interface IChampionCardProps {
  championData: ChampionData;
}

export default function ChampionCard({ championData }: IChampionCardProps) {
  return (
    <View>
      <Image
        source={{ uri: championData.championIcon }}
        style={{
          width: 50,
          height: 50,
        }}
      />
      <Text>
        {championData.championName}, {championData.championTitle}
      </Text>
      <Text>{championData.championPartype}</Text>
      <Text>{championData.championTags}</Text>
      <Text>
        Level {championData.championLevel} ({championData.championExp})
      </Text>
      <Text>Season milestone: {championData.seasonMilestone}</Text>
      <Text>
        {"Last played at "}
        {new Date(championData.championLastPlayed).toDateString()}
      </Text>
      <Text>
        Marks required for next level: {championData.markRequiredForNextLevel}
      </Text>
      <Text>Tokens earned: {championData.tokensEarned}</Text>
      <Text>{championData.championGod ? "God" : "Played"}</Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
      <Text></Text>
    </View>
  );
}
