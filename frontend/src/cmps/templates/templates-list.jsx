import React from 'react';
import { TemplateCard } from './template-card';

export class TemplateList extends React.Component {
    state={
        class:Array(this.props.template.lists.length).fill().map((_, i) => '')
    }

    componentDidMount () {
        setTimeout(() => {
        //   if (this.elInnerRef?.current) {
              const elClass = this.state.class.map((c,idx)=>this.elInnerRef[idx].current.scrollHeight > this.elInnerRef[idx].current.clientHeight ? ' visible-scroll' : '')
            this.setState({
              class: elClass,
            },()=>{console.log('final state:',this.state);});
        //   }
        console.log(this.elInnerRef, this.state);
        }, 100);
      }
    
    elInnerRef = [];
    
    render() {
        this.elInnerRef = Array(this.props.template.lists.length).fill().map((_, i) => this.elInnerRef[i] || React.createRef())
        console.log(this.props.template.lists.length);
        const {template} = this.props;
        return (
            <>
            {template.lists.map((list,idx) => (
                <section key={list.id} className='flex lists-container' style={{ maxHeight: '98vh' }}>
                    <div className='list-preview flex column' style={this.state.class[idx]===''?{}:{paddingRight:'4px'}}>
                        <div className="list-header flex space-between">
                            <h2 className="list-title content-editable">{list.title}</h2>
                        </div>
                        <div ref={this.elInnerRef[idx]} className={"cards-container flex column"+this.state.class[idx]} style={{gap:"0"}}>
                            <section className="card-list">
                                <div>
                                    <div className="card-preview-container">
                                        {list.cards.map((card) => <TemplateCard key={card.id} card={card} template={template}/>)}
                                    </div>
                                </div>
                            </section>
                        </div>
                    </div>
                </section>
            ))
        }
        </>)
    }
}
