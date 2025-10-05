import React from "react";
import Skeleton from "react-loading-skeleton";

const CardSkeleton = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 !pb-0">
            {Array.from({ length: 4 }).map((_, index) => (
                <div
                key={index}
                className="border border-gray-100 rounded-lg p-4 flex flex-col gap-4 shadow-sm"
                >
                <div className="flex items-start justify-between gap-4 flex-wrap">
                    <Skeleton circle width={48} height={48} />

                    <div className="flex items-center gap-3 flex-wrap">
                    <Skeleton circle width={32} height={32} />
                    <Skeleton circle width={32} height={32} />
                    <Skeleton width={48} height={20} />
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <Skeleton width="75%" height={16} />
                    <Skeleton width="50%" height={12} />
                </div>

                <Skeleton width="33%" height={12} />
                </div>
            ))}
        </div>
    )
}

export default CardSkeleton;