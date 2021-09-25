import React from 'react';
import { ReactComponent as CloseIcon } from '../../assets/svg/close.svg';
export class CopyPage extends React.Component {
    state = {
        title: this.props.list.title
    }
    handleChange = ({ target }) => {
        this.setState({ title: target.value })
    }
    render() {
        const { onMovePage, list, onTogglePopover, onCopyList } = this.props;
        return (
            <>
                <div className="popover-header flex align-center">
                    <button onClick={() => onMovePage('main')}>{'<'}</button>
                    <span>Copy list</span>
                    <button onClick={() => {
                        onTogglePopover(null)
                    }
                    }><CloseIcon /></button>
                </div>
                <div className="popover-content">
                    <form className="flex column">
                        <label htmlFor="title" className="copy-label">Name</label>
                        <textarea name="title" id="title" value={this.state.title} onChange={this.handleChange}></textarea>
                        <button type="submit" onClick={(ev) => {
                            ev.preventDefault()
                            onTogglePopover(null)
                            onCopyList(list, this.state.title)
                        }
                        }>Create list</button>
                    </form>
                </div>
            </>
        )
    }
}