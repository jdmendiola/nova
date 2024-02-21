import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { LayoutGroup, motion } from 'framer-motion';

const ExerciseForm = () => {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
  const [workouts, setWorkouts] = useState([]);
  const [selectedExercise, setSelectedExercise] = useState('');
  const [weight, setWeight] = useState('');
  const [reps, setReps] = useState('');
  const [sets, setSets] = useState('1');

  useEffect(() => {
    const fetchExercises = async () => {
      try {
        const response = await fetch('/api/exercises');
        const data = await response.json();
        setExercises(data);
        const workoutList = data.map(function (item) {
          return {
            id: item.id,
            status: 'unprocessed',
            name: item.name,
          };
        });
        setWorkouts(workoutList);
      } catch (error) {
        console.error('Failed to fetch exercises:', error);
      }
    };

    fetchExercises();
  }, []);

  function processWorkout(id, status, name) {
    const nextWorkouts = workouts.filter((item) => item.id !== id);
    if (status === 'processed') {
      nextWorkouts.unshift({ id, status, name });
    } else {
      nextWorkouts.push({ id, status, name });
    }
    setWorkouts(nextWorkouts);
  }

  const unprocessedWorkouts = workouts.filter(
    (item) => item.status === 'unprocessed',
  );

  const processedWorkouts = workouts.filter(
    (item) => item.status === 'processed',
  );

  const handleExerciseChange = (event) => {
    setSelectedExercise(event.target.value);
  };

  const handleWeightChange = (event) => {
    const inputWeight = event.target.value;
    if (inputWeight === '' || /^[0-9\b]+$/.test(inputWeight)) {
      setWeight(inputWeight);
    }
  };

  const handleRepsChange = (event) => {
    const inputReps = event.target.value;
    if (inputReps === '' || /^[0-9\b]+$/.test(inputReps)) {
      setReps(inputReps);
    }
  };

  const handleSetsChange = (event) => {
    setSets(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = {
      exercise: selectedExercise,
      weight: weight,
      reps: reps,
      sets: sets,
    };

    console.log('form data', formData);

    try {
      const response = await fetch('/api/submitExercise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/');
      } else {
        console.error('Failed to submit workout');
      }
    } catch (error) {
      console.error('Error submitting workout form:', error);
    }
  };

  return (
    <>
      <LayoutGroup>
        <div className="exercise-select-wrap">
          <div className="exercise-list">
            <div className="workout-wrap">
              {unprocessedWorkouts &&
                unprocessedWorkouts.map((item) => {
                  return (
                    <>
                      <div className="workout-button">
                        <motion.div
                          layoutId={item.id}
                          key={item.id}
                          className="workout-button-area"
                          onClick={() =>
                            processWorkout(item.id, 'processed', item.name)
                          }
                        >
                          {item.name}
                        </motion.div>
                      </div>
                    </>
                  );
                })}
            </div>
          </div>
          <div className="exercise-list">
            <div className="workout-wrap">
              {processedWorkouts &&
                processedWorkouts.map((item) => {
                  return (
                    <div className="workout-button">
                      <motion.div
                        layoutId={item.id}
                        key={item.id}
                        className="workout-button-area"
                        onClick={() =>
                          processWorkout(item.id, 'unprocessed', item.name)
                        }
                      >
                        {item.name}
                      </motion.div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </LayoutGroup>

      <form id="workout-form" onSubmit={handleSubmit}>
        <div className="form-element">
          <label htmlFor="exerciseSelect">Select an exercise:</label>
          <div className="selectWrap">
            <select
              id="exerciseSelect"
              value={selectedExercise}
              onChange={handleExerciseChange}
            >
              <option value="">Exercises</option>
              {exercises.map((exercise) => (
                <option key={exercise.id} value={exercise.id}>
                  {exercise.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-element">
          <label htmlFor="weightInput">Set weight (lbs):</label>
          <input
            type="tel"
            id="weightInput"
            value={weight}
            onChange={handleWeightChange}
            maxLength="3"
          />
        </div>
        <div className="form-element">
          <label htmlFor="repsInput">Enter your reps:</label>
          <input
            type="tel"
            id="repsInput"
            value={reps}
            onChange={handleRepsChange}
            maxLength="2"
          />
        </div>
        <div className="form-element">
          <label htmlFor="setsSelect">Which set are you?:</label>
          <div className="selectWrap">
            <select id="setsSelect" value={sets} onChange={handleSetsChange}>
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="form-element">
          <button className="formButton" type="submit">
            Record Progress
          </button>
        </div>
      </form>
    </>
  );
};

export default ExerciseForm;
