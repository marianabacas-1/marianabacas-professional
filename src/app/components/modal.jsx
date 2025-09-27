import React, { useRef } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import PrimaryButton from './primaryButton';

export default function Modal(props) {
  const cancelButtonRef = useRef(null);

  const onClose = () => {
    props.onClose();
  };

  const getModalSize = (size) => {
    if (size === "medium") return "md:max-w-screen-md";
    if (size === "large") return "md:max-w-screen-lg";
    return "";
  };

  return (
    <>
      {props.open && (
        <>
          <div className="relative z-50" initialfocus={cancelButtonRef} onClose={onClose}>
            <div className="fixed inset-0 bg-gray-500 bg-opacity-30 backdrop-blur-sm transition-opacity" />

            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-end justify-center p-4 text-center items-center sm:p-0">
                <div className={`scale-up-center relative transform rounded-xl bg-white text-left shadow-2xl transition-all sm:my-8 w-full sm:max-w-lg ${getModalSize(props.size)} ${props.className}`} style={props.style}>
                  <div className="rounded-t-lg p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div className="mr-4 flex h-12 w-12 items-center justify-center">
                          {props.icon}
                        </div>
                        <div className="text-lg font-semibold text-gray-500">{props.title}</div>
                      </div>
                      <CloseIcon className="cursor-pointer hover:scale-110 transition-transform duration-200" color="action" onClick={onClose} />
                    </div>
                    <div className="mt-2 px-6 md:px-14 bg-white bg-opacity-90">
                      {props.children}
                    </div>
                  </div>
                  <div className="w-full rounded-b-lg md:flex grid justify-items-stretch gap-4 p-4 md:justify-end">
                    <button className="bg-red-700 hover:bg-red-500 hover:opacity-100 px-4 py-2 rounded-lg shadow hover:shadow-inner" onClick={onClose}>
                      Cancelar
                    </button>
                    {props.actionText && (
                      <PrimaryButton buttonDisabled={props.buttonDisabled} onClick={() => props.onClick()} isLoading={props.isLoading} isLoadingText={props.loadingButtonText} actionText={props.actionText} />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
