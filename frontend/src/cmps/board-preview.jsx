import React from 'react'

import img from '../assets/img/board-bgc.jpg';
import { BoardList } from './board-list';

export class BoardPreview extends React.Component {
    state = {};

    render() {
        const imgUrl =
            'https://images.unsplash.com/photo-1457195740896-7f345efef228?ixid=MnwxMjA3fDB8MHxzZWFyY2h8OXx8c2VhfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80'
        const boardName= 'Board Name'
        const {isAdd, isStarred} = this.props

        if (isAdd) return (
            <a className='board-preview new-board' style={{backgroundColor:"#f0f2f4"}}>
                <span></span>
                <div>Create new board</div>
            </a>
        ) 
        else return (
            <a className='board-preview' style={{backgroundImage:`url(${imgUrl})`}}>
                <span></span>
                <div>
                    {boardName}
                    {isStarred==='true'&&<span>{boardName}</span>}
                </div>
                <span className={`${isStarred==='true'?'starred':''} star`}></span>
            </a>
        );
    }
}
