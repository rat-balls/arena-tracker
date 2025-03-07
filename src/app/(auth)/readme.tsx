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

- Track your progress for the Arena God and Ocean achievement in league of legends !
- Add your accounts in favorite to start tracking them ! (and import pictures to modify their profile picture)
`;

export default function Readme() {
  return (
    <ScrollView style={styles.container}>
      <Markdown
        style={{
          text: { color: "#A09B8C" },
        }}
      >
        {markdownContent}
      </Markdown>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    backgroundColor: "#091428",
    paddingVertical: 20,
  },
  text: {
    color: "#A09B8C",
  },
});
