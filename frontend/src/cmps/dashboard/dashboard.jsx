import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { toggleDashboard } from '../../store/actions/system.actions';

class _Dashboard extends React.Component {
    state = {
        isScroll: null,
    };

    componentDidMount() {
        setTimeout(() => {
            if (this.innerRef?.current) {
                this.setState({
                    isScroll: this.innerRef.current.scrollHeight > this.innerRef.current.clientHeight ? true : false,
                });
            }
        }, 10);
    }

    innerRef = React.createRef();

    render() {
        if (!this.props.isDashboardOpen) return <></>;
        return (
            <section className='dashboard'>
                <div className='dashboard-header'>
                    <button className='dashboard-close' onClick={this.props.toggleDashboard}>
                        <span></span>
                    </button>
                </div>
                <div className={`dashboard-content${this.state.isScroll ? ' scroll-visible' : ' no-scroll'}`} ref={this.innerRef}>
                    {/* HERE COMES ALL GRAPHES - EACH IS A DIV */}
                    <div className='graph'>
                        <div>
                            <div className='graph-header'>
                                <span><h4>GRAPH HEADER</h4></span>
                                <span><button></button></span>
                            </div>
                            <div className='graph-content'>GRAPH CONTENT</div>
                        </div>
                    </div>
                    <div className='graph'>
                        <div>
                            <div className='graph-header'>
                                <span><h4>GRAPH HEADER</h4></span>
                                <span><button></button></span>
                            </div>
                            <div className='graph-content'>GRAPH CONTENT</div>
                        </div>
                    </div>
                    <div className='graph'>
                        <div>
                            <div className='graph-header'>
                                <span><h4>GRAPH HEADER</h4></span>
                                <span><button></button></span>
                            </div>
                            <div className='graph-content'>GRAPH CONTENT</div>
                        </div>
                    </div>
                    <div className='graph'>
                        <div>
                            <div className='graph-header'>
                                <span><h4>GRAPH HEADER</h4></span>
                                <span><button></button></span>
                            </div>
                            <div className='graph-content'>GRAPH CONTENT</div>
                        </div>
                    </div>
                </div>
            </section>
        );
    }
}

const mapDispatchToProps = {
    toggleDashboard,
};

const mapStateToProps = (state) => ({
    board: state.boardModule.board,
    isDashboardOpen: state.systemModule.isDashboardOpen,
});

export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(withRouter(_Dashboard));
