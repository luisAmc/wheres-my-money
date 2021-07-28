import { Container } from '../ui/Container';

export function Resume() {
  return (
    <Container>
      <div className='flex flex-col space-y-4'>
        <div>
          <div className='font-medium text-lg'>
            Gastos del mes por categoría
          </div>
          <div className='text-gray-500'>En el mes has gastado L. 8,291.93</div>
        </div>

        {/* Doughnut */}
        <div className='flex items-center justify-center'>
          <div className='flex items-center justify-center h-48 w-48 rounded-full bg-red-300'>
            <div className='flex h-32 w-32 rounded-full bg-white items-center justify-center'>
              <span className='flex flex-col'>
                <span className='text-center text-sm font-semibold'>
                  Este mes
                </span>
                <span className='text-center text-xl font-semibold'>
                  L. 8,291.93
                </span>
              </span>
            </div>
          </div>
        </div>

        <div className='grid grid-cols-2 gap-1 p-6 place-items-center'>
          <div className='flex space-x-1'>
            <div className='w-3 h-3 bg-yellow-500 rounded-full'></div>
            <span>Comida</span>
          </div>

          <div className='flex space-x-1'>
            <div className='w-3 h-3 bg-yellow-500 rounded-full'></div>
            <span>Comida</span>
          </div>

          <div className='flex space-x-1'>
            <div className='w-3 h-3 bg-yellow-500 rounded-full'></div>
            <span>Comida</span>
          </div>

          <div className='flex space-x-1'>
            <div className='w-3 h-3 bg-yellow-500 rounded-full'></div>
            <span>Comida</span>
          </div>
        </div>
      </div>
    </Container>
  );
}
