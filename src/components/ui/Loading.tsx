export function Loading() {
  return (
    <div className='animate-pulse flex items-center space-x-4 p-4 border rounded-md'>
      <div className='h-6 bg-gray-500 bg-opacity-25 w-6 rounded-full'></div>

      <div className='flex-1 space-y-2'>
        <div className='h-5 bg-gray-500 bg-opacity-25 w-12 rounded-md'></div>
        <div className='h-5 bg-gray-500 bg-opacity-25 w-5/6 rounded-md'></div>
      </div>

      <div className='h-5 bg-gray-500 bg-opacity-25 w-12 rounded-md'></div>
    </div>
  );
}
