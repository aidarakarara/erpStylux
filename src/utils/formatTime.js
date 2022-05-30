import { format, formatDistanceToNow } from "date-fns";

// ----------------------------------------------------------------------

export function fDate(date) {
  return format(new Date(date), "dd MMMM yyyy");
}

export function fDateTime(date) {
  return format(new Date(date), "dd MMM yyyy HH:mm");
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), "dd/MM/yyyy hh:mm p");
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true,
  });
}

export function formatdate(date) {
  let d = new Date(date);
  let mois = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
  let jour = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
  return `${jour}/${mois}/${d.getFullYear()}`;
}
