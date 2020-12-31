import React from 'react'
import cardStyle from './Card.module.scss';

function Card({data}) {
    return (
        <div className={cardStyle.card}>
            <h4>{data.name}</h4>
            <p>{data.timezone} - {data.newTimezone}</p>
            <p>{data.newDate}</p>
        </div>
    )
}

export default Card
