
// import movingIcon from '../../assets/img/moving-icon.gif';
import { ReactComponent as MiniLoaderIcon } from '../../assets/svg/mini-loader.svg';


export function LoaderPage() {
    return <div className="loader-page">
        <div className="loader-container">
            {/* <img src={movingIcon} className="moving-icon" alt="Loading icon"/> */}
            <MiniLoaderIcon />
        </div>
    </div>
}
