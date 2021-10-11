import React from 'react';
import { cardService } from '../../services/board-services/card.service';
import TotalIcon from '@mui/icons-material/Assignment';
import ClockIcon from '@mui/icons-material/AccessTime';
import ErrorIcon from '@mui/icons-material/ErrorOutline';
import SpeedIcon from '@mui/icons-material/Speed';
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export class DashboardHeader extends React.Component {

    state = {
        cycleTime: { days: 0, hours: 0, mins: 0, precent: 0 },
    };

    componentDidMount () {
        this.calcData();
    }
    componentDidUpdate (prevProps, prevState) {
        if (this.props.board !== prevProps.board)
            this.calcData();
    }

    calcData = () => {
        const { board } = this.props;
        this.totalCards = 0;
        this.completedCards = 0;
        this.totalTimeToComplete = 0;
        this.dueSoonCards = 0;
        this.overdueCards = 0;


        board.lists.forEach(list =>
            list.cards.forEach(card => {
                const status = card.dueDate ? cardService.checkDueDate(card.dueDate) : 'no-due-date';
                if (status === 'complete') {
                    this.completedCards++;
                    this.totalTimeToComplete += card.dueDate.completedAt - card.dueDate.createdAt;
                }
                else if (status === 'due-soon') this.dueSoonCards++;
                else if (status === 'overdue' || status === 'overdue-recent') this.overdueCards++;
                this.totalCards++;
            })
        );

        const avgLifeCycle = this.totalTimeToComplete / this.completedCards;
        const day = 1000 * 60 * 60 * 24;
        const hour = day / 24;
        const min = hour / 60;

        // cycle
        let days = parseInt(avgLifeCycle / day);
        let hours = parseInt((avgLifeCycle - (days * day)) / hour);
        let mins = parseInt((avgLifeCycle - (days * day) - (hours * hour)) / min);


        if (isNaN(days)) days = 0;
        if (isNaN(hours)) hours = 0;
        if (isNaN(mins)) mins = 0;
        this.setState({
            cycleTime: { days, hours, mins, precent: (this.completedCards / this.totalCards * 100).toFixed(2) },
        });
    };

    get progressCircleStyle() {
        return {
            path: {
                stroke: ` #2fb4f5`,
                transition: 'stroke-dashoffset 0.5s ease 0s',
                transformOrigin: 'center center',
            },
            trail: {
                stroke: '#ffffff',
                strokeLinecap: 'butt',
                transform: 'rotate(0.25turn)',
                transformOrigin: 'center center',
            },
            text: {
                fill: '#ffffff',
                fontSize: '25px',

            },
        }
    }

    get dueSoonPercentage(){
        return (this.dueSoonCards/this.totalCards*100).toFixed(0)
    }
    get overDueSoonPercentage(){
        return (this.overdueCards/this.totalCards*100).toFixed(0)
    }

    render () {
        const { cycleTime } = this.state;

        return <>
            <div className="total-cards">
                <h6><TotalIcon />Total Cards</h6>
                <span>{this.totalCards}</span>
            </div>
            <div className="due-soon">
                <h6><ClockIcon />Due Soon</h6>
                <div>
                <span>{this.dueSoonCards}</span>
                    <CircularProgressbar value={this.dueSoonPercentage} text={`${this.dueSoonPercentage}%`}
                                    styles={this.progressCircleStyle} />
                </div>
            </div>
            <div className="overdue">
                <h6><ErrorIcon />Overdue</h6>
                <div>
                    <span>{this.overdueCards}</span>
                    <CircularProgressbar value={this.overDueSoonPercentage} text={`${this.overDueSoonPercentage}%`}
                                    styles={this.progressCircleStyle} />
                </div>
            </div>
            <div className="time-to-complete">
                <h6><SpeedIcon />Cards Life Cycle</h6>
                <span>{`${ cycleTime.hours }d ${ cycleTime.hours }h ${ cycleTime.mins }m avg.`}</span>
            </div>
        </>;
    }
}

