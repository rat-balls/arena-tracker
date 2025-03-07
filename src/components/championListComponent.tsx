import {
  View,
  FlatList,
  TextInput,
  Text,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { useRef, useState } from "react";
import ChampionListItemComponent from "./championListItemComponent";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "@expo/vector-icons/FontAwesome";

enum Filter {
  DISABLED = "All Champions",
  NEITHER = "Neither",
  PLAYED = "Played",
  GOD = "God",
}

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
  played?: boolean;
  god?: boolean;
}

export default function ChampionListComponent(champions: {
  champions: ChampionData[];
}) {
  const inputRef = useRef<TextInput>(null);

  const [search, setSearch] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);

  const [filter, setFilter] = useState(Filter.DISABLED);
  const [filterFocus, setFilterFocus] = useState(false);

  function blurSearch() {
    if (inputRef.current !== null) {
      inputRef.current.blur();
    }
  }

  return (
    <View style={s.container}>
      <View style={{ height: 50, margin: 10 }}>
        <View style={s.header}>
          {/*Search bar*/}
          <LinearGradient
            style={s.searchBorder}
            colors={
              searchFocus ? ["#785A28", "#C8AA6E"] : ["#785A28", "#785A28"]
            }
          >
            <LinearGradient
              style={s.searchBackground}
              colors={
                searchFocus ? ["#010A13", "#1E282D"] : ["#000000", "#000000"]
              }
            >
              <FontAwesome size={16} name="search" color="#F0E6D2" />
              <TextInput
                ref={inputRef}
                onFocus={() => setSearchFocus(true)}
                onBlur={() => setSearchFocus(false)}
                style={s.search}
                onChangeText={setSearch}
                value={search}
                placeholder={"Search"}
                placeholderTextColor="#A09B8C"
                cursorColor="#A09B8C"
                submitBehavior="blurAndSubmit"
              ></TextInput>
              <TouchableHighlight onPress={() => setSearch("")}>
                <FontAwesome
                  style={{
                    display: search === "" ? "none" : undefined,
                    marginLeft: -5,
                  }}
                  size={20}
                  name="close"
                  color="#F0E6D2"
                />
              </TouchableHighlight>
            </LinearGradient>
          </LinearGradient>
          <View style={{ flex: 2 }}>
            {/*Filter dropdown*/}
            <LinearGradient
              style={s.filterBorder}
              colors={
                filterFocus ? ["#463714", "#463714"] : ["#C8AA6E", "#785A28"]
              }
            >
              <LinearGradient
                style={s.filterBackground}
                colors={
                  filterFocus ? ["#0f171f", "#0f171f"] : ["#0f171f", "#0f171f"]
                }
              >
                <TouchableHighlight
                  onPress={() => {
                    setFilterFocus(!filterFocus);
                    blurSearch();
                  }}
                >
                  <View style={s.filter}>
                    <Text
                      style={[
                        s.filterText,
                        { color: filterFocus ? "#463714" : "#A09B8C" },
                      ]}
                    >
                      {filter}
                    </Text>
                    <FontAwesome
                      size={20}
                      name="arrows-v"
                      color={filterFocus ? "#463714" : "#C8AA6E"}
                    />
                  </View>
                </TouchableHighlight>
              </LinearGradient>
            </LinearGradient>
            {/*Dropdown Items*/}
            <View
              style={[
                s.dropdownContainer,
                { display: filterFocus ? undefined : "none" },
              ]}
            >
              <TouchableHighlight
                onPress={() => {
                  setFilterFocus(false);
                  blurSearch();
                  setFilter(Filter.DISABLED);
                }}
              >
                <View style={s.dropdown}>
                  <Text style={s.dropdownText}>All Champions</Text>
                  <FontAwesome
                    size={20}
                    name="check"
                    color="#F0E6D2"
                    style={{
                      display: filter !== Filter.DISABLED ? "none" : undefined,
                    }}
                  />
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                  setFilterFocus(false);
                  blurSearch();
                  setFilter(Filter.NEITHER);
                }}
              >
                <View style={s.dropdown}>
                  <Text style={s.dropdownText}>Neither</Text>
                  <FontAwesome
                    size={20}
                    name="check"
                    color="#F0E6D2"
                    style={{
                      display: filter !== Filter.NEITHER ? "none" : undefined,
                    }}
                  />
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                  setFilterFocus(false);
                  blurSearch();
                  setFilter(Filter.PLAYED);
                }}
              >
                <View style={s.dropdown}>
                  <Text style={s.dropdownText}>Ocean</Text>
                  <FontAwesome
                    size={20}
                    name="check"
                    color="#F0E6D2"
                    style={{
                      display: filter !== Filter.PLAYED ? "none" : undefined,
                    }}
                  />
                </View>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={() => {
                  setFilterFocus(false);
                  blurSearch();
                  setFilter(Filter.GOD);
                }}
              >
                <View style={s.dropdown}>
                  <Text style={s.dropdownText}>God</Text>
                  <FontAwesome
                    size={20}
                    name="check"
                    color="#F0E6D2"
                    style={{
                      display: filter !== Filter.GOD ? "none" : undefined,
                    }}
                  />
                </View>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
      <View style={s.scroll}>
        <FlatList
          style={{ width: "100%" }}
          data={
            filter === Filter.DISABLED
              ? champions.champions.filter((el) =>
                  el.championName.toLowerCase().includes(search.toLowerCase()),
                )
              : filter === Filter.NEITHER
                ? champions.champions
                    .filter((el) =>
                      el.championName
                        .toLowerCase()
                        .includes(search.toLowerCase()),
                    )
                    .filter((el) => !el.played)
                : filter === Filter.PLAYED
                  ? champions.champions
                      .filter((el) =>
                        el.championName
                          .toLowerCase()
                          .includes(search.toLowerCase()),
                      )
                      .filter((el) => el.played)
                  : filter === Filter.GOD
                    ? champions.champions
                        .filter((el) =>
                          el.championName
                            .toLowerCase()
                            .includes(search.toLowerCase()),
                        )
                        .filter((el) => el.god)
                    : champions.champions.filter((el) =>
                        el.championName
                          .toLowerCase()
                          .includes(search.toLowerCase()),
                      )
          }
          renderItem={({ item }) => (
            <ChampionListItemComponent
              mastery={item.championLevel}
              imgUrl={item.championIcon}
              name={item.championName}
              played={item.played!}
              god={item.god!}
            />
          )}
        />
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    flexDirection: "row",
    height: 50,
  },
  scroll: {
    flex: 1,
    flexWrap: "wrap",
    width: "100%",
  },
  search: {
    color: "#A09B8C",
    paddingLeft: 15,
    fontFamily: "Spiegel SemiBold",
    letterSpacing: 1,
    fontSize: 15,
    height: "100%",
    width: "85%",
  },
  searchBorder: {
    flex: 2,
    marginRight: 5,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#010A13",
  },
  searchBackground: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
    paddingHorizontal: 10,
    margin: 1.5, // <-- Border Width
    marginRight: 2,
  },
  filterBorder: {
    flex: 2,
    marginRight: 5,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#010A13",
  },
  filterBackground: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
    margin: 1.5, // <-- Border Width
    marginRight: 2,
  },
  filter: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 10,
  },
  filterText: {
    color: "#A09B8C",
    fontFamily: "Beaufort Bold",
    fontSize: 15,
  },
  dropdownContainer: {
    borderWidth: 2,
    borderColor: "#463714",
    backgroundColor: "#010A13",
    position: "absolute",
    top: 49,
    left: 1.5,
    width: "96%",
    zIndex: 10,
  },
  dropdown: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 13,
    paddingHorizontal: 10,
    width: "100%",
    borderTopColor: "#1E282D",
    borderTopWidth: 1,
  },
  dropdownText: {
    color: "#ccbf91",
    fontFamily: "Spiegel SemiBold",
    fontSize: 15,
  },
});
