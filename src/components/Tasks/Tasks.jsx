import React from 'react';
import { Link } from 'react-router-dom';
import { AddTaskForm } from './AddTaskForm';
import { Task } from './Task';
import { colors } from '../../constants';
import { useAppData } from '../../appDataContext';
import editSvg from '../../assets/img/edit.svg';
import './Tasks.scss';

export const Tasks = ({ list, onAddTask, withoutEmpty }) => {
    const { onEditListName } = useAppData();
    const editTitle = () => {
        const newTitle = window.prompt('Название списка', list.name);
        if (newTitle) {
            onEditListName(list.id, newTitle);
        }
    };

    const getColor = (colorId) => {
        return colors.find(({ id }) => id === colorId);
    };

    const { tasks } = useAppData();

    const filteredTasks = tasks.filter((t) => t.listId === list.id);

    return (
        <div className="tasks">
            <Link to={`/lists/${list.id}`}>
                <h2
                    style={{ color: getColor(list.colorId).hex }}
                    className="tasks__title"
                >
                    {list.name}
                    <img onClick={editTitle} src={editSvg} alt="Edit icon" />
                </h2>
            </Link>

            <div className="tasks__items">
                {!withoutEmpty && filteredTasks && !filteredTasks.length && (
                    <h2>Задачи отсутствуют</h2>
                )}
                {filteredTasks &&
                    filteredTasks.map((task) => (
                        <Task key={task.id} list={list} {...task} />
                    ))}
                <AddTaskForm listId={list.id} />
            </div>
        </div>
    );
};
