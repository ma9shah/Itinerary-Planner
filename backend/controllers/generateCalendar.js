const ics = require('ics')
const { writeFileSync } = require('fs')
const path = require('path')

const generateCalendarController = async (req, res) => {
    try {
        let { routes } = req.body
        let events = []
        for (let day of routes) {
            currDate = day.date
            for (let r of day.route.route) {
                // console.log((r.startTime - r.startTime % 100) / 10 ** (r.startTime.toString().length - 2),)
                events.push({
                    title: r.name,
                    start: [parseInt(currDate.slice(0, 4)),
                    parseInt(currDate.slice(5, 7)),
                    parseInt(currDate.slice(8, 10)),
                    (r.startTime - r.startTime % 100) / 100,
                    r.startTime % 100
                    ],
                    end: [parseInt(currDate.slice(0, 4)),
                    parseInt(currDate.slice(5, 7)),
                    parseInt(currDate.slice(8, 10)),
                    (r.endTime - r.endTime % 100) / 100,
                    r.endTime % 100
                    ],
                    location: r.formatted_address
                })
            }
        }
        // console.log(events)
        const { error, value } = ics.createEvents(events)
        console.log("Please print something!", value)
        // console.log("Please print something!", calError)
        // console.log(ics.createEvents(events))
        if (error) {
            console.log(error)
            return
        }

        let icsFileFolder = path.join(__dirname, '../icsFiles/')
        let filename_path = `${icsFileFolder}/event_${Date.now()}.ics`
        
        // await is not needed here
        await writeFileSync(filename_path, value)
        res.set('Content-Type', 'text/calendar')
        res.download(filename_path)

        // res.attachment(filename_path)
        // res.send({ value })

    } catch (err) {
        console.log("Error from /generateCalendar", err)
    }
}

module.exports = generateCalendarController

// ICS REFERENCE:
    // const { error, value } = ics.createEvents([
    //   {
    //     title: 'Lunch',
    //     start: [2018, 1, 15, 12, 15],
    //     duration: { minutes: 45 }
    //   },
    //   {
    //     title: 'Dinner',
    //     start: [2018, 1, 15, 12, 15],
    //     duration: { hours: 1, minutes: 30 }
    //   }
    // ])