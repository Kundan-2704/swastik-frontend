const StarRating = ({ rating, setRating }: any) => {
  return (
    <div className="flex gap-1 cursor-pointer text-xl">
      {[1, 2, 3, 4, 5].map((star) => (
        <span key={star} onClick={() => setRating(star)}>
          {star <= rating ? "⭐" : "☆"}
        </span>
      ))}
    </div>
  );
};

export default StarRating;