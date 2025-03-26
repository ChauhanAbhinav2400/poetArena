export default function CommentSection({ comments }) {
  if (comments.length === 0) {
    return (
      <div className="bg-gray-800 rounded-xl shadow-md p-6 text-center text-gray-400">
        <p>No comments yet. Be the first to share your thoughts!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments?.map((comment) => (
        <div
          key={comment?._id}
          className="bg-gray-800 rounded-xl shadow-md overflow-hidden"
        >
          <div className="p-4">
            <div className="flex items-center mb-3">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center text-white font-bold">
                {comment?.userName?.charAt(0)}
              </div>
              <div className="ml-2">
                <div className="font-medium text-gray-300">
                  {comment?.userName}
                </div>
                <div className="text-xs text-gray-500">
                  {new Date(comment?.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
            <p className="text-gray-300">{comment?.text}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
