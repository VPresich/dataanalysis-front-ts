import clsx from "clsx";
import { Controller, useFormContext } from "react-hook-form";
import css from "./RadioGroup.module.css";
import { RadioGroupProps } from "./RadioGroup.types";

const RadioGroup: React.FC<RadioGroupProps> = ({ name, options }) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={css.wrapper}>
          <span className={css.labelTitle}>Theme:</span>

          <div className={css.radioGroup}>
            {options.map((option) => (
              <label key={option} className={css.radioLabel}>
                <input
                  type="radio"
                  value={option}
                  checked={field.value === option}
                  onChange={() => field.onChange(option)}
                  className={clsx(css.radioInput, css[option])}
                />

                <span className={clsx(css.customRadio, css[option])}></span>
              </label>
            ))}
          </div>
        </div>
      )}
    />
  );
};

export default RadioGroup;
