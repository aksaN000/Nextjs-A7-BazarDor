import type { Unit } from "./types";

const bnNumber = new Intl.NumberFormat("bn-BD", { maximumFractionDigits: 2 });
const bnPercent = new Intl.NumberFormat("bn-BD", {
  minimumFractionDigits: 1,
  maximumFractionDigits: 1,
});

export function toBn(value: number) {
  return bnNumber.format(value);
}

export function toBnPercent(value: number) {
  return `${bnPercent.format(Math.abs(value))}%`;
}

export function taka(value: number) {
  return `${toBn(value)} টাকা`;
}

const UNIT_NAMES: Record<Unit, string> = {
  kg: "কেজি",
  litre: "লিটার",
  dozen: "ডজন",
  piece: "পিস",
};

export function unitName(unit: Unit) {
  return UNIT_NAMES[unit] ?? unit;
}

export function perUnit(unit: Unit) {
  return `প্রতি ${unitName(unit)}`;
}

export function banglaDate(date = new Date()) {
  return new Intl.DateTimeFormat("bn-BD", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "Asia/Dhaka",
  }).format(date);
}
