import AddIcon from '@mui/icons-material/Add';
import { ReactComponent as CloseIcon } from '../assets/svg/close.svg';
import React, { Component } from 'react';

export class AddCard extends Component {
    state = { title: '' };

    bottomAddRef = React.createRef();
    titleRef = React.createRef();

    handleChange = ev => {
        const title = ev.target.value;
        this.setState({ title });
    };

    handleKeyDown = ev => {
        // submit when hitting enter, prevent line break
        if (ev.key === 'Enter') {
            ev.preventDefault();
            this.bottomAddRef.current.click();
        }
    };

    render () {
        const { isTopAdd, isAddingCard, onAddCard, onAddingCard, listId } = this.props;
        const { title } = this.state;
        return (
            <section className="add-card" style={{ order: isTopAdd ? '-1' : '0' }}>
                {!isAddingCard && !isTopAdd && (
                    <button className="content btn-adding transperant" onClick={() => onAddingCard(listId)}>
                        <AddIcon />
                        <span>Add a card</span>
                    </button>
                )}
                {(isAddingCard || isTopAdd) && (
                    <>
                        <form
                            onSubmit={ev => {
                                ev.preventDefault();
                                onAddCard(title, isTopAdd);
                                this.setState({ title: '' });
                                this.titleRef.current.focus();
                            }}>
                            <textarea
                                ref={this.titleRef}
                                name="title"
                                value={title}
                                onChange={this.handleChange}
                                autoFocus
                                placeholder="Enter a title for this card..."
                                onKeyDown={this.handleKeyDown}
                            />
                            <div className="add-controls">
                                <button ref={this.bottomAddRef} className="btn-add">
                                    Add Card
                                </button>
                                <CloseIcon className="close-icon" onClick={() => onAddingCard(false)} />
                            </div>
                        </form>
                    </>
                )}
            </section>
        );
    }
}
