import React from 'react';
import { MiniLoader } from '../loader/mini-loader';

export class QrCode extends React.Component {
    state = {
        isLoading: true,
        isCopying: false,
        qrCodeSrc: ''
    };
    componentDidMount () {
        const url = `${ window.location.origin }/invite/${ this.props.boardId }`;
        const img = new Image();
        img.onload = () => {
            this.setState({ isLoading: false, qrCodeSrc: img.src });
        };
        img.src = `https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${ url }&format=svg`;
    }
    componentWillUnmount () {
        clearTimeout(this.timeout);
    }
    onCopy (url) {
        clearTimeout(this.timeout);

        // copy url to clipboard
        navigator.clipboard.writeText(url).then(function () {
        }, function (err) {
            console.error('Async: Could not copy text: ', err);
        });

        this.setState({ isCopying: true }, () => {
            this.timeout = setTimeout(() => {
                this.setState({ isCopying: false });
            }, 2000);
        });
    }

    toDataURL (downloadURL) {
        return fetch(downloadURL).then((response) => {
            return response.blob();
        }).then(blob => {
            return URL.createObjectURL(blob);
        });
    }

    async download (url) {
        const a = document.createElement("a");
        a.href = await this.toDataURL(`https://api.qrserver.com/v1/create-qr-code/?size=100x100&data=${ url }`);
        a.download = "swello-board-invite-qr-code.png";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
    render () {
        const { boardId } = this.props;
        const url = `${ window.location.origin }/invite/${ boardId }`;
        if (this.state.isLoading) {
            return <MiniLoader />;
        } else {
            return <div className="qr-code-container">
                <div>
                    <input
                        type="text"
                        autoCorrect="off"
                        autoComplete="off"
                        value={url}
                        readOnly
                        onClick={(ev) => ev.target.setSelectionRange(0, ev.target.value.length)}
                    />
                    <button onClick={() => {
                        this.onCopy(url);
                    }}>{this.state.isCopying ? 'Copied' : 'Copy'}</button>
                </div>
                <div>
                    {<img alt="QR code" src={this.state.qrCodeSrc} />}
                    <div>
                        <p>Or let anyone scan this QR code to invite them to this board:</p>
                        <button onClick={() => this.download(url)}>Download</button>
                    </div>
                </div>

            </div>;
        }
    }
}

