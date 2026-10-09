const calculateDistanceToISS = require("./calculateDistanceToISS")

function calculateSpeed(previousRecord, currentRecord) {
    const distance = calculateDistanceToISS(
        previousRecord.latitude, previousRecord.longitude,
        currentRecord.latitude, currentRecord.longitude
    )
    const previousTime = new Date(previousRecord.timestamp)
    console.log(previousTime);
    
    const currentTime = new Date(currentRecord.timestamp)
    console.log(currentTime);
    const differenceInTime = (currentTime - previousTime) / (1000 * 60 * 60);
    return distance / differenceInTime
}

module.exports = calculateSpeed