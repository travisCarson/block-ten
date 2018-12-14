const decorateWithPerformanceTools = function(
  queueAndResultsControllerInstance
) {
  const qARCI = queueAndResultsControllerInstance;

  qARCI.syncStats = function() {
    const results = [];
    qARCI.peakIndexes.forEach(peakIndex => {
      let peakValue = qARCI.peaksAndTroughs[peakIndex];
      let lowestTrough = peakValue;
      let newTrough = false;
      for (let i = peakIndex; i < qARCI.peaksAndTroughs.length; i++) {
        let currentValue;
        if (qARCI.peaksAndTroughs[i]) {
          currentValue = qARCI.peaksAndTroughs[i];
        }
        if (currentValue < lowestTrough) {
          newTrough = true;
          lowestTrough = currentValue;
        }
        if (qARCI.peakIndexes.includes(i + 1)) {
          break;
        }
      }
      if (newTrough) {
        results.push(peakValue);
        results.push(lowestTrough);
      }
    });
    qARCI.largestRecovery(results);
    return results;
  };

  qARCI.analyzePerformance = function(
    maxDifference,
    headBlockNum,
    lastResultNum,
    lastNumEnqueued,
    queueDifference,
    resultsDifference
  ) {
    console.log(
      "head",
      headBlockNum,
      "difference",
      maxDifference,
      "recent result",
      lastResultNum,
      "recent queued",
      lastNumEnqueued,
      "weak link",
      queueDifference > resultsDifference ? "queue" : "results"
    );
    if (maxDifference > qARCI.maxMaxDifference) {
      qARCI.maxMaxDifference = maxDifference;
      qARCI.maxMaxDifferenceTime = new Date().toLocaleTimeString();
      qARCI.peaksAndTroughs.push(maxDifference);
      qARCI.peakIndexes.push(qARCI.peaksAndTroughs.length - 1);
      qARCI.lastPeakValue = maxDifference;
      qARCI.lastTroughValue = 1000;
    }
    // recovery
    if (
      maxDifference < qARCI.lastPeakValue &&
      maxDifference < qARCI.lastTroughValue
    ) {
      qARCI.lastTroughValue = maxDifference;
      qARCI.peaksAndTroughs.push(maxDifference);
      qARCI.syncStats();
    }
  };

  qARCI.largestRecovery = function(array) {
    let largestRecovery = 0;
    let recoveryDescription = "";
    for (let i = 1; i < array.length; i += 2) {
      const peak = array[i - 1];
      const trough = array[i];
      const recovery = peak - trough;
      if (recovery > largestRecovery) {
        largestRecovery = recovery;
        recoveryDescription = `----------------------------------------
        \n${new Date().toLocaleTimeString()} ${peak} => ${trough} for a spread of ${largestRecovery}
        \nHighest Peak: ${qARCI.maxMaxDifference} at ${
          qARCI.maxMaxDifferenceTime
        }
        \nPeaks and Troughs: ${array}
        \n`;
      }
    }
    if (largestRecovery > qARCI.largestSpread) {
      qARCI.largestSpread = largestRecovery;
      console.log(recoveryDescription);
    }
    return recoveryDescription;
  };

  qARCI.resetPerformanceStats = function() {
    qARCI.lastPeak = null;
    qARCI.lastTroughValue = 1000;
    qARCI.maxMaxDifference = 0;
    qARCI.maxMaxDifferenceTime = "";
    qARCI.peaksAndTroughs = [];
    qARCI.peakIndexes = [];
    qARCI.largestSpread = 0;
  };

  qARCI.resetPerformanceStats();
};

module.exports = {
  decorateWithPerformanceTools
};
