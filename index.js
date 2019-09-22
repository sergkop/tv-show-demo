const fetch = require('node-fetch');

async function getShowStatus(name) {
  // Find show by name
  let response = await fetch(
    `https://api.tvmaze.com/singlesearch/shows?q=${encodeURIComponent(name)}`,
  );
  if (!response.ok) {
    throw new Error("Couldn't find the show");
  }
  const info = await response.json();

  // Get a list of episodes
  response = await fetch(`https://api.tvmaze.com/shows/${info.id}/episodes`);
  if (!response.ok) {
    throw new Error("Couldn't retrieve information on the show");
  }
  const episodes = await response.json();

  // Analyze the last announced episode
  let status;
  const firstUnannouncedIndex = episodes.findIndex(
    episode => !episode.airstamp,
  );
  const now = new Date();
  const nextEpisodeIndex = episodes.findIndex(
    episode => episode.airstamp && new Date(episode.airdate) > now,
  );
  if (nextEpisodeIndex >= 0) {
    const episode = episodes[nextEpisodeIndex];
    status = `The next episode will air on ${episode.airdate}`;
  } else {
    if (firstUnannouncedIndex >= 0) {
      const episode = episodes[firstUnannouncedIndex];
      status = `${episode.name} from season ${episode.season} was announced, but no date yet`;
    } else {
      if (episodes.length > 0) {
        // BUG: show the date of last episode
        status = 'The show has ended';
      } else {
        status = 'The show has no episodes announced';
      }
    }
  }

  return {
    name: info.name,
    status,
  };
}

module.exports = {getShowStatus};
