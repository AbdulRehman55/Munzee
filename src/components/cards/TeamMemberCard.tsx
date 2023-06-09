import React from 'react';
import './styles.scss';

interface CardProps {
    avatar: string;
    name: string;
    job: string;
    description: string;
}

const TeamMemberCard = ({ avatar, name, job, description }: CardProps): JSX.Element => {
    return (
        <div className="team-member-card">
            <div className="card-wrapper">
                <img src={avatar} alt="Avatar"  className="card-avatar" />
                <div className="card-name">{name}</div>
                <span className="divider"></span>
                <div className="card-job-title">{job}</div>

                <div className="card-description">{description}</div>
            </div>
        </div>
    )
}

export default TeamMemberCard;