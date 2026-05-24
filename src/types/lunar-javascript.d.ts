declare module "lunar-javascript" {
  export class Solar {
    static fromYmd(year: number, month: number, day: number): Solar;
    static fromYmdHms(year: number, month: number, day: number, hour: number, minute: number, second: number): Solar;
    getLunar(): Lunar;
    toFullString(): string;
  }

  export class Lunar {
    static fromYmd(year: number, month: number, day: number): Lunar;
    toFullString(): string;
  }

  export class EightChar {
    static fromLunar(lunar: Lunar): EightChar;
    getYear(): string;
    getYearGan(): string;
    getYearZhi(): string;
    getYearGanIndex(): number;
    getYearZhiIndex(): number;
    getYearWuXing(): string;
    getYearNaYin(): string;
    getYearShengXiao(): string;
    getYearShiShenGan(): string;
    getYearShiShenZhi(): string[];
    getYearHideGan(): string[];
    getYearXun(): string;
    getYearXunKong(): string;
    getYearDiShi(): string;

    getMonth(): string;
    getMonthGan(): string;
    getMonthZhi(): string;
    getMonthGanIndex(): number;
    getMonthZhiIndex(): number;
    getMonthWuXing(): string;
    getMonthNaYin(): string;
    getMonthShiShenGan(): string;
    getMonthShiShenZhi(): string[];
    getMonthHideGan(): string[];
    getMonthXun(): string;
    getMonthXunKong(): string;
    getMonthDiShi(): string;

    getDay(): string;
    getDayGan(): string;
    getDayZhi(): string;
    getDayGanIndex(): number;
    getDayZhiIndex(): number;
    getDayWuXing(): string;
    getDayNaYin(): string;
    getDayShiShenGan(): string;
    getDayShiShenZhi(): string[];
    getDayHideGan(): string[];
    getDayXun(): string;
    getDayXunKong(): string;
    getDayDiShi(): string;

    getTime(): string;
    getTimeGan(): string;
    getTimeZhi(): string;
    getTimeGanIndex(): number;
    getTimeZhiIndex(): number;
    getTimeWuXing(): string;
    getTimeNaYin(): string;
    getTimeShiShenGan(): string;
    getTimeShiShenZhi(): string[];
    getTimeHideGan(): string[];
    getTimeXun(): string;
    getTimeXunKong(): string;
    getTimeDiShi(): string;

    getTaiYuan(): string;
    getTaiYuanNaYin(): string;
    getMingGong(): string;
    getMingGongNaYin(): string;
    getShenGong(): string;
    getShenGongNaYin(): string;
    getTaiXi(): string;
    getTaiXiNaYin(): string;
    getYun(): string;
    getSect(): number;
  }
}
