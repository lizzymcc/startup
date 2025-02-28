import React, { useState, useEffect } from 'react';

export function Timer(props){
	const getTime = () => {
		const time=Date.now() - props.startTime;
		return time / 1000;
	};
	useEffect(() => {	
		const interval = setInterval(() => props.updateTime(getTime()), 1000);
		return () => clearInterval(interval);
	  }, [props.startTime]);
	return (
		<div className="timer"></div>
	);
};
