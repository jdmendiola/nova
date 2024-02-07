import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const ExerciseForm = () => {
  const navigate = useNavigate();
  const [exercises, setExercises] = useState([]);
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
      } catch (error) {
        console.error('Failed to fetch exercises:', error);
      }
    };

    fetchExercises();
  }, []);

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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="exerciseSelect">Select an exercise:</label>
        <select
          id="exerciseSelect"
          value={selectedExercise}
          onChange={handleExerciseChange}
        >
          <option value="">Select an exercise</option>
          {exercises.map((exercise) => (
            <option key={exercise.id} value={exercise.name}>
              {exercise.name}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="weightInput">Enter your weight (lbs):</label>
        <input
          type="text"
          id="weightInput"
          value={weight}
          onChange={handleWeightChange}
          maxLength="3"
          placeholder="Weight in lbs"
        />
      </div>
      <div>
        <label htmlFor="repsInput">Enter your reps:</label>
        <input
          type="text"
          id="repsInput"
          value={reps}
          onChange={handleRepsChange}
          maxLength="2"
          placeholder="Reps"
        />
      </div>
      <div>
        <label htmlFor="setsSelect">Select your sets:</label>
        <select id="setsSelect" value={sets} onChange={handleSetsChange}>
          {Array.from({ length: 10 }, (_, i) => (
            <option key={i + 1} value={i + 1}>
              {i + 1}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default ExerciseForm;
