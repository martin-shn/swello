import React from 'react'
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { toggleMenu } from '../../store/actions/system.actions';

import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';

class _PopoverMenu extends React.Component{
    state={}

    onClose =(event)=>{
        if (this.props.anchor && this.props.anchor.contains(event.target)) {
            return;
          }
        this.props.toggleMenu(false)
    }

    render(){
        const {isOpen, id, anchor} = this.props.menu
        // console.log(anchor, id, this.props.id, !isOpen || id!==this.props.id );
        if (!isOpen || id!==this.props.id) return <></>
        return(
            <Popper
            className={this.props.classNames}
            open={isOpen}
            anchorEl={anchor}
            role={undefined}
            placement="bottom-start"
            transition
            disablePortal>
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin: placement === 'bottom-start' ? 'left top' : 'left bottom',
                }}>
                <Paper>
                  <ClickAwayListener onClickAway={this.onClose}>
                    <MenuList
                      autoFocusItem={isOpen}
                      id="composition-menu"
                      aria-labelledby="composition-button">
                      {this.props.header&&<div className="popper-header">
                        <div>{this.props.header}</div>
                        <button onClick={this.onClose}></button>
                      </div>}
                      {this.props.children}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        )
    }
}

const mapDispatchToProps = {
    toggleMenu
  };
  
  const mapStateToProps = state => {
    return {
        menu: state.systemModule.menu,
    };
  };
  
  export const PopoverMenu = connect(mapStateToProps, mapDispatchToProps)(withRouter(_PopoverMenu));
  