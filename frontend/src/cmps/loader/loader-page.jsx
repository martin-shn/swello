import { ReactComponent as MiniLoaderIcon } from '../../assets/svg/mini-loader.svg';


export function LoaderPage() {
    return <div className="loader-page">
        <div className="loader-container">
            <MiniLoaderIcon />
        </div>
    </div>
}
