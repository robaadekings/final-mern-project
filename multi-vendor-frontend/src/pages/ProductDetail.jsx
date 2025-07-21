import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../lib/api';
import { useToast } from '../components/ToastContext';

function ProductDetail() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [reviews, setReviews] = useState([]);
    const [reviewLoading, setReviewLoading] = useState(true);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const { showToast } = useToast();
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await api.get(`/products/${id}`);
                setProduct(res.data);
                setLoading(false);
            } catch (err) {
                setError('Product not found.');
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    useEffect(() => {
        const fetchReviews = async () => {
            setReviewLoading(true);
            try {
                const res = await api.get(`/reviews/${id}`);
                setReviews(res.data);
            } catch (err) {
                setReviews([]);
            }
            setReviewLoading(false);
        };
        fetchReviews();
    }, [id]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            const token = localStorage.getItem('token');
            await api.post('/reviews', {
                productId: id,
                rating,
                comment,
            }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            showToast('Review submitted!', 'success');
            setComment('');
            setRating(5);
            // Refresh reviews
            const res = await api.get(`/reviews/${id}`);
            setReviews(res.data);
        } catch (err) {
            showToast(err.response?.data?.message || 'Failed to submit review', 'error');
        }
        setSubmitting(false);
    };

    if (loading) return <p className="text-center py-10">Loading...</p>;
    if (error) return <p className="text-center text-red-500 py-10">{error}</p>;

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                {product.image && (
                    <img
                        src={`${import.meta.env.VITE_API_URL || 'https://final-mern-project-g5mi.onrender.com'}/uploads/${product.image}`}
                        alt={product.name}
                        className="w-full h-96 object-cover rounded-lg shadow-md"
                    />
                )}
                <div>
                    <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
                    <p className="text-gray-700 mb-4">{product.description}</p>
                    <p className="text-xl font-semibold text-indigo-600 mb-4">${product.price}</p>
                    <p className="text-sm text-gray-500 mb-2">Category: {product.category?.name || 'N/A'}</p>
                    <p className="text-sm text-gray-500">Vendor: {product.vendor?.name || 'N/A'}</p>
                    <button className="mt-6 px-6 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700">
                        Add to Cart
                    </button>
                </div>
            </div>
            {/* Reviews Section */}
            <div className="mt-10">
                <h2 className="text-2xl font-bold mb-4">Customer Reviews</h2>
                {reviewLoading ? (
                    <p>Loading reviews...</p>
                ) : reviews.length === 0 ? (
                    <p className="text-gray-500">No reviews yet.</p>
                ) : (
                    <div className="space-y-4 mb-6">
                        {reviews.map((rev) => (
                            <div key={rev._id} className="bg-gray-50 rounded-lg p-4 shadow flex flex-col gap-1">
                                <div className="flex items-center gap-2 mb-1">
                                    <span className="font-semibold text-indigo-700">{rev.user?.name || 'User'}</span>
                                    <span className="text-yellow-500">{'★'.repeat(rev.rating)}{'☆'.repeat(5 - rev.rating)}</span>
                                </div>
                                <p className="text-gray-700">{rev.comment}</p>
                                <span className="text-xs text-gray-400">{new Date(rev.createdAt).toLocaleDateString()}</span>
                            </div>
                        ))}
                    </div>
                )}
                {/* Review Form */}
                {user && user.role === 'customer' && (
                    <form onSubmit={handleReviewSubmit} className="bg-white rounded-lg shadow p-6 flex flex-col gap-4 max-w-lg">
                        <h3 className="text-lg font-semibold mb-2">Write a Review</h3>
                        <div className="flex items-center gap-2">
                            <label htmlFor="rating" className="font-medium">Rating:</label>
                            <select id="rating" value={rating} onChange={e => setRating(Number(e.target.value))} className="border rounded px-2 py-1">
                                {[5,4,3,2,1].map(r => <option key={r} value={r}>{r}</option>)}
                            </select>
                            <span className="text-yellow-500">{'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</span>
                        </div>
                        <textarea
                            className="border rounded px-3 py-2 min-h-[60px]"
                            placeholder="Write your review..."
                            value={comment}
                            onChange={e => setComment(e.target.value)}
                            required
                        />
                        <button type="submit" disabled={submitting} className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded disabled:opacity-50">
                            {submitting ? 'Submitting...' : 'Submit Review'}
                        </button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default ProductDetail;
