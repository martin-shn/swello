import React, { Component } from 'react';
import { PopoverMenu } from './popover-menu';
import { ReactComponent as ArrowDownIcon } from '../../assets/svg/arrow-down.svg';
import { ReactComponent as ArrowRightIcon } from '../../assets/svg/arrow-right.svg';

export class HeaderMore extends Component {
    btnRef = React.createRef();
    render () {
        const { onBoards, toggleMenu } = this.props;
        return (
            <>
                <button className="btn-more" ref={this.btnRef} onClick={ev => onBoards(ev, 'more')}>
                    <span>More</span>
                    <ArrowDownIcon />
                </button>
                <PopoverMenu id="more" header="More" classNames="header-popper-menu">
                    <section className="header-more">
                        <button onClick={ev => toggleMenu(true, 'boards', this.btnRef.current)}>Boards<ArrowRightIcon /></button>
                        <button onClick={ev => toggleMenu(true, 'starred', this.btnRef.current)}>Starred Boards<ArrowRightIcon /></button>
                    </section>
                </PopoverMenu>
            </>
        );
    }
};
