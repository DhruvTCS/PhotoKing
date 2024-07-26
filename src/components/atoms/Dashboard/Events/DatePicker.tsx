// DateTimePickerStyles.ts
import styled from '@emotion/styled';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import dayjs from 'dayjs';
import React from 'react'

const StyledDateTimePicker = styled(DateTimePicker)`
 .MuiInputBase-root {
    background-color: transparent;
    width: 99%;
     border: purple;
  }

  .MuiOutlinedInput-notchedOutline {
     border-color: purple !important;
  }

  .Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #AE2AB1 !important;
  }

  .MuiInputLabel-root {
    // color: purple;
  }

  .Mui-focused .MuiInputLabel-root {
    border-color: purple !important;
  }

  .MuiInputAdornment-root .MuiTypography-root {
    color: purple;
  }

  .MuiSvgIcon-root {
    color: purple;
  }

  .Mui-selected {
    color: purple !important;
  }

  .MuiPickersDay-daySelected {
    background-color: purple !important;
    color: white !important;
  }

  .MuiInputAdornment-root .MuiSvgIcon-root {
    color: purple;
  }
`

interface DatePickerProps {
  value: string,
  onChangeData: (e: string) => void;
}
const DatePicker: React.FC<DatePickerProps> = ({ onChangeData, value }) => {

  return (
    <StyledDateTimePicker
      label=" End Date and Time"
      onChange={(e) => {
        if (e) onChangeData(e.toDate().toString())
      }}
      value={dayjs(value)}
      format="DD/MM/YYYY HH:mm"
      orientation="landscape"
      slotProps={{
        day: {
          sx: {
            ['&[data-mui-date="true"] .Mui-selected']: {
              // Reset the background color of the selected date
              backgroundColor: "blue"
            },
            ":not(.Mui-selected)": {
              backgroundColor: "#fff",
              borderColor: "#AE2AB1"
            },
            "&.MuiPickersDay-root.Mui-selected": {
              color: "#fff",
              backgroundColor: "#AE2AB1",
              borderColor: "#AE2AB1",
              ":hover": {
                color: "#fff",
                backgroundColor: "#AE2AB1",
                borderColor: "#AE2AB1"
              }
            },
            ":hover": {
              color: "#fff",
              backgroundColor: "#AE2AB1",
              borderColor: "#AE2AB1"
            }
          }
        },
        yearButton: {
          sx: {
            color: 'black',
            backgroundColor: 'white',
            borderRadius: '2px',
            borderColor: '#AE2AB1',
            border: '1px solid',
            '&:hover': {
              backgroundColor: '#8e2590',
            },
            '&.Mui-selected': {
              backgroundColor: '#AE2AB1 !important',
              color: 'white',
            },
          },
        },
        monthButton: {
          sx: {
            color: 'white',
            backgroundColor: '#AE2AB1',
            borderRadius: '2px',
            borderColor: '#AE2AB1',
            border: '1px solid',
            '&:hover': {
              backgroundColor: '#8e2590',
            },
            '&.Mui-selected': {
              backgroundColor: '#AE2AB1',
              color: 'white',
            },
          },
        },

        // time: {
        //     sx: {
        //       '& .MuiPickersClock-clock .Mui-selected': {
        //         backgroundColor: 'pink', // Change to desired color for selected time
        //         color: 'white', // Text color for the selected time
        //       },
        //       '& .MuiPickersClockNumber-clockNumberSelected': {
        //         backgroundColor: 'pink', // Change to desired color for selected number
        //         color: 'white', // Text color for the selected number
        //       },
        //       '& .MuiClock-amButton.Mui-selected, & .MuiClock-pmButton.Mui-selected': {
        //         backgroundColor: 'pink', // Change to desired color for selected AM/PM
        //         color: 'white', // Text color for the selected AM/PM
        //       }
        //     }
        //   }
      }}
    />
  )
}

export default DatePicker
