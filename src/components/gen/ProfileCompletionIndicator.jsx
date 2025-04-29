import React from 'react';
import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const ProfileCompletionIndicator = ({ percentage, photoUrl }) => {
    return (
        <div style={{ width: 120, height: 120 }}>
            <CircularProgressbarWithChildren
                value={percentage}
                styles={buildStyles({
                    pathColor: '#10B981', // Tailwind green-500
                    trailColor: '#E5E7EB', // Tailwind gray-200
                })}
            >
                <img
                    src={photoUrl}
                    alt="Profile"
                    style={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        objectFit: 'cover',
                    }}
                />
            </CircularProgressbarWithChildren>
        </div>
    );
};

export default ProfileCompletionIndicator;
