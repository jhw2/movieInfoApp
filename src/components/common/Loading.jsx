

import '../../loading.css';
const Loading = ({done})=>{
    return (
        <div>
            <div className={done ? 'loading':'loading show' }></div>
            
        </div>
    );
}

export default Loading;
