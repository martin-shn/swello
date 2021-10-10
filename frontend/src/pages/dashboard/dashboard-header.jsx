import React from 'react';
import differenceInMilliseconds from 'date-fns/differenceInMilliseconds';
import differenceInDays from 'date-fns/differenceInDays';

export class DashboardHeader extends React.Component {

    state = {
        cycleTime: { days: 0, hours: 0, mins: 0, precent: 0 },
        wip: { openTasks: 0, age: { wip_days: 0, wip_hours: 0, wip_mins: 0 } },
        flowEff: { flowEff: 0 },
        proccessMetrics: { avgTotalTaskInRange: 0, avgCompletedTasksInRange: 0, WIPInRange: 0, cycleTimeProccessTime: { cycleTimeProccessTimeDays: 0, cycleTimeProccessTimeHours: 0, cycleTimeProccessTimeMins: 0 } }
    };

    componentDidMount () {
        const { board } = this.props;
        let totalTasks = 0;
        let totalTaskInRange = 0;
        let completedTasks = 0;
        let completedTaskInRange = 0;
        let totalTimeToComplete = 0;
        let totalTimeToCompleteInRange = 0;
        let totalTimeWip = 0;
        let totalChecklists = 0;
        let completedChecklistTasks = 0;
        const today = new Date();
        const rangeMs = differenceInMilliseconds(today, new Date(
            today.getFullYear(),
            today.getMonth() - 1,
            today.getDate(),
            today.getHours(),
            today.getMinutes(),
            today.getSeconds()
        ));
        const rangeDays = differenceInDays(today, new Date(
            today.getFullYear(),
            today.getMonth() - 1,
            today.getDate(),
            today.getHours(),
            today.getMinutes(),
            today.getSeconds()
        ));

        board.lists.forEach(list =>
            list.cards.forEach(card => {
                if (card.dueDate?.date) {
                    totalTasks++;
                    if (card.dueDate.createdAt - rangeMs >= 0) totalTaskInRange++;
                }
                if (card.dueDate?.isComplete) {
                    completedTasks++;
                    totalTimeToComplete += card.dueDate.completedAt - card.dueDate.createdAt;
                    if (card.dueDate.completedAt - rangeMs >= 0) {
                        completedTaskInRange++;
                        totalTimeToCompleteInRange += card.dueDate.completedAt - card.dueDate.createdAt;
                    }
                } else {
                    if (card.dueDate) totalTimeWip += Date.now() - card.dueDate.createdAt;
                }
                if (card.checklists) {
                    card.checklists.forEach(checklist => {
                        totalChecklists += checklist.items.length;
                        checklist.items.forEach(item => {
                            if (item.isDone) completedChecklistTasks++;
                        });
                    });

                }
            })
        );

        const avgLifeCycle = totalTimeToComplete / completedTasks;
        const day = 1000 * 60 * 60 * 24;
        const hour = day / 24;
        const min = hour / 60;

        // cycle
        let days = parseInt(avgLifeCycle / day);
        let hours = parseInt((avgLifeCycle - (days * day)) / hour);
        let mins = parseInt((avgLifeCycle - (days * day) - (hours * hour)) / min);

        // WIP
        const wip_avgLifeCycle = totalTimeWip / (totalTasks - completedTasks);
        let wip_days = parseInt(wip_avgLifeCycle / day);
        let wip_hours = parseInt((wip_avgLifeCycle - (wip_days * day)) / hour);
        let wip_mins = parseInt((wip_avgLifeCycle - (wip_days * day) - (wip_hours * hour)) / min);

        // flow eff
        let flowEff = (completedChecklistTasks / totalChecklists * 100).toFixed(2);

        // proccess metrics
        const avgTotalTaskInRange = (totalTaskInRange / rangeDays).toFixed(2);
        const avgCompletedTasksInRange = (completedTaskInRange / rangeDays).toFixed(2);
        const avgLifeCycleInRange = totalTimeToCompleteInRange / completedTaskInRange;
        const WIPInRange = ((totalTaskInRange - completedTaskInRange) / rangeDays).toFixed(2);
        let cycleTimeProccessTimeDays = parseInt(avgLifeCycleInRange / day);
        let cycleTimeProccessTimeHours = parseInt((avgLifeCycleInRange - (cycleTimeProccessTimeDays * day)) / hour);
        let cycleTimeProccessTimeMins = parseInt((avgLifeCycleInRange - (cycleTimeProccessTimeDays * day) - (cycleTimeProccessTimeHours * hour)) / min);

        if (isNaN(days)) days = 0;
        if (isNaN(hours)) hours = 0;
        if (isNaN(mins)) mins = 0;
        if (isNaN(wip_days)) wip_days = 0;
        if (isNaN(wip_hours)) wip_hours = 0;
        if (isNaN(wip_mins)) wip_mins = 0;
        if (isNaN(cycleTimeProccessTimeDays)) cycleTimeProccessTimeDays = 0;
        if (isNaN(cycleTimeProccessTimeHours)) cycleTimeProccessTimeHours = 0;
        if (isNaN(cycleTimeProccessTimeMins)) cycleTimeProccessTimeMins = 0;
        if (isNaN(flowEff)) flowEff = 0;
        if (totalTasks === 0) totalTasks = 1;
        this.setState({
            cycleTime: { days, hours, mins, precent: (completedTasks / totalTasks * 100).toFixed(2) },
            wip: { openTasks: totalTasks - completedTasks, age: { wip_days, wip_hours, wip_mins } },
            flowEff: { flowEff },
            proccessMetrics: { avgTotalTaskInRange, avgCompletedTasksInRange, WIPInRange, cycleTimeProccessTime: { cycleTimeProccessTimeDays, cycleTimeProccessTimeHours, cycleTimeProccessTimeMins } }
        });
        // console.log(days, hours, mins);

    }

    render () {
        const { cycleTime, wip, flowEff, proccessMetrics } = this.state;
        const today = new Date();
        const range = `${ (today.getDate()).toString().padStart(2, '0') }/${ today.getMonth() === 0 ? '12' : (today.getMonth()).toString().padStart(2, '0') }/${ today.getMonth() === 0 ? today.getFullYear() - 1 : today.getFullYear() } - ${ today.toLocaleDateString('en-GB') }`;
        const rangeDays = differenceInDays(today, new Date(
            today.getFullYear(),
            today.getMonth() - 1,
            today.getDate(),
            today.getHours(),
            today.getMinutes(),
            today.getSeconds()
        ));

        return <div className="dashboard-header-container">
            <div className="cycle-time">
                <h6>Cycle Time</h6>
                <div>
                    <span>{`${ cycleTime.hours }d ${ cycleTime.hours }h ${ cycleTime.mins }m avg.`}</span>
                    <p>were needed to complete</p>
                    <span>{`${ cycleTime.precent }%`}</span>
                    <p>work items</p>
                </div>
            </div>
            <div className="wip">
                <h6>WIP</h6>
                <div>
                    <span>{`${ wip.openTasks } work items`}</span>
                    <p>are currently in progress</p>
                    <span>{`${ wip.age.wip_days }d ${ wip.age.wip_hours }h ${ wip.age.wip_mins }m`}</span>
                    <p>WIP average age</p>
                </div>
            </div>
            <div className="flow-eff">
                <h6>Flow Efficiency</h6>
                <div>
                    <span>{`${ flowEff.flowEff }%`}</span>
                    <p>Average Flow Efficiency</p>
                </div>
            </div>
            <div className="proccess-metrics">
                <h6>Proccess Metrics<br />{range}<br />{`last ${ rangeDays } Days range`}</h6>
                <div>
                    <div className="first-row">
                        <div>
                            <span>{`${ proccessMetrics.avgTotalTaskInRange }`}</span>
                            <p>Arrival Rate<br />items/day</p>
                        </div>
                        <div>
                            <span>{`${ proccessMetrics.avgCompletedTasksInRange }`}</span>
                            <p>Throughput<br />items/day</p>
                        </div>
                    </div>
                    <div className="second-row">
                        <div>
                            <span>{`${ proccessMetrics.WIPInRange }`}</span>
                            <p>Daily WIP<br />items</p>
                        </div>
                        <div>
                            {/* <span>{`${proccessMetrics.cycleTimeProccessTime.cycleTimeProccessTimeDays}d ${proccessMetrics.cycleTimeProccessTime.cycleTimeProccessTimeHours}h`}</span> */}
                            <span>{`${ proccessMetrics.cycleTimeProccessTime.cycleTimeProccessTimeDays }d ${ proccessMetrics.cycleTimeProccessTime.cycleTimeProccessTimeHours }h ${ proccessMetrics.cycleTimeProccessTime.cycleTimeProccessTimeMins }m`}</span>
                            <p>Cycle Time</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>;
    }
}
