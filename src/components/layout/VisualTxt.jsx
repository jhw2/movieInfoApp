import { memo } from 'react';
const VisualTxt = memo(({pageTitle, pageInfo})=>{
    return (
        <div className="visual-txt">
            <h5>{pageTitle}</h5>
            <div>{pageInfo}</div>
        </div>
    )
})
export default VisualTxt;