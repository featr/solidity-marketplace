import { useEthPrice } from "@components/hooks/useEthPrice";
import { Modal, ConnectButton, Message } from "@components/ui/common";
import { CourseContent } from "@content/courses/fetcher";
import { TSubmitOrderInfo } from "@pages/marketplace";
import React, { useEffect, useMemo, useState } from "react";

const defaultOrder = {
  price: "",
  email: "",
  confirmationEmail: "",
};

type TFormReturn = {
  isDisabled: boolean;
  message: string;
};

const _createFormState = (isDisabled = false, message = ""): TFormReturn => ({
  isDisabled,
  message,
});

const createFormState = (
  { email, confirmationEmail }: typeof defaultOrder,
  hasAgreedTOS
): TFormReturn => {
  if (email !== confirmationEmail) {
    return _createFormState(true, "Emails are not matching.");
  }
  if (!hasAgreedTOS) {
    return _createFormState(true, "You need to accept terms of service.");
  }
  return _createFormState();
};

export default function OrderModal({
  course,
  onClose,
  onSubmit,
  onSubmitInfo,
}: {
  course: CourseContent;
  onClose: () => void;
  ƒ;
  onSubmit: (order: typeof defaultOrder) => void;
  onSubmitInfo: TSubmitOrderInfo;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [order, setOrder] = useState(defaultOrder);
  const [hasAgreedTOS, setHasAgreedTOS] = useState(false);

  useEffect(() => {
    if (course) {
      setIsOpen(true);
      setOrder({
        ...defaultOrder,
      });
    }
  }, [course]);

  const closeModal = () => {
    setIsOpen(false);
    setOrder(defaultOrder);
    setHasAgreedTOS(false);
    onClose();
  };

  const formState = useMemo(() => {
    return createFormState(order, hasAgreedTOS);
  }, [order, hasAgreedTOS]);

  return (
    <Modal isOpen={isOpen}>
      <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
        <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
          <div className="sm:flex sm:items-start">
            <div className="mt-3 sm:mt-0 sm:ml-4 sm:text-left">
              <h3
                className="mb-7 text-lg font-bold leading-6 text-gray-900"
                id="modal-title"
              >
                {course?.title}
              </h3>

              <div className="mt-2 relative rounded-md">
                <div className="mb-1">
                  <label className="mb-2 font-bold">Email</label>
                </div>
                <input
                  onChange={({ target }) => {
                    const { value } = target;
                    setOrder({
                      ...order,
                      email: value.trim(),
                    });
                  }}
                  type="email"
                  name="email"
                  id="email"
                  className="w-80 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                  placeholder="x@y.com"
                />
                <p className="text-xs text-gray-700 mt-1">
                  It&apos;s important to fill a correct email, otherwise the
                  order cannot be verified. We are not storing your email
                  anywhere
                </p>
              </div>
              <div className="my-2 relative rounded-md">
                <div className="mb-1">
                  <label className="mb-2 font-bold">Repeat Email</label>
                </div>
                <input
                  type="email"
                  name="confirmationEmail"
                  id="confirmationEmail"
                  className="w-80 focus:ring-indigo-500 shadow-md focus:border-indigo-500 block pl-7 p-4 sm:text-sm border-gray-300 rounded-md"
                  placeholder="x@y.com"
                  onChange={({ target }) => {
                    const { value } = target;
                    setOrder({
                      ...order,
                      confirmationEmail: value.trim(),
                    });
                  }}
                />
              </div>
              <div className="text-xs text-gray-700 flex">
                <label className="flex items-center mr-2">
                  <input
                    type="checkbox"
                    className="form-checkbox"
                    checked={hasAgreedTOS}
                    onChange={({ target }) => {
                      const { checked } = target;
                      // console.log("checked", checked);
                      setHasAgreedTOS(checked);
                    }}
                  />
                </label>
                <span>
                  I accept featr&apos;s &apos;terms of service&apos; and I agree
                  that my order can be rejected in case the data provided above
                  is not correct
                </span>
              </div>
              {formState.message && (
                <div className="p-4 my-3 text-yellow-700 bg-yellow-200 rounded-lg text-sm">
                  {formState.message}
                </div>
              )}
              {onSubmitInfo.error && (
                <div className="p-4 my-3 text-yellow-700 bg-yellow-200 rounded-lg text-sm">
                  Smething went wrong. Please try again and make sure you have
                  not already purchased this course.
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex">
          <ConnectButton
            disabled={formState.isDisabled || onSubmitInfo.loading}
            onClick={() => onSubmit(order)}
          >
            Submit
          </ConnectButton>
          <ConnectButton onClick={closeModal} variant="red">
            Cancel
          </ConnectButton>
        </div>
      </div>
    </Modal>
  );
}
