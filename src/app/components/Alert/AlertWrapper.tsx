"use client";

import Alert from "./Alert";
import { useAppDispatch, useAppSelector } from "@/app/lib/hooks";
import { hideAlert } from "@/app/slices/userSlice";

const AlertWrapper = () => {
  const alert = useAppSelector((state) => state.user.alert);
  const dispatch = useAppDispatch();

  return (
    <Alert
      isOpen={alert.isOpen}
      onClose={() => dispatch(hideAlert())}
      title={alert.title}
      subtitle={alert.subtitle}
      variant={alert.variant === "error" ? "danger" : "success"}
    />
  );
};

export default AlertWrapper;
