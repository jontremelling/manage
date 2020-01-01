import React, { Fragment, useState, useEffect } from "react";
import { loadUser } from "../../actions/authActions";
import { setAlert } from "../../actions/alertActions";
import { useHistory } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import '@atlaskit/css-reset';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './initial-data';
import Column from './column';

const Container = styled.div`
    display: flex;
`;

const Home = ({
    auth: { error, isAuthenticated, user },
    loadUser,
    setAlert
}) => {
    let history = useHistory();
    useEffect(() => {
        if (!isAuthenticated) {
            history.push("/");
        }

        loadUser();
        // eslint-disable-next-line
    }, [error, isAuthenticated]);

    const [state, setState] = useState(initialData);

    const onDragEnd = result => {
        const { destination, source, draggableId } = result;

        if (!destination) {
            return;
        }

        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = state.columns[source.droppableId];
        const finish = state.columns[destination.droppableId];

        if(start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                taskIds: newTaskIds
            };

            const newState = {
                ...state,
                columns: {
                    ...state.columns,
                    [newColumn.id]: newColumn
                }
            };

            setState(newState);
        } else {
            const startTaskIds = Array.from(start.taskIds);
            startTaskIds.splice(source.index, 1);

            const newStart = {
                ...start,
                taskIds: startTaskIds
            }

            const finishTaskIds = Array.from(finish.taskIds);
            finishTaskIds.splice(destination.index, 0, draggableId);

            const newFinish = {
                ...finish,
                taskIds: finishTaskIds
            }

            const newState = {
                ...state,
                columns: {
                    ...state.columns,
                    [newStart.id]: newStart,
                    [newFinish.id]: newFinish
                }
            };

            setState(newState);
        }


        
    }

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Container>
                {state.columnOrder.map(columnId => {
                const column = state.columns[columnId];
                const tasks = column.taskIds.map(taskId => state.tasks[taskId]);

                return <Column key={column.id} column={column} tasks={tasks} />
                })}
            </Container>
        </DragDropContext>
    )
};

Home.propTypes = {
    auth: PropTypes.object.isRequired,
    discogs: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    props: state.props
});

export default connect(
    mapStateToProps,
    { loadUser, setAlert }
)(Home);
