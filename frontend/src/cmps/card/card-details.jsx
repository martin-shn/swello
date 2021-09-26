import React from 'react'
export class CardDetails extends React.Component {
    state = {
        currLabelId: null
    }
    componentDidUpdate() {
        const { currLabelId } = this.state;
        if (currLabelId && !this.props.card.labelIds.includes(this.state.currLabelId)) {
            this.setState({ currLabelId: null })
            this.props.onTogglePopover(null, null)
        }
    }
    render() {
        const { card, board, onTogglePopover } = this.props;
        return (
            <section className="card-details flex">
                {card.labelIds && card.labelIds.length > 0 && <div className="card-item card-labels flex column">
                    <span>labels</span>
                    <div className="labels-container flex">
                        {card.labelIds.map(labelId => {
                            const label = board.labels.find(label => label.id === labelId)
                            return <div key={labelId} className={"label detail flex justify-center " + label.color} onClick={(ev) => {
                                this.setState({ currLabelId: labelId })
                                onTogglePopover('add-labels', ev.target)
                            }}>{label.title}</div>
                        })}
                    </div>
                </div>}
            </section>
        )
    }
}