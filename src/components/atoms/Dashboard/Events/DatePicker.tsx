// DateTimePickerStyles.ts
import styled from '@emotion/styled';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import TextField from '@mui/material/TextField';

export const StyledDateTimePicker = styled(DateTimePicker)`
  .MuiInputBase-root {
    background-color: #f5f5f5;
    border-radius: 4px;
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: #007bff;
  }

  .Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #0056b3;
  }

  .MuiInputLabel-root {
    color: #007bff;
  }

  .Mui-focused .MuiInputLabel-root {
    color: #0056b3;
  }
`;

export const StyledTextField = styled(TextField)`
  .MuiInputBase-root {
    background-color: #f5f5f5;
    border-radius: 4px;
  }

  .MuiOutlinedInput-notchedOutline {
    border-color: #007bff;
  }

  .Mui-focused .MuiOutlinedInput-notchedOutline {
    border-color: #0056b3;
  }

  .MuiInputLabel-root {
    color: #007bff;
  }

  .Mui-focused .MuiInputLabel-root {
    color: #0056b3;
  }
`;
