import React from "react";
import { ScrollView, StyleSheet } from "react-native";
import Markdown from "react-native-markdown-display";

const markdownContent = `
# Arena Tracker

Arena Tracker is an application that allows League of Legends players to track the champions with whom they have won a game in the Arena game mode. This tracking is done using [Riot Games](https://developer.riotgames.com/docs/lol) API.

## Built with


### Expo


## Team

- Ethan DELALANDE
- Jathurshan SIVANANTHAN
- Noé HEY-LE MADEC

## Features

- Track winning champions in the Arena game mode.
- Add accounts in favorite for tracking them (and import pictures for modify their profile picture).
`;

export default function Readme() {
  return (
    <ScrollView style={styles.container}>
      <Markdown>{markdownContent}</Markdown>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
});
