import React, { useState } from 'react';
import { useAppData } from '../../appDataContext';
import { v4 } from 'uuid';
import addSvg from '../../assets/img/add.svg';

export const AddTaskForm = ({ listId }) => {
    const { addTask } = useAppData();
    const [visibleForm, setFormVisible] = useState(false);
    const [inputValue, setInputValue] = useState('');

    const toggleFormVisible = () => {
        setFormVisible(!visibleForm);
        setInputValue('');
    };

    const addT = () => {
        const input = document.querySelector('.field');
        const obj = {
            id: v4(),
            listId,
            text: input.value,
            completed: false,
        };
        addTask(obj);
        setInputValue('');
    };

    return (
        <div className="tasks__form">
            {!visibleForm ? (
                <div onClick={toggleFormVisible} className="tasks__form-new">
                    <img src={addSvg} alt="Add icon" />
                    <span>Новая задача</span>
                </div>
            ) : (
                <div className="tasks__form-block">
                    <input
                        value={inputValue}
                        className="field"
                        type="text"
                        placeholder="Текст задачи"
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                    <button onClick={addT} className="button">
                        Добавить задачу
                    </button>
                    <button
                        onClick={toggleFormVisible}
                        className="button button--grey"
                    >
                        Отмена
                    </button>
                </div>
            )}
        </div>
    );
};
