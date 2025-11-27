const Job = require('./Job');
const JobApplication = require('./JobApplication');

Job.hasMany(JobApplication, { foreignKey: 'jobId' });
JobApplication.belongsTo(Job, { foreignKey: 'jobId' });

module.exports = { Job, JobApplication };
