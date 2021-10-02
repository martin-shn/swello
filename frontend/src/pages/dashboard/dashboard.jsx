import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import Modal from '@mui/material/Modal';

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
        }, 100);
    }

    innerRef = React.createRef();

    onClose = () => {
        this.props.history.push(`/board/${this.props.match.params.boardId}`);
    }

    render() {
        if (!this.props.match.params) this.props.history.push('/board');
        // const { boardId } = this.props.match.params;
        return (
            <Modal open={true} onClose={this.onClose}>
                <section className='dashboard'>
                    <div className='dashboard-header'>
                        <button
                            className='dashboard-close'
                            onClick={this.onClose}
                        >
                            <span></span>
                        </button>
                    </div>
                    <div className={`dashboard-content${this.state.isScroll ? ' scroll-visible' : ' no-scroll'}`} ref={this.innerRef}>
                        {/* HERE COMES ALL GRAPHES - EACH IS A DIV */}
                        <div className='graph'>
                            <div>
                                <div className='graph-header'>
                                    <span>
                                        <h4>GRAPH HEADER</h4>
                                    </span>
                                    <span>
                                        <button></button>
                                    </span>
                                </div>
                                <div className='graph-content'>GRAPH CONTENT</div>
                            </div>
                        </div>
                        <div className='graph'>
                            <div>
                                <div className='graph-header'>
                                    <span>
                                        <h4>GRAPH HEADER</h4>
                                    </span>
                                    <span>
                                        <button></button>
                                    </span>
                                </div>
                                <div className='graph-content'>GRAPH CONTENT</div>
                            </div>
                        </div>
                        <div className='graph'>
                            <div>
                                <div className='graph-header'>
                                    <span>
                                        <h4>GRAPH HEADER</h4>
                                    </span>
                                    <span>
                                        <button></button>
                                    </span>
                                </div>
                                <div className='graph-content'>GRAPH CONTENT</div>
                            </div>
                        </div>
                        <div className='graph'>
                            <div>
                                <div className='graph-header'>
                                    <span>
                                        <h4>GRAPH HEADER</h4>
                                    </span>
                                    <span>
                                        <button></button>
                                    </span>
                                </div>
                                <div className='graph-content'>GRAPH CONTENT</div>
                            </div>
                        </div>
                    </div>
                </section>
            </Modal>
        );
    }
}

const mapDispatchToProps = {
};

const mapStateToProps = (state) => ({
    board: state.boardModule.board,
});

export const Dashboard = connect(mapStateToProps, mapDispatchToProps)(withRouter(_Dashboard));
