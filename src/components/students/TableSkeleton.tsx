import React from "react";
import Skeleton from "react-loading-skeleton";

const TableSkeleton = ({ rowsPerPage = 10 }: { rowsPerPage: number }) => {
    return (
        <div className='overflow-x-auto'>
            <table className="min-w-full overflow-hidden">
                <thead className="text-[#303972] border-b border-gray-200">
                <tr>
                    <th className="p-4 text-left text-xs"><Skeleton width={150} height={20} /></th>
                    <th className="p-4 text-left text-xs"><Skeleton width={80} height={20} /></th>
                    <th className="p-4 text-left text-xs"><Skeleton width={100} height={20} /></th>
                    <th className="p-4 text-left text-xs"><Skeleton width={120} height={20} /></th>
                    <th className="p-4 text-left text-xs"><Skeleton width={100} height={20} /></th>
                    <th className="p-4 text-left text-xs"><Skeleton width={60} height={20} /></th>
                    <th className="p-4 text-left text-xs"><Skeleton width={60} height={20} /></th>
                    <th className="p-4 text-left text-xs"><Skeleton width={80} height={20} /></th>
                </tr>
                </thead>
                <tbody>
                {Array(rowsPerPage).fill(0).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                    <td className="py-4 px-6"><Skeleton width={150} height={20} /></td>
                    <td className="py-4 px-6"><Skeleton width={80} height={20} /></td>
                    <td className="py-4 px-6"><Skeleton width={100} height={20} /></td>
                    <td className="py-4 px-6"><Skeleton width={120} height={20} /></td>
                    <td className="py-4 px-6"><Skeleton width={100} height={20} /></td>
                    <td className="py-4 px-6"><Skeleton width={60} height={20} /></td>
                    <td className="py-4 px-6"><Skeleton width={60} height={20} /></td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
}

export default TableSkeleton;
       