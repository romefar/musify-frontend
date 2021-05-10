export const calculateDuration = (duration: number | undefined, ms = true) => {
  const diff = ms ? 60000 : 60;
  const appr = ms ? 1000 : 1;
  const minutes = duration ? Math.floor(duration / diff) : null;
  const seconds = duration ? (duration % diff) / appr : null;

  if (!minutes || !seconds) {
    return 'N/A';
  }

  const formattedSeconds = `${seconds}`.length === 1 ? `${seconds}0` : seconds;
  const formattedDuration = `${minutes}:${formattedSeconds}`;

  return formattedDuration;
}
