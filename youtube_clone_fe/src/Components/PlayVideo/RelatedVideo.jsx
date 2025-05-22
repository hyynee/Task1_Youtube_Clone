import React from 'react'

const RelatedVideo = () => {
    const relatedVideos = [1, 2, 3, 4]

    return (
        <div className="related-videos w-full lg:w-1/3">
            <h4 className="text-lg font-semibold mb-4">Related Videos</h4>
            <div className="video-list space-y-4">
                {relatedVideos.map((video) => (
                    <div
                        key={video}
                        className="related-video flex items-start gap-4"
                    >
                        <img
                            src="https://via.placeholder.com/120x80"
                            alt="Related Video"
                            className="w-24 h-16 rounded-lg object-cover"
                        />
                        <div className="flex-1">
                            <p className="font-semibold text-sm line-clamp-2">
                                Related Video Title {video}
                            </p>
                            <p className="text-xs text-gray-500">Channel Name</p>
                            <p className="text-xs text-gray-500">10k views • 1 day ago</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
export default RelatedVideo;