import React from 'react';
import styled from '@emotion/styled/macro';

import { isSameDay } from '../utils';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { filteredTodoListState, selectedDateState, todoListState } from '../features/TodoList/atom';
import { todoFormModalOpenState } from '../features/TodoFormModal/atom';
import { todoStatisicsModalOpenState } from '../features/TodoStatisticsModal/atom';
import TodoList from '../features/TodoList';


interface Props {
  date: Date;
}

const TableData = styled.td`
  text-align: center;
  color: #C9C8CC;
  padding: 8px;
  position: relative;
`;

const DisplayDate = styled.div<{ isToday?: boolean; isSelected?: boolean; }>`
  color: ${({ isToday }) => isToday && '#F8F7FA'};
  background-color: ${({ isToday, isSelected }) => isSelected ? '#7047EB' : isToday ? '#313133' : ''};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  align-self: flex-end;
  position: absolute;
  top: 8px;
  right: 8px;
  width: 36px;
  height: 36px;
  cursor: pointer;
`;

const Container = styled.div``;

const CalenderDay: React.FC<Props> = ({ date }) => {

  const today = new Date();

  const selectedDate = useRecoilValue(selectedDateState);
  const todoList = useRecoilValue(filteredTodoListState(date));

  const setSelectedDate = useSetRecoilState(selectedDateState);
  const setTodoFormModalOpen = useSetRecoilState(todoFormModalOpenState);
  const setTodoStatisticsModalOpen = useSetRecoilState(todoStatisicsModalOpenState);

  const handleTodoFormModalOpen = (d: number) => {
    setSelectedDate(new Date(selectedDate.setDate(d)));
    setTodoFormModalOpen(true);
  }

  const handleDateSelect = (d: number) => {
    setSelectedDate(new Date(selectedDate.setDate(d)));
  }

  const handleTodoStatisticsModalOpen = (e: React.SyntheticEvent<HTMLDivElement>) => {
    e.stopPropagation();

    setTodoStatisticsModalOpen(true);
  }

  return (
    <TableData onDoubleClick={() => handleTodoFormModalOpen(date.getDate())}>
      <Container>
        <DisplayDate
          isSelected={isSameDay(selectedDate, date)}
          isToday={isSameDay(today, date)}
          onClick={() => handleDateSelect(date.getDate())}
          onDoubleClick={handleTodoStatisticsModalOpen}
        >{date.getDate()}</DisplayDate>
        <TodoList items={todoList} />
      </Container>
    </TableData>
  )
}

export default CalenderDay;