import React, { useState, useEffect } from 'react';
import logo from '../logo.svg';
import './elevator.scss';

const Directions = {
  up: 'up',
  down: 'down',
  stop: 'stop'
};

export const Elevator = props => {
  const { numFloors } = props;
  const [position, setPosition] = useState(0);
  const [destinations, setDestinations] = useState([]);
  const [elevatorMoving, setElevatorMoving] = useState('stop');

  // move the elevator up one floor
  const handleGoingUp = () => {
    if (position < numFloors - 1) {
      setPosition(position + 1);
    }
  };

  // move the elevator down one floor
  const handleGoingDown = () => {
    if (position > 0) {
      setPosition(position - 1);
    }
  };

  // set the moving value to 'up', 'down', or 'stop'
  const moveCar = (toPos) => {
    if (toPos > position) {
      setElevatorMoving(Directions.up);
    } else if (position > toPos) {
      setElevatorMoving(Directions.down);
    } else {
      setElevatorMoving(Directions.stop);
    }
  };

  // another user has summoned the elevator, add the floor to the destinations queue
  const addUserCall = (toPos) => {
    let updatedDestinations;
    if (toPos < destinations.at(-1)) {
      updatedDestinations = [...destinations, toPos];
    } else {
      updatedDestinations = [toPos, ...destinations];
    }
    const nextDestination = updatedDestinations.at(-1);
    setDestinations(updatedDestinations);
    moveCar(nextDestination);
  };

  useEffect(() => {
    const destinationReached = position === destinations.at(-1);
    if (destinationReached) {
      setElevatorMoving(Directions.stop);
      const updatedDestinations = destinations.slice(0, -1);
      setDestinations(updatedDestinations);
      if (updatedDestinations.length) {
        setTimeout(() => {
          moveCar(updatedDestinations.at(-1));
        }, 3000);
      }
    }
    if (elevatorMoving === Directions.up && !destinationReached) {
      setTimeout(() => {
        handleGoingUp();
      }, 1000);
    }
    if (elevatorMoving === Directions.down && !destinationReached) {
      setTimeout(() => {
        handleGoingDown();
      }, 1000);
    }
  }, [elevatorMoving, position, destinations]);

  const floors = Array.from({ length: numFloors }, (v, i) => i);

  return (
    <div className="page-wrapper">
      <div className="controls">
        <div className="control-title" />
        <div className="number-buttons">
          {floors.map((floor, index) => {
            const buttonStyle = `number-button ${index === position ? 'green' : ''}`;
            return (
              <button
                className={buttonStyle}
                onClick={() => addUserCall(index)}
              >
                {floor + 1}
              </button>
            );
          })}
        </div>
      </div>
      <div className="building">
        <div>{elevatorMoving}</div>
        <div>{destinations}</div>
        <div className="antenna">
          <img src={logo} className="app-logo" alt="logo" />
          <div className="antenna-base" />
        </div>
        <div className="base">
          {floors.map((index) => {
            const hasUp = index < numFloors - 1;
            const hasDown = index > 0;
            return (
              <div className={`elevator-car ${index === position ? 'green' : ''}`}>
                <div className="floor" onClick={() => addUserCall(index)} />
                <div className="up-down-buttons">
                  {hasUp && <button onClick={() => addUserCall(index)}>▲</button>}
                  {hasDown && <button onClick={() => addUserCall(index)}>▼</button>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
