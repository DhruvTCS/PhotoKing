// CustomYearView.tsx
import React from 'react';
import { Calendar, momentLocalizer, View, DateLocalizer, Views as BigCalendarViews } from 'react-big-calendar';
import moment from 'moment';
import styled from 'styled-components';

const localizer = momentLocalizer(moment);

const YearWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-gap: 10px;
  padding: 10px;
`;

const MonthWrapper = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
`;

interface CustomYearViewProps {
    date: Date;
    events: any[];
    localizer: DateLocalizer;
}

const CustomYearView: React.FC<CustomYearViewProps> = ({ date, events, localizer }) => {
    const months = moment.months();

    return (
        <YearWrapper>
            {months.map((month, index) => {
                const start = new Date(date.getFullYear(), index, 1);
                const end = new Date(date.getFullYear(), index + 1, 0);

                return (
                    <MonthWrapper key={month}>
                        <h3>{month}</h3>
                        <Calendar
                            events={events}
                            startAccessor="start"
                            endAccessor="end"
                            views={['month']}
                            defaultView="month"
                            defaultDate={start}
                            localizer={localizer}
                            style={{ height: 300 }}
                        />
                    </MonthWrapper>
                );
            })}
        </YearWrapper>
    );
};

export default CustomYearView;
