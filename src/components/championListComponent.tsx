import {
  View,
  FlatList,
  TextInput,
  StyleSheet,
  TouchableHighlight,
  TouchableWithoutFeedback,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";
import ChampionListItemComponent from "./championListItemComponent";
import { LinearGradient } from "expo-linear-gradient";
import FontAwesome from "@expo/vector-icons/FontAwesome";

enum Filter {
  DISABLED,
  NEITHER,
  PLAYED,
  GOD,
}

interface ChampionType {
  key: string;
  name: string;
}

export default function ChampionListComponent() {
  const [champions, setChampions] = useState<ChampionType[]>([
    {
      key: "266",
      name: "Aatrox",
    },
    {
      key: "103",
      name: "Ahri",
    },
    {
      key: "84",
      name: "Akali",
    },
  ]);
  const [search, setSearch] = useState("");
  const [searchFocus, setSearchFocus] = useState(false);

  const [filter, setFilter] = useState(Filter.DISABLED);
  const [filterFocus, setFilterFocus] = useState(false);

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
                onFocus={() => setSearchFocus(true)}
                onEndEditing={() => setSearchFocus(false)}
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
                  style={{ display: search === "" ? "none" : undefined }}
                  size={20}
                  name="close"
                  color="#F0E6D2"
                />
              </TouchableHighlight>
            </LinearGradient>
          </LinearGradient>
          {/*Filter dropdown*/}
          <LinearGradient
            style={s.filterBorder}
            colors={
              filterFocus ? ["#785A28", "#785A28"] : ["#C8AA6E", "#785A28"]
            }
          >
            <LinearGradient
              style={s.filterBackground}
              colors={
                filterFocus ? ["#010A13", "#1E282D"] : ["#0f171f", "#0f171f"]
              }
            >
              <TouchableWithoutFeedback>
                <Picker
                  style={s.filter}
                  selectedValue={filter}
                  onValueChange={(itemValue, itemIndex) => setFilter(itemValue)}
                >
                  <Picker.Item label="Neither" value={Filter.NEITHER} />
                  <Picker.Item label="Played" value={Filter.PLAYED} />
                  <Picker.Item label="God" value={Filter.GOD} />
                </Picker>
              </TouchableWithoutFeedback>
            </LinearGradient>
          </LinearGradient>
        </View>
      </View>
      <View style={s.scroll}>
        <FlatList
          data={champions.filter((el) =>
            el.name.toLowerCase().includes(search.toLowerCase()),
          )}
          renderItem={({ item }) => (
            <ChampionListItemComponent id={item.key} name={item.name} />
          )}
          keyExtractor={(item) => item.key}
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
    flex: 3,
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
  filter: {
    backgroundColor: "blue",
    height: "100%",
    width: "100%",
  },
  filterBorder: {
    flex: 2,
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#010A13",
  },
  filterBackground: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    height: "100%",
    margin: 1.5, // <-- Border Width
    marginRight: 2,
  },
});
