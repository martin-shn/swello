import React from 'react';
import { TemplateCard } from './template-card';

export class TemplateList extends React.Component {
    render() {
        const {template} = this.props;
        return (
            <>
            {template.lists.map((list) => (
                <div key={list.id} className='flex lists-container column' style={{ height: 'fit-content' }}>
                    <div className='list-preview flex column'>
                        {list.cards.map((card) => <TemplateCard key={card.id} card={card} template={template}/>)}
                    </div>
                </div>
            ))
        }
        </>)
    }
}
