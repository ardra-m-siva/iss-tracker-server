const cron = require('node-cron')
const spaceStationModel = require('../models/spaceStationModel')

cron.schedule('*/10 * * * * *', async () => {
    try {
        const result = await fetch('http://api.open-notify.org/iss-now.json')
        if (result.status == 200) {
            const response = await result.json()
            console.log(response);
            const { latitude, longitude } = response.iss_position
            const timestamp = new Date(Number(response.timestamp) * 1000)
            const newRecord = new spaceStationModel({
                latitude,
                longitude,
                timestamp
            })
            await newRecord.save()
        }
        const anHourAgoTime = Date.now() - 60 * 60 * 1000;
        await spaceStationModel.deleteMany({
            timestamp: {
                $lt: anHourAgoTime
            }
        })
        console.log("here");
        
    } catch (err) {
        console.log(err);
    }
})