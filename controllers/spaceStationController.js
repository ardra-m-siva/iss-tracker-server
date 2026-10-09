const { handleError } = require("../helpers/handleError")
const spaceStationModel = require("../models/spaceStationModel");
const calculateDistanceToISS = require("../utils/calculateDistanceToISS");
const calculateSpeed = require("../utils/calculateSpeed");

module.exports.currentLocation = async (req, res) => {
    try {
        const date = new Date();
        const latestPosition = await spaceStationModel.findOne({
            timestamp: {
                $lt: date
            }
        }).sort({ timestamp: -1 })
        if (!latestPosition) {
            return { code: 404, message: "Current position not found" }
        }
        return { message: "Current position fetched successfully", data: latestPosition }
    } catch (error) {
        handleError(error)
    }
}

module.exports.allPositionFromLastOneHour = async (req, res) => {
    try {
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
        const allDataFromLastOneHour = await spaceStationModel.find({
            timestamp: {
                $gte: oneHourAgo
            }
        }).select('latitude longitude timestamp').sort({ timestamp: 1 })
        if (!allDataFromLastOneHour) {
            return { code: 404, message: "Data not found" }
        }
        return { message: "All position fetched successfully", data: allDataFromLastOneHour }
    } catch (error) {
        handleError(error)
    }
}

module.exports.distanceToSpecifiedLoc = async (req, res) => {
    try {
        const { lat, lng } = req.query
        const date = new Date();
        const latestPosition = await spaceStationModel.findOne({
            timestamp: {
                $lt: date
            }
        }).sort({ timestamp: -1 })
        console.log(latestPosition);
        const distance = calculateDistanceToISS(latestPosition.latitude, latestPosition.longitude, lat, lng)
        console.log(distance);

        return { message: "Distance calcualtion along earth surface is successfully fetched", data: { distance, unit: 'kilometers' } }
    } catch (error) {
        handleError(error)
    }
}

module.exports.timeWhenIssIsCloseToSpecifiedLoc = async (req, res) => {
    try {
        const lat = Number(req.query.lat);
        const lng = Number(req.query.lng);
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000)
        console.log(oneHourAgo);

        const allDataFromLastOneHour = await spaceStationModel.find({
            timestamp: { $gt: oneHourAgo }
        }).lean();
        console.log(allDataFromLastOneHour);

        let dataOfClosest;
        let minDist = Infinity;
        for (const data of allDataFromLastOneHour) {
            const distance = calculateDistanceToISS(data.latitude, data.longitude, lat, lng)
            if (distance < minDist) {
                minDist = distance
                dataOfClosest = data
            }
        }
        return { message: "The shorted distance fetched successfully", data: { distance: minDist, unitOfDistance: 'kilometers', ...dataOfClosest } }
    } catch (error) {
        handleError(error)
    }
}

module.exports.getSpeedOfISS = async (req, res) => {
    try {
        const lastTwoRecord = await spaceStationModel.find({}).sort({ timestamp: -1 }).limit(2).lean();
        if (lastTwoRecord.length < 2) {
            return { code: 400, message: "Not enough records to calculate the speed" }
        }
        const speed = calculateSpeed(lastTwoRecord[1], lastTwoRecord[0])
        return { message: 'Speed retrieved successfully', data: { speed, unit: 'kilometer/hour' } }
    } catch (error) {
        handleError(error)

    }
}