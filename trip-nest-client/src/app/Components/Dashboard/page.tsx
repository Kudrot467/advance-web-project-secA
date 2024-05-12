import React from 'react';

const Dashboard = ({children}) => {
    return (
        <div  suppressHydrationWarning={true}>
            <h1>This is Dashboard</h1>
            {children}
        </div>
    );
};

export default Dashboard;