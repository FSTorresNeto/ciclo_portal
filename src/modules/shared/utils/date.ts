import dayjs from "dayjs";
import ptBR from "dayjs/locale/pt-br";
import customParseFormat from "dayjs/plugin/customParseFormat";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.extend(customParseFormat);
dayjs.locale(ptBR);

export const date = dayjs;
