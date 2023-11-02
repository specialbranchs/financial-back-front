import React from 'react'
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs, { Dayjs } from 'dayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
type Props = {
  dateChange: any;
  value: string;
}
const DatePickerProps = ({ dateChange, value }: Props) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>

      <DatePicker
        label="ক্যাটাগরি গ্রহণের সাল"
        sx={{ backgroundColor: 'white' }}
        slotProps={{ textField: { size: 'small' } }}
        onChange={dateChange}
        value={dayjs(value)}
      />
    </LocalizationProvider>
  )
}

export default DatePickerProps
