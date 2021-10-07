import React from 'react';
import { connect } from 'react-redux';
import { AppHeader } from '../cmps/app-header';
import { TemplateList } from '../cmps/templates/templates-list';



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
        return (
            <div className='board-page' style={{backgroundImage: `url(${template.style.imgUrl})`, backgroundColor: template.style.bgColor,}}>
                <AppHeader isTemplate={true} />
                    <div
                        className='list-all full with-main-layout'
                        style={{
                            gridRow: '3',
                            display: 'flex',
                            overflowY: 'hidden'
                        }}
                    >
                        <TemplateList template={template}/>
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
