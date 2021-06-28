smoothenPoints (locationsArray, lowerThreshold, higherThreshold) {
meanError = 0.0
nFrames = 3
lowerSmootheningThreshold = lowerThreshold
higherSmootheningThreshold = higherThreshold

  // oldShapesList is an array of List of type LandmarkPoint
  if (oldShapesList && oldShapesList.length == nFrames) {
    if (oldShapesList[0].length == locationsArray.length) {
      const distances = []
      for (let i = 0; i < oldShapesList[0].length; i++) {
        distances.push(distanceFrom(oldShapesList[0][i].x, oldShapesList[0][i].y, locationsArray[i].x, locationsArray[i].y))
      }
      for (let i = 0; i < distances.length; i++) {
        meanError = meanError + distances[i]
      }
      meanError = meanError / oldShapesList[0].length
      if (meanError > lowerSmootheningThreshold && meanError < higherSmootheningThreshold) {
        let updatedLocationsArray = dividedPointsArray(locationsArray, nFrames)
        for (let i = 1; i < nFrames; i++) {
          oldShapesList.push(i, oldShapesList[i - 1])
          updatedLocationsArray = addPointsArray(updatedLocationsArray, dividedPointsArray(oldShapesList[i], nFrames))
        }
        oldShapesList.push(updatedLocationsArray)
        locationsArray = updatedLocationsArray
      } else {
        if (meanError <= lowerSmootheningThreshold) {
          locationsArray = oldShapesList[0]
        } else {
          oldShapesList.push(locationsArray)
        }
      }
    } else {
      oldShapesList = []
    }
  } else {
    if (!oldShapesList) {
      oldShapesList = []
      for (let i = 0; i < nFrames; i++) { oldShapesList.push(locationsArray) }
    } else {
      if (oldShapesList.length > 0) { oldShapesList = [] }
      for (let i = 0; i < nFrames; i++) { oldShapesList.push(locationsArray) }
    }
  }
  return locationsArray
}
