
import "react-datepicker/dist/react-datepicker.css";
import { memo } from 'react';
import { ko } from "date-fns/esm/locale";
import DatePicker from "react-datepicker";

const DailyRankSearchFrom = memo(({currentDate, callList})=>{

  return (
    <div className='search-form'>
        <DatePicker 
        locale={ko}
        selected={currentDate}
        onChange={(date) => callList(date)}
        dateFormat = "yyyy-MM-dd"
        shouldCloseOnSelect={true}
        name='start'
        />
    </div>
  );
});

export default DailyRankSearchFrom;
