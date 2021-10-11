import React from 'react';
import { cardService } from '../../services/board-services/card.service';
import TotalIcon from '@mui/icons-material/Assignment';
import ClockIcon from '@mui/icons-material/AccessTime';
import ErrorIcon from '@mui/icons-material/ErrorOutline';
import SpeedIcon from '@mui/icons-material/Speed';
import { CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';

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

    render () {
        const { cycleTime } = this.state;

        return <>
            <CircularProgressWithLabel value={50} />
            <div className="total-cards">
                <h6><TotalIcon />Total Cards</h6>
                <span>{this.totalCards}</span>
            </div>
            <div className="due-soon">
                <h6><ClockIcon />Due Soon</h6>
                <span>{this.dueSoonCards}</span>
            </div>
            <div className="overdue">
                <h6><ErrorIcon />Overdue</h6>
                <span>{this.overdueCards}</span>
            </div>
            <div className="time-to-complete">
                <h6><SpeedIcon />time to complete</h6>
                <span>{`${ cycleTime.hours }d ${ cycleTime.hours }h ${ cycleTime.mins }m avg.`}</span>
            </div>
        </>;
    }
}

function CircularProgressWithLabel (props) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress variant="determinate" {...props} />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="caption" component="div" color="text.secondary">
                    {`${ Math.round(props.value) }%`}
                </Typography>
            </Box>
        </Box>
    );
}

