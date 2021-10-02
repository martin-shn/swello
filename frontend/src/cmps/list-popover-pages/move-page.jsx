import React from 'react';
import ArrowBackIcon from '@mui/icons-material/ArrowBackIosNew';
import CloseIcon from '@mui/icons-material/Close';
export class MovePage extends React.Component {
    state = {
        idx: this.props.lists.findIndex(currList => currList.id === this.props.list.id)
    }
    handleChange = ({ target }) => {
        this.setState({ idx: parseInt(target.value) })
    }
    render() {
        const { onMovePage, list, lists, onTogglePopover, onMoveList } = this.props;
        const { idx } = this.state;
        return (
            <>
                <div className="popover-header flex align-center">
                    <button onClick={() => onMovePage('main')}><ArrowBackIcon /></button>
                    <span>Move list</span>
                    <button onClick={() => {
                        onTogglePopover(null)
                    }
                    }><CloseIcon /></button>
                </div>
                <div className="popover-content">
                    <form className="flex column">
                        <div className="select flex column">
                            <span className="label">Position</span>
                            <span className="value">{idx + 1}</span>
                            <label htmlFor="title" className="move-label">Position</label>
                            <select defaultValue={idx} onChange={this.handleChange}>
                                {lists.map((currList, idx) => (
                                    <option key={currList.id} value={idx} >{idx + 1 + (currList.id === list.id ? ' (current)' : '')}</option>
                                ))}
                            </select>
                        </div>
                        <button type="submit" onClick={(ev) => {
                            ev.preventDefault()
                            const currIdx = lists.findIndex(currList => currList.id === list.id)
                            onTogglePopover(null)
                            onMoveList(currIdx, idx)
                        }
                        }>Move</button>
                    </form>
                </div>
            </>
        )
    }
}