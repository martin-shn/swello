import React from 'react'
import { CardPreviewData } from '../../cmps/card-preview-data';
import { CardPreviewLabels } from '../../cmps/card-preview-labels';

export class TemplateCard extends React.Component{
    render(){
        const {card, template} = this.props
        const coverImg = card.cover?.imgs?.find((img) => img.id === card.cover.bgImgId);
        const coverStyle =
            coverImg && card.cover.size === 'full-cover'
                ? { backgroundImage: `url(${coverImg.url})`, height: `${coverImg.previewHeight}px` }
                : {};
        return (
                <div
                    className={
                        'content card-preview flex column ' +
                        (card.cover?.size === 'full-cover' ? `full-cover ${card.cover.color ? card.cover.color : 'cover-img'}` : '')
                    }
                    style={{ ...this.coverStyle }}
                    ref={(el) => el && el.style.setProperty('cursor', 'default', 'important')}
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
                    {(!card.cover || card.cover.size !== 'full-cover') && <CardPreviewLabels card={card} template={template} />}
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
                        {(!card.cover || card.cover.size !== 'full-cover') && <CardPreviewData card={card} isTemplate={true} />}
                    </div>
                </div>
            );
        }
}
