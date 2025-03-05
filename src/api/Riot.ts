const API_KEY = process.env.EXPO_PUBLIC_RIOT_API;
const RIOT_CDN_VERSION = process.env.EXPO_PUBLIC_RIOT_CDN_VERSION;

const GAME_MODE = "CHERRY";

if (API_KEY === undefined || API_KEY.length === 0) {
  throw new Error("Not riot api key in env");
}

if (RIOT_CDN_VERSION === undefined || RIOT_CDN_VERSION.length === 0) {
  throw new Error("No riot cdn version in env");
}

//#region Account
export interface RiotAccount {
  puuid: string;
  gameName: string;
  tagLine: string;
}
//#endregion

//#region Match
export interface MatchParticipant {
  puuid: string;
  championName: string;
  placement: number;
}

export interface MatchInfo {
  participants: MatchParticipant[];
}

export interface MatchDetails {
  info: MatchInfo;
}
//#endregion

//#region Champion
export interface ChampionInfo {
  id: string;
  name: string;
  title: string;
  image: {
    full: string;
  };
  tags: string[];
  partype: string;
}

export interface ChampionsList {
  data: Record<string, ChampionInfo>;
}
//#endregion

/**
 * Helper function for making a fetch request, handles fetch error and json parsing error
 * @type T The type of the response
 * @param url
 * @returns A promise of type T
 */
async function FetchRequest<T>(url: string) {
  return new Promise<T>((resolve, reject) => {
    fetch(url)
      .then((response) => {
        if (response.ok) {
          response
            .json()
            .then((json: T) => {
              resolve(json);
            })
            .catch((err) => reject("ERROR PARSING JSON " + err));
        } else {
          reject(
            "RESPONSE DIDN'T RETURN STATUS OK: " + response.status + " " + url,
          );
        }
      })
      .catch((err) => reject("ERROR FETCHING " + err));
  });
}

/**
 * Main class for handling communication with the Rioat API
 */
export class RiotService {
  /**
   * Fetch player account details
   * @param gameName Player name in game
   * @param tagLine Player tag in game
   * @param region Player region
   * @returns Promise of Account details
   */
  public static async FetchAccountInfo(
    gameName: string,
    tagLine: string,
    region: string,
  ): Promise<RiotAccount> {
    const url = `https://${region}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${API_KEY}`;

    return FetchRequest<RiotAccount>(url);
  }

  /**
   * Fetch player's match history
   * @param puuid Player's uuid
   * @param region Player's region
   * @param count How many matchs to fetch
   * @returns Promise of list of Match ids
   */
  public static FetchMatchHistory(
    puuid: string,
    region: string,
    count: number,
  ): Promise<string[]> {
    const start = 0;
    const url = `https://${region}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}&api_key=${API_KEY}`;

    return FetchRequest<string[]>(url);
  }

  /**
   * Fetch match detail
   * @param matchId Match id
   * @param region Match region
   * @returns Promise of match details
   */
  public static FetchMatchDetails(
    matchId: string,
    region: string,
  ): Promise<MatchDetails> {
    const url = `https://${region}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${API_KEY}`;

    return FetchRequest<MatchDetails>(url);
  }

  /**
   * Fetch list of champions
   * @param languageCode Language code, ex: en_GB, fr_FR
   * @returns Promise of champion list
   */
  public static FetchChampions(languageCode: string): Promise<ChampionsList> {
    const url = `https://ddragon.leagueoflegends.com/cdn/${RIOT_CDN_VERSION}/data/${languageCode}/champion.json`;

    return FetchRequest<ChampionsList>(url);
  }

  // public static FetchChampion(
  //   languageCode: string,
  //   championName: string,
  // ): Promise<object> {
  //   const url = `https://ddragon.leagueoflegends.com/cdn/${RIOT_CDN_VERSION}/data/${languageCode}/champion/${championName}.json`;

  //   return FetchRequest<object>(url);
  // }

  /**
   * Get full url of the champion icon from the image file
   * @param championImageFull The image file of the champion icon
   * @returns Full URL of the champion image icon
   */
  public static GetChampionImage(championImageFull: string): string {
    const url = `https://ddragon.leagueoflegends.com/cdn/${RIOT_CDN_VERSION}/img/champion/${championImageFull}`;

    return url;
  }

  /*
  public static FetchAndDisplayMatchHistory(
    gameName: string,
    tagLine: string,
    region: string,
  ) {
    const accInfo = this.FetchAccountInfo(gameName, tagLine, region);
    const PUUID = accInfo.puuid;
    console.log("PUUID: " + PUUID);
    const matchIds = fetchMatchHistory(PUUID, region);

    matchIds.forEach(function (matchId) {
      try {
        const matchDetails = fetchMatchDetails(matchId, region);
        if (matchDetails.info.gameMode === GAME_MODE) {
          matchDetails.info.participants.forEach(function (participant) {
            if (participant.puuid === PUUID && participant.placement === 1) {
              const champName = participant.championName
                .replace(/[^a-zA-Z0-9]/g, "")
                .toLowerCase();
              championsRange.forEach(function (row, index) {
                const rowChamp = row[0]
                  .replace(/[^a-zA-Z0-9]/g, "")
                  .toLowerCase();
                if (
                  rowChamp === champName ||
                  rowChamp === champName + "willump" ||
                  rowChamp === champName + "glasc" ||
                  (rowChamp === "wukong" && champName === "monkeyking")
                ) {
                  console.log("God on " + participant.championName);
                }
              });
            }
            if (participant.puuid === PUUID) {
              const champName = participant.championName
                .replace(/[^a-zA-Z0-9]/g, "")
                .toLowerCase();
              championsRange.forEach(function (row, index) {
                const rowChamp = row[0]
                  .replace(/[^a-zA-Z0-9]/g, "")
                  .toLowerCase();
                if (
                  rowChamp === champName ||
                  rowChamp === champName + "willump" ||
                  rowChamp === champName + "glasc" ||
                  (rowChamp === "wukong" && champName === "monkeyking")
                ) {
                  console.log("Ocean on " + participant.championName);
                }
              });
            }
          });
        }
      } catch (e) {
        Logger.log(
          "Error processing match ID " + matchId + ": " + e.toString(),
        );
      }
    });
  }
    */
}
