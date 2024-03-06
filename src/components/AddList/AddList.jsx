import React, { useState, useEffect } from 'react';
import { List } from '../List/List';
import { Badge } from '../Badge/Badge';
import closeSvg from '../../assets/img/close.svg';
import { useAppData } from '../../appDataContext';
import { v4 } from 'uuid';
import { colors } from '../../constants';
import './AddList.scss';

export const AddList = ({ onAdd }) => {
    const [visiblePopup, setVisiblePopup] = useState(false);
    const [seletedColor, selectColor] = useState(3);
    const [inputValue, setInputValue] = useState('');
    const { addList } = useAppData();

    useEffect(() => {
        if (Array.isArray(colors)) {
            selectColor(colors[0].id);
        }
    }, []);

    const onClose = () => {
        setVisiblePopup(false);
        setInputValue('');
        selectColor(colors[0].id);
    };

    const addListItem = () => {
        if (!inputValue) {
            alert('Введите название списка');
            return;
        }

        addList({
            id: v4(),
            name: inputValue,
            colorId: seletedColor,
        });

        onClose();
    };

    return (
        <div className="add-list">
            <List
                onClick={() => setVisiblePopup(true)}
                items={[
                    {
                        id: 'add-list',
                        className: 'list__add-button',
                        icon: (
                            <svg
                                width="12"
                                height="12"
                                viewBox="0 0 16 16"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8 1V15"
                                    stroke="black"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                                <path
                                    d="M1 8H15"
                                    stroke="black"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />
                            </svg>
                        ),
                        name: 'Добавить список',
                    },
                ]}
            />
            {visiblePopup && (
                <div className="add-list__popup">
                    <img
                        onClick={onClose}
                        src={closeSvg}
                        alt="Close button"
                        className="add-list__popup-close-btn"
                    />

                    <input
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        className="field"
                        type="text"
                        placeholder="Название списка"
                    />

                    <div className="add-list__popup-colors">
                        {colors.map((color) => (
                            <Badge
                                onClick={() => selectColor(color.id)}
                                key={color.id}
                                color={color.name}
                                active={seletedColor === color.id}
                            />
                        ))}
                    </div>
                    <button onClick={addListItem} className="button">
                        Добавить
                    </button>
                </div>
            )}
        </div>
    );
};
