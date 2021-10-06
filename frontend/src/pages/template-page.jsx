import React from 'react';
import { connect } from 'react-redux';
import { AppHeader } from '../cmps/app-header';

import { CardPreviewData } from '../cmps/card-preview-data';
import { CardPreviewLabels } from '../cmps/card-preview-labels';

class _TemplatePage extends React.Component {
    state = {};

    render() {
        const { templates } = this.props;
        if (!templates) {
            this.props.history.push('/templates');
            return <></>;
        }
        const { boardId } = this.props.match.params;
        const template = templates.filter((template) => template._id === boardId)[0];
        console.log(template);
        return (
            <div className='board-page'>
                <AppHeader isTemplate={true} />
                    <div
                        className='list-all full with-main-layout'
                        style={{
                            gridRow: '3',
                            display: 'flex',
                            backgroundImage: `url(${template.style.imgUrl})`,
                            backgroundColor: template.style.bgColor,
                        }}
                    >
                        {template.lists.map((list) => (
                        <div className='flex lists-container column' style={{height:'fit-content'}}>
                            <div key={list.id} className='list-preview flex column'>
                                {list.cards.map((card) => {
                                    {
                                        this.coverImg = card.cover?.imgs?.find((img) => img.id === card.cover.bgImgId);
                                    }
                                    {
                                        this.coverStyle =
                                            this.coverImg && card.cover.size === 'full-cover'
                                                ? { backgroundImage: `url(${this.coverImg.url})`, height: `${this.coverImg.previewHeight}px` }
                                                : {};
                                    }
                                    return (
                                        <div
                                            key={card.id}
                                            className={
                                                'content card-preview flex column ' +
                                                (card.cover?.size === 'full-cover'
                                                    ? `full-cover ${card.cover.color ? card.cover.color : 'cover-img'}`
                                                    : '')
                                            }
                                            style={{ ...this.coverStyle }}
                                        >
                                            {card.cover && (card.cover.color || this.coverImg) && card.cover.size === 'top-cover' && (
                                                <div
                                                    className={`card-cover${card.cover.color ? ' ' + card.cover.color : ''}${
                                                        card.cover.bgImgId ? ' cover-img' : ''
                                                    }`}
                                                    style={
                                                        this.coverImg
                                                            ? {
                                                                  backgroundImage: `url(${this.coverImg.url})`,
                                                                  height: `${this.coverImg.previewHeight}px`,
                                                              }
                                                            : {}
                                                    }
                                                ></div>
                                            )}
                                            {(!card.cover || card.cover.size !== 'full-cover') && (
                                                <CardPreviewLabels card={card} template={template} />
                                            )}
                                            <div
                                                className={`${card.cover?.size === 'full-cover' ? 'full-cover-helper' : ''}${
                                                    this.coverImg ? ' theme ' + this.coverImg.theme : ''
                                                }`}
                                            >
                                                {card.title}
                                                {/* {!isOnQuickEdit && (
                                        <span style={{ color: card.cover?.color === 'black' && card.cover?.size === 'full-cover' ? '#fff' : '' }}>
                                            {card.title}
                                        </span>
                                    )} */}
                                                {/* {isOnQuickEdit && <textarea autoFocus value={title} onChange={handleChange}></textarea>}
                                    {isOnQuickEdit && (
                                        <button className='save-quick-edit' onClick={updateCardTitle}>
                                            Save
                                        </button>
                                    )} */}
                                                {(!card.cover || card.cover.size !== 'full-cover') && (
                                                    <CardPreviewData card={card} isTemplate={true} />
                                                )}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                            </div>
                        ))}
                    </div>
            </div>
        );
    }
}

const mapDispatchToProps = {};

const mapStateToProps = (state) => {
    return {
        templates: state.boardModule.templates,
    };
};

export const TemplatePage = connect(mapStateToProps, mapDispatchToProps)(_TemplatePage);
