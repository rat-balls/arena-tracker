import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { useFonts } from "expo-font";

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
  god: boolean;
  played: boolean;
}

interface IChampionCardProps {
  championData: ChampionData;
}
let customFonts = {
  League: require("../assets/fonts/League.otf"),
};

export default function ChampionCard({ championData }: IChampionCardProps) {
  useFonts(customFonts);
  return (
    <View style={[championData.god ? styles.godCard : styles.card]}>
      <Image source={{ uri: championData.championIcon }} style={styles.image} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{championData.championName}</Text>
        <Text style={styles.title}>{championData.championTitle}</Text>
        <Text style={styles.level}>Level {championData.championLevel}</Text>
        <Text style={styles.exp}>EXP: {championData.championExp}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#111",
    borderColor: "#c9aa71",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
    shadowColor: "#c9aa71",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
  },
  godCard: {
    backgroundColor: "#006400",
    borderColor: "#c9aa71",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 2,
    shadowColor: "#c9aa71",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 5,
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 5,
    borderColor: "#c9aa71",
    borderWidth: 1,
  },
  infoContainer: {
    marginLeft: 10,
    flex: 1,
  },
  name: {
    color: "#ffd700",
    fontSize: 20,
    fontWeight: "bold",
    fontFamily: "League",
  },
  title: {
    color: "#bbb",
    fontSize: 14,
    fontStyle: "italic",
  },
  level: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
  exp: {
    color: "#ccc",
    fontSize: 14,
  },
});
