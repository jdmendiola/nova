import { useParams, useNavigate } from 'react-router-dom';

export default async function DeleteSession() {
  const { itemId } = useParams();
  const navigate = useNavigate();

  try {
    const response = await fetch(`/delete/workout_session/${itemId}`, {
      method: 'DELETE',
      body: itemId,
    });
  } catch (error) {
    console.error('Error submitting workout form:', error);
  }
  return;
}
