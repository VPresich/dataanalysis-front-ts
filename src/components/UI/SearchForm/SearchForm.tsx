import React, { useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import clsx from "clsx";
import { yupResolver } from "@hookform/resolvers/yup";
import { feedbackSchema } from "./feedbackScema";
import InputWithButton from "../InputWithButton/InputWithButton";
import { SearchFormProps, SearchFormValues } from "./SearchForm.types";

const SearchForm: React.FC<SearchFormProps> = ({
  onSearch,
  initValue = "",
  className = null,
  placeholder = "Search",
}) => {
  const methods = useForm<SearchFormValues>({
    resolver: yupResolver(feedbackSchema),
    defaultValues: {
      topic: initValue,
    },
  });

  const { handleSubmit, setValue } = methods;

  useEffect(() => {
    setValue("topic", initValue);
  }, [initValue, setValue]);

  const onSubmit: SubmitHandler<SearchFormValues> = (data) => {
    const value = data.topic.trim();
    onSearch(value);
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={clsx(className && className)}
      >
        <InputWithButton
          name="topic"
          placeholder={placeholder}
          type="text"
          onSubmit={handleSubmit(onSubmit)}
        />
      </form>
    </FormProvider>
  );
};

export default SearchForm;
