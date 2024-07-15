import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import React from 'react'

function BackGroundColor(color, targetPath) {
    const location = useLocation();

    useEffect(() => {
        if (location.pathname === targetPath) {
            document.body.style.backgroundColor = color;
        } else {
            document.body.style.backgroundColor = '';
        }

        return () => {
            document.body.style.backgroundColor = '';
        };
    }, [location.pathname, color, targetPath]);
}

export default BackGroundColor