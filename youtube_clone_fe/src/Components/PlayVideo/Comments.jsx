import React from 'react'
import dislike from '../../assets/dislike.png'
import jack from '../../assets/jack.png'
import like from '../../assets/like.png'

const Comments = () => {
    const comments = [1, 2, 3] // Dữ liệu mẫu, có thể thay bằng props hoặc API

    return (
        <div className="comments-section mt-6">
            <h4 className="text-lg font-semibold mb-4">130 Comments</h4>
            <div className="add-comment flex items-center gap-4 mb-6">
                <img
                    src={jack}
                    alt="User"
                    className="w-10 h-10 rounded-full"
                />
                <input
                    type="text"
                    placeholder="Add a public comment..."
                    className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
                    Comment
                </button>
            </div>
            <div className="comment-list space-y-6">
                {comments.map((comment) => (
                    <div
                        key={comment}
                        className="comment flex items-start gap-4"
                    >
                        <img
                            src={jack}
                            alt="User"
                            className="w-10 h-10 rounded-full"
                        />
                        <div className="flex-1">
                            <p className="font-semibold text-sm">User {comment}</p>
                            <p className="text-sm text-gray-700">
                                This is a sample comment for the video. Great content!
                            </p>
                            <div className="flex items-center gap-4 text-gray-500 text-xs mt-2">
                                <button className="flex items-center gap-1 hover:text-blue-500">
                                    <img src={like} alt="Like" className="w-4 h-4" /> 10
                                </button>
                                <button className="flex items-center gap-1 hover:text-blue-500">
                                    <img src={dislike} alt="Dislike" className="w-4 h-4" /> 1
                                </button>
                                <button className="hover:text-blue-500">Reply</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Comments;