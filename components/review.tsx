'use client';

import { useState } from 'react';
import { createReview } from '../utils/api';
import { Star, StarHalf } from 'lucide-react';

type AlId = { AlId: number };
type Props = { albumData: AlId };

const ReviewForm = ({ albumData }: Props) => {
  const [formData, setFormData] = useState({ body: '', rating: 0 });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [hoverRating, setHoverRating] = useState<number | null>(null);

  const stars = Array.from({ length: 10 }, (_, i) => (i + 1) * 1);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: name === "rating" ? Number(value) : value });
  };

  const handleStarClick = (starValue: number) => {
    setFormData((prev) => ({ ...prev, rating: starValue }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
      const res = await createReview(albumData?.AlId, formData.body, formData.rating);

      if (res) {
        setMessage('✅ Success: Review submitted!');
        setFormData({ body: '', rating: 0 }); // Reset form
      } else {
        setMessage('❌ Error: Submission failed');
      }
    } catch (error) {
      setMessage('❌ Error submitting form');
    }

    setLoading(false);
    window.location.reload();
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-4 border rounded-lg">
      <div>
        <label className="block font-bold">Write your review here:</label>
        <input
          type="text"
          name="body"
          value={formData.body}
          onChange={handleChange}
          className="w-full border p-2 rounded text-black"
          required
        />
      </div>

      <div className="mt-3">
        <label className="block font-bold">Rating:</label>
        <div className="flex gap-1">
          {stars.map((starValue) => (
            <Star
              key={starValue}
              className={`cursor-pointer transition-all ${
                (hoverRating ?? formData.rating) >= starValue ? "text-yellow-400" : "text-gray-300"
              }`}
              onMouseEnter={() => setHoverRating(starValue)}
              onMouseLeave={() => setHoverRating(null)}
              onClick={() => handleStarClick(starValue)}
              fill={(hoverRating ?? formData.rating) >= starValue ? "currentColor" : "none"}
              stroke="currentColor"
              size={30}
            />
          ))}
        </div>

      </div>

      <button
        type="submit"
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded disabled:opacity-50"
        disabled={loading}
      >
        {loading ? 'Submitting...' : 'Submit'}
      </button>

      {message && <p className="mt-3 text-center font-semibold">{message}</p>}
    </form>
  );
};

export default ReviewForm;