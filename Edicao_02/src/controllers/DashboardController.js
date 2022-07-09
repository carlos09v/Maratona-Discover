const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    async index(req, res) {
        const jobs = await Job.get()
        const profile = await Profile.get()
        
        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length
        }

        // total de horas por dia de cada Job em progress
        let jobTotalHours = 0

        const updateJobs = jobs.map((job) => {
            // ajustes no job
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'
            
            // somar a quantidade de status
            statusCount[status] += 1
            
            // total de horas por dia de cada Job em progress
            /*
            if(status == 'progress') {
                jobTotalHours += Number(job['daily-hours'])
            }
            */

            // Ternário
            jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours 

            return {
                ...job, // Importar o objeto, espalhar
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["value-hour"])
            }
        })
        
        // qtd de horas que quero trabalhar (PROFILE)
        // MENOS
        // a qtd de horas/dia de cada job em progress
        const freeHours = profile["hours-per-day"] - jobTotalHours

        return res.render('index', { jobs: updateJobs, profile: profile, statusCount: statusCount, freeHours: freeHours })
    }

}