import SkeletonBase from './SkeletonBase';

interface SkeletonTableProps {
  columns?: number;
  rows?: number;
}

const SkeletonTable = ({ columns = 4, rows = 5 }: SkeletonTableProps) => {
  return (
    <div className="bg-white shadow-sm overflow-hidden">
      <table className="w-full">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            {Array(columns)
              .fill(0)
              .map((_, i) => (
                <th key={i} className="px-6 py-3 text-left">
                  <SkeletonBase width="w-20" height="h-4" />
                </th>
              ))}
            <th className="px-6 py-3 text-right">
              <SkeletonBase width="w-16" height="h-4" className="ml-auto" />
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {Array(rows)
            .fill(0)
            .map((_, rowIdx) => (
              <tr
                key={rowIdx}
                className={rowIdx % 2 === 0 ? 'opacity-100' : 'opacity-75'}
              >
                {Array(columns)
                  .fill(0)
                  .map((_, colIdx) => (
                    <td key={colIdx} className="px-6 py-4">
                      <SkeletonBase
                        width={colIdx === 0 ? 'w-48' : 'w-32'}
                        height="h-4"
                      />
                    </td>
                  ))}
                <td className="px-6 py-4 text-right">
                  <div className="flex gap-2 justify-end">
                    <SkeletonBase width="w-16" height="h-8" />
                    <SkeletonBase width="w-16" height="h-8" />
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default SkeletonTable;
