"use client";

import { FieldError, Input, Label, TextField } from "@heroui/react";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

type Props = {
  name: string;
  label: string;
  placeholder: string;
  validate?: (value: string) => string | null;
  onChange?: (value: string) => void;
};

export default function PasswordField({ name, label, placeholder, validate, onChange }: Props) {
  const [visible, setVisible] = useState(false);

  return (
    <TextField
      isRequired
      name={name}
      type={visible ? "text" : "password"}
      validate={validate}
      onChange={onChange}
    >
      <Label>{label}</Label>
      <div className="relative">
        <Input className="w-full pr-10" placeholder={placeholder} />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={visible ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন"}
          className="absolute inset-y-0 right-3 flex items-center text-muted hover:text-ink"
        >
          {visible ? <FiEyeOff /> : <FiEye />}
        </button>
      </div>
      <FieldError />
    </TextField>
  );
}
