import { RIOT_API_KEY, RIOT_CDN_VERSION } from "../config/env";

const REQUEST_COOLDOWN = 3e3; // eX = *10^X
const WaitingRequests: Record<string, boolean> = {};
let LAST_REQUEST = 0; // UNIX

// Any region can be chosen
const NEAREST_REGION = "europe";

const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

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
  gameMode: string;
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

export interface ChampionMastery {
  championId: number;
  championLevel: number;

  championPoints: number;
  championPointsSinceLastLevel: number;
  championPointsUntilNextLevel: number;
  championSeasonMilestone: number;
  markRequiredForNextLevel: number;

  lastPlayTime: number;

  tokensEarned: number;
}

//#endregion

/**
 * Helper function for making a fetch request, handles fetch error and json parsing error
 * @type T The type of the response
 * @param url
 * @returns A promise of type T
 */
async function FetchRequest<T>(url: string, nocooldown = false) {
  return new Promise<T>(async (resolve, reject) => {
    const now = Date.now();
    if (now - LAST_REQUEST < REQUEST_COOLDOWN && !nocooldown) {
      if (WaitingRequests[url] === true) return reject("TOO MUCH CALLS");
      WaitingRequests[url] = true;
      await delay(REQUEST_COOLDOWN);
      WaitingRequests[url] = false;
    } else {
      LAST_REQUEST = now;
    }

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
   * @returns Promise of Account details
   */
  public static async FetchAccountInfo(
    gameName: string,
    tagLine: string,
  ): Promise<RiotAccount> {
    const url = `https://${NEAREST_REGION}.api.riotgames.com/riot/account/v1/accounts/by-riot-id/${gameName}/${tagLine}?api_key=${RIOT_API_KEY}`;

    return FetchRequest<RiotAccount>(url);
  }

  /**
   * Fetch player's match history
   * @param puuid Player's uuid
   * @param count How many matchs to fetch
   * @returns Promise of list of Match ids
   */
  public static FetchMatchHistory(
    puuid: string,
    count: number,
  ): Promise<string[]> {
    const start = 0;
    const url = `https://${NEAREST_REGION}.api.riotgames.com/lol/match/v5/matches/by-puuid/${puuid}/ids?start=${start}&count=${count}&api_key=${RIOT_API_KEY}`;

    return FetchRequest<string[]>(url);
  }

  /**
   * Fetch match detail
   * @param matchId Match id
   * @returns Promise of match details
   */
  public static FetchMatchDetails(matchId: string): Promise<MatchDetails> {
    const url = `https://${NEAREST_REGION}.api.riotgames.com/lol/match/v5/matches/${matchId}?api_key=${RIOT_API_KEY}`;

    return FetchRequest<MatchDetails>(url);
  }

  /**
   * Fetch list of champions
   * @param languageCode Language code, ex: en_GB, fr_FR
   * @returns Promise of champion list
   */
  public static FetchChampions(languageCode: string): Promise<ChampionsList> {
    const url = `https://ddragon.leagueoflegends.com/cdn/${RIOT_CDN_VERSION}/data/${languageCode}/champion.json`;

    return FetchRequest<ChampionsList>(url, true);
  }

  /**
   * Get full url of the champion icon from the image file
   * @param championImageFull The image file of the champion icon
   * @returns Full URL of the champion image icon
   */
  public static GetChampionImage(championImageFull: string): string {
    const url = `https://ddragon.leagueoflegends.com/cdn/${RIOT_CDN_VERSION}/img/champion/${championImageFull}`;

    return url;
  }

  /**
   * Get champions mastery of player
   * @param puuid Player puuid
   * @param region Player region
   * @returns List of champion mastery
   */
  public static FetchChampionsMastery(
    puuid: string,
    region: string,
  ): Promise<ChampionMastery[]> {
    const url = `https://${region}.api.riotgames.com/lol/champion-mastery/v4/champion-masteries/by-puuid/${puuid}?api_key=${RIOT_API_KEY}`;
    return FetchRequest<ChampionMastery[]>(url);
  }

  /**
   * Utility to get god champions and played champions
   * @param matchDetails the match
   * @param puuid puuid
   * @returns god champions name array and played champions name array
   */
  public static ChampionsGodOrPlayed(
    playerMatchsDetails: MatchDetails[],
    puuid: string,
    gameMode: string,
  ): [string[], string[]] {
    const championsGod: string[] = [];
    const championsPlayed: string[] = [];

    playerMatchsDetails.forEach((matchDetails) => {
      if (matchDetails.info.gameMode !== gameMode) return;

      const participant = matchDetails.info.participants.filter(
        (p) => p.puuid === puuid,
      )[0];

      const god = participant.placement === 1;
      const champion = participant.championName;

      if (god) {
        championsGod.push(champion);
      } else {
        championsPlayed.push(champion);
      }
    });

    return [championsGod, championsPlayed];
  }
}
