

import '../loading.css';
const Loading = ({done})=>{
    const loadingHtml = <div className="loading"></div>;
    return (
        <div>
            { done ? '':loadingHtml }
        </div>
    );
}

export default Loading;
