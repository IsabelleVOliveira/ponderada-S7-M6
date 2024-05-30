// src/components/TurtleBotController.js
import React, { useEffect, useRef, useState } from 'react';
import ROSLIB from 'roslib';

const TurtleBotController = ({ children }) => {
  const ros = useRef(null);
  const cmdVel = useRef(null);
  const lidarData = useRef(null);
  const [collision, setCollision] = useState(false);

  useEffect(() => {
    // Connect to the ROS bridge server
    ros.current = new ROSLIB.Ros({
      url: 'ws://10.128.0.30:9090'
    });

    ros.current.on('connection', () => {
      console.log('Connected to websocket server.');
    });

    ros.current.on('error', (error) => {
      console.log('Error connecting to websocket server: ', error);
    });

    ros.current.on('close', () => {
      console.log('Connection to websocket server closed.');
    });

    // Initialize the cmd_vel topic
    cmdVel.current = new ROSLIB.Topic({
      ros: ros.current,
      name: '/cmd_vel',
      messageType: 'geometry_msgs/Twist'
    });

    return () => {
      ros.current.close();
    };
  }, []);

  // Function to handle movements
  const move = (linear, angular) => {

    console.log(`Moving: linear=${linear}, angular=${angular}`);
    const twist = new ROSLIB.Message({
      linear: { x: linear, y: 0, z: 0 },
      angular: { x: 0, y: 0, z: angular }
    });
    cmdVel.current.publish(twist);
  };

  // Movement handlers
  const handleForward = () => move(0.2, 0);
  const handleLeft = () => move(0, 0.5);
  const handleRight = () => move(0, -0.5);
  const handleBackward = () => move(-0.2, 0);
  const handleStop = () => move(0, 0);
  const handleTurnoff = () => {
    handleStop();
    ros.current.close();
  };

  const movementhandlers = {
    forward: handleForward,
    left: handleLeft,
    right: handleRight,
    backward: handleBackward,
    stop: handleStop,
    turnoff: handleTurnoff
  };

  return (
    <>
      {typeof children === 'function'
        ? children({ movementhandlers, collision })
        : React.Children.map(children, (child) =>
            React.isValidElement(child)
              ? React.cloneElement(child, { movementhandlers, collision })
              : child
          )}
    </>
  );
};

export default TurtleBotController;
