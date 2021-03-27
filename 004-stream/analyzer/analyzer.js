function createAnalyzer() {
  const state = {
    winCount: 0,
    loseCount: 0,
  };

  function handleChunk(chunk) {
    state.winCount = chunk.match(/win/gi).length;
    state.loseCount = chunk.match(/lose/gi).length;
  }

  function handleEnd() {
    const numberOfRounds = state.winCount + state.loseCount;

    console.log(`
      Number of rounds: ${numberOfRounds}
      Number of wins: ${state.winCount},
      Number of losses: ${state.loseCount},
      Percent of wins: ${(state.winCount / numberOfRounds) * 100}%
    `);
  }

  return {
    handleChunk,
    handleEnd,
  };
}

exports.createAnalyzer = createAnalyzer;
