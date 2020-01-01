import React from 'react';
import styled from 'styled-components';
import { Droppable } from 'react-beautiful-dnd';
import Task from './task';

const Container = styled.div`
    margin: 8px;
    border: 1px solid lightgrey;
    border-radius: 2px;
    width: 33%;

    display: flex;
    flex-direction: column;
`;
const Title = styled.h3`
    padding: 8px;
`;
const TaskList = styled.div`
    padding: 8px;
    background-color: ${props => (props.isDraggingOver ? 'skyblue' : 'white')};
    flex-grow: 1;
    min-height: 100px;
`;

class InnerList extends React.Component {
    shouldComponentUpdate(nextProps) {
        if(nextProps.tasks === this.props.tasks) {
            return false;
        } else {
            return true;
        }
    }
    render() {
            return this.props.tasks.map((task, index) => (
            <Task key={task.id} task={task} index={index} />
        ));
    }
}

const Column = ({column, tasks}) => {
    return <Container>
        <Title>{column.title}</Title>
        <Droppable droppableId={column.id}>
            {(provided, snapshot) => (
                <TaskList
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    isDraggingOver={snapshot.isDraggingOver}
                >
                <InnerList tasks={tasks} />
                {provided.placeholder}
            </TaskList>
            )}
        </Droppable>
    </Container>
}

export default Column;