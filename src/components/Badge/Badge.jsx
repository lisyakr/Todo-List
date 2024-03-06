import React from 'react';
import classNames from 'classnames';

import './Badge.scss';

export const Badge = ({ color, onClick, active = false }) => (
    <i
        onClick={onClick}
        className={classNames(
            'badge',
            { [`badge--${color}`]: color },
            { active: active }
        )}
    ></i>
);
