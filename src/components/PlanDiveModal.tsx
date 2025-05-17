import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

const PlanDiveModal = ({ isOpen, onClose, site, onConfirm }) => {
  if (!site) return null;

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-200'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-150'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-200'
              enterFrom='scale-95 opacity-0'
              enterTo='scale-100 opacity-100'
              leave='ease-in duration-150'
              leaveFrom='scale-100 opacity-100'
              leaveTo='scale-95 opacity-0'
            >
              <Dialog.Panel className='w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all'>
                <Dialog.Title className='text-lg font-bold mb-4'>
                  Plan Dive at{' '}
                  <span className='text-blue-700'>{site.name}</span>
                </Dialog.Title>

                <form
                  className='space-y-4'
                  onSubmit={(e) => {
                    e.preventDefault();
                    // Future: capture actual form data
                    onConfirm(); // ✅ triggers the toast!
                  }}
                >
                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Date
                    </label>
                    <input
                      type='date'
                      required
                      className='w-full mt-1 border rounded px-3 py-2 text-sm'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Time
                    </label>
                    <input
                      type='time'
                      required
                      className='w-full mt-1 border rounded px-3 py-2 text-sm'
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-medium text-gray-700'>
                      Notes (optional)
                    </label>
                    <textarea
                      className='w-full mt-1 border rounded px-3 py-2 text-sm'
                      rows={3}
                      placeholder='e.g., Drift dive, bring reef hook, strong current'
                    />
                  </div>

                  <div className='flex justify-end gap-3 pt-4'>
                    <button
                      type='button'
                      onClick={onClose}
                      className='px-4 py-2 border border-gray-300 rounded text-sm text-gray-700 hover:bg-gray-50'
                    >
                      Cancel
                    </button>

                    <button
                      type='submit'
                      className='px-4 py-2 bg-blue-600 text-white rounded text-sm hover:bg-blue-700'
                    >
                      Save Dive
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default PlanDiveModal;
