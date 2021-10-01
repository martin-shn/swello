import React, { Component } from 'react';
import { cloudinaryService, uploadImg } from '../../../services/cloudinary-service'
export class AddCover extends Component {
    state = {
        cover: {
            size: this.props.card.cover?.size || '',
            color: this.props.card.cover?.color || '',
            imgs: this.props.card.cover?.imgs || [],
            bgImgId: this.props.card.cover?.bgImgId || ''
        },
        errMsg: ''
    };
    colors = ['green', 'yellow', 'orange', 'red', 'purple', 'blue', 'sky', 'lime', 'pink', 'black']
    inputRef = React.createRef();

    onSetColor = (color) => {
        this.setState(prevState => ({ cover: { color, size: prevState.cover.size ? prevState.cover.size : 'top-cover', imgs: prevState.cover.imgs, bgImgId: '' } }), this.updateField)
    }
    onSetSize = (size) => {
        if (!this.state.cover.color && !this.state.cover.bgImgId) return;
        this.setState(prevState => ({ cover: { ...prevState.cover, size } }), this.updateField)
    }
    onRemoveCover = () => {
        this.setState(prevState => ({ cover: { size: '', color: '', imgs: prevState.cover.imgs, bgImgId: '' } }), this.updateField)
    }
    onSetBgImg(img) {
        this.setState(prevState =>
        ({
            cover: {
                size: prevState.cover.size ? prevState.cover.size : 'top-cover',
                color: '',
                imgs: prevState.cover.imgs.some(currImg => currImg.id === img.id) ? prevState.cover.imgs : [...prevState.cover.imgs, img],
                bgImgId: img.id
            }
        })
            , this.updateField)
    }
    onSetTheme = (theme) => {
        const { cover } = this.state;
        const idx = cover.imgs.findIndex(img => img.id === cover.bgImgId);
        cover.imgs[idx].theme = theme;
        this.setState({ cover }, this.updateField)
    }
    onUploadImg = async (ev) => {
        try {
            const img = await cloudinaryService.uploadImg(ev);
            this.onSetBgImg(img)
        } catch (err) {
            this.setState({ errMsg: 'That file size exceeds the 10MB limit' });
            console.error('upload file error', err);
        }
    }
    updateField = () => {
        console.log(this.state.cover);
        this.props.updateField({ cover: this.state.cover })
    }
    render() {
        const { closeCardPopover } = this.props;
        const { cover, errMsg } = this.state;
        const bgImg = cover.imgs.find(img => img.id === cover.bgImgId)
        const coverClass = cover.color ? ' color ' + cover.color : ''
        const coverActiveStyle = cover.color || cover.bgImgId ? { backgroundColor: '#6B778C', opacity: '1' } : {}
        const coverBgStyle = bgImg ? { backgroundImage: `url(${bgImg.url})` } : {}
        const darkThemeBgStyle = bgImg ? { backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bgImg.url})` } : {}
        const lightThemeBgStyle = bgImg ? { backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${bgImg.url})` } : {}
        return (
            <>
                <section className="popper-header">
                    <div>Cover</div>
                    <button onClick={closeCardPopover}></button>
                </section>
                {errMsg && <div className="err-msg popper-content">{errMsg}</div>}
                <section className="popper-content add-cover flex column">
                    <div className="sub-header">size</div>
                    <div className="size-container flex">
                        <div
                            className={'top-cover' + (cover.size === 'top-cover' ? ' active' : '')}
                            onClick={() => this.onSetSize('top-cover')}
                            style={{ cursor: cover.color || bgImg ? 'pointer' : 'default' }}
                        >
                            <div className={'cover-header' + coverClass} style={{ ...coverActiveStyle, ...coverBgStyle }}>

                            </div>
                            <div className="cover-body flex column">
                                <div className="row-1" style={coverActiveStyle}></div>
                                <div className="row-2" style={coverActiveStyle}></div>
                                <div className="body-bottom flex">
                                    <div style={coverActiveStyle}></div>
                                    <div style={coverActiveStyle}></div>
                                    <div style={coverActiveStyle}></div>
                                </div>
                            </div>
                        </div>
                        <div className={'full-cover' + (cover.size === 'full-cover' ? ' active' : '') + coverClass}
                            onClick={() => this.onSetSize('full-cover')}
                            style={{
                                ...coverActiveStyle,
                                cursor: cover.color || bgImg ? 'pointer' : 'default',
                                ...(bgImg && bgImg.theme === 'light' ? lightThemeBgStyle : darkThemeBgStyle),
                                ...(bgImg && { border: 'none' })
                            }}
                        >
                            <div className="rows-container">
                                <div className="row-1" style={{ ...coverActiveStyle, ...(bgImg && bgImg.theme === 'dark' ? { backgroundColor: '#fff' } : {}) }}></div>
                                <div className="row-2" style={{ ...coverActiveStyle, ...(bgImg && bgImg.theme === 'dark' ? { backgroundColor: '#fff' } : {}) }}></div>
                            </div>
                        </div>
                    </div>
                    {cover && (cover.color || cover.bgImgId) && cover.size && <button onClick={this.onRemoveCover}>Remove cover</button>}
                    {cover && bgImg && cover.size === 'full-cover' &&
                        <>
                            <div className="sub-header">text color</div>
                            <div className="text-theme-container flex">
                                <div className={`text-dark flex${bgImg.theme === 'dark' ? ' active' : ''}`}
                                    style={darkThemeBgStyle}
                                    onClick={() => this.onSetTheme('dark')} >
                                    <span>{this.props.card.title}</span>
                                </div>
                                <div className={`text-light flex${bgImg.theme === 'light' ? ' active' : ''}`}
                                    style={lightThemeBgStyle}
                                    onClick={() => this.onSetTheme('light')} >
                                    <span>{this.props.card.title}</span>
                                </div>
                            </div>
                        </>
                    }
                    <div className="sub-header">colors</div>
                    <div className="colors-contanier">
                        {this.colors.map(color => (
                            <div key={color} className={'cover ' + color + (cover.color === color ? ' active' : '')} onClick={() => this.onSetColor(color)}></div>
                        ))}
                    </div>
                    <div className="sub-header">attachments</div>
                    {cover.imgs && cover.imgs.length > 0 &&
                        <div className="cover-imgs-container">
                            {cover.imgs.map(img => (
                                <button key={img.id}
                                    className={`cover-img${cover.bgImgId === img.id ? ' active' : ''}`}
                                    style={{ backgroundImage: `url(${img.url})` }}
                                    onClick={() => this.onSetBgImg(img)}
                                ></button>
                            ))}
                        </div>
                    }
                    <div className="add-attachments">
                        <input type="file" accept="image/*" ref={this.inputRef} onChange={ev => this.onUploadImg(ev)} />
                        <button onClick={() => this.inputRef.current.click()}>Upload a cover image</button>
                    </div>
                </section>
            </>
        )
    }
}