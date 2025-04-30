import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type CheckoutStep = 'shipping' | 'payment' | 'confirmation';

interface StepIndicatorProps {
  steps: {
    key: CheckoutStep;
    label: string;
  }[];
  currentStep: CheckoutStep;
  onStepClick?: (step: CheckoutStep) => void;
  allowNavigation?: boolean;
}

export const StepIndicator = ({
  steps,
  currentStep,
  onStepClick,
  allowNavigation = false,
}: StepIndicatorProps) => {
  const currentStepIndex = steps.findIndex((step) => step.key === currentStep);

  return (
    <div className="mb-8">
      <div className="flex items-center justify-center">
        {steps.map((step, index) => {
          // Xác định trạng thái của mỗi bước
          const isCompleted = index < currentStepIndex;
          const isActive = step.key === currentStep;
          const isPending = index > currentStepIndex;
          
          return (
            <React.Fragment key={step.key}>
              <motion.div
                className={cn(
                  "flex flex-col items-center",
                  allowNavigation && index <= currentStepIndex && "cursor-pointer"
                )}
                onClick={() => {
                  if (allowNavigation && index <= currentStepIndex && onStepClick) {
                    onStepClick(step.key);
                  }
                }}
                whileHover={
                  allowNavigation && index <= currentStepIndex
                    ? { scale: 1.05 }
                    : {}
                }
              >
                <motion.div
                  className={cn(
                    "w-10 h-10 flex items-center justify-center rounded-full",
                    isActive && "bg-primary text-primary-foreground",
                    isCompleted && "bg-green-500 text-white",
                    isPending && "bg-gray-200 text-gray-600"
                  )}
                  initial={false}
                  animate={{
                    scale: isActive ? 1.1 : 1,
                    transition: { type: "spring", stiffness: 500, damping: 30 }
                  }}
                >
                  {isCompleted ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  ) : (
                    index + 1
                  )}
                </motion.div>
                <motion.span
                  className={cn(
                    "mt-2 text-sm",
                    isActive && "font-medium",
                    isPending && "text-gray-500"
                  )}
                  animate={{
                    fontWeight: isActive ? 600 : 400
                  }}
                >
                  {step.label}
                </motion.span>
              </motion.div>

              {/* Dòng kết nối giữa các bước */}
              {index < steps.length - 1 && (
                <motion.div
                  className="flex-grow h-0.5 mx-2"
                  initial={{ backgroundColor: "#e5e7eb" }} // Gray-200
                  animate={{
                    backgroundColor: index < currentStepIndex ? "#10b981" : "#e5e7eb" // Green-500 nếu đã hoàn thành, Gray-200 nếu chưa
                  }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
