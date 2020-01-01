import React from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
    margin-bottom: 8px;
    background-color: ${props => (props.isDragging ? 'lightgreen' : 'white')};
`;

const Task = ({task, index}) => {
    return <Draggable draggableId={task.id} index={index}>
        {(provided, snapshot) => (
            <Container
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                ref={provided.innerRef}
                isDragging={snapshot.isDragging}
            >
                <div class="card">
                    <div class="card-horizontal">
                        <div class="img-square-wrapper">
                            <img class="card-image" src="http://via.placeholder.com/50x50" alt="Card image cap" />
                        </div>
                        <div class="card-body">
                            <h4 class="card-title">{task.title}</h4>
                            <p class="card-text">{task.content}</p>
                        </div>
                    </div>
                    <div class="card-footer">
                        <small class="text-muted">Last updated 3 mins ago</small>
                    </div>
                </div>
            </Container>
        )}
    </Draggable>
}

export default Task;