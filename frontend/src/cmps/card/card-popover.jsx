import { ClickAwayListener, Grow, MenuList, Paper, Popper } from '@mui/material';
import React, { Component } from 'react';
import { AddMembers } from './card-popover-pages/add-members';
import { AddLabels } from './card-popover-pages/add-labels/add-labels';
import { AddChecklist } from './card-popover-pages/add-checklist';
import { AddDueDate } from './card-popover-pages/add-due-date';

export class CardPopover extends Component {
  onClosePopover = () => this.props.onTogglePopover(null, null);
  render() {
    const { popoverType, popoverAnchor, card, updateField } = this.props;
    return (
      <Popper
        className="cards-popper header-popper-menu"
        open={true}
        anchorEl={popoverAnchor}
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
              <ClickAwayListener onClickAway={this.onClosePopover}>
                <div>
                  {popoverType === 'add-members' && (
                    <AddMembers onTogglePopover={this.onClosePopover} />
                  )}
                  {popoverType === 'add-labels' && (
                    <AddLabels
                      card={card}
                      onTogglePopover={this.onClosePopover}
                      updateField={updateField}
                    />
                  )}
                  {popoverType === 'add-checklist' && (
                    <AddChecklist
                      card={card}
                      onClosePopover={this.onClosePopover}
                      updateField={updateField}
                    />
                  )}
                  {popoverType === 'add-due-date' && (
                    <AddDueDate
                      card={card}
                      onClosePopover={this.onClosePopover}
                      updateField={updateField}
                    />
                  )}
                </div>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    );
  }
}
