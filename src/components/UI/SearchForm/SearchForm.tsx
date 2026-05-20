import { useEffect } from "react";
import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import clsx from "clsx";
import { yupResolver } from "@hookform/resolvers/yup";
import { feedbackSchema } from "./feedbackSchema";
import InputWithButton from "../InputWithButton/InputWithButton";

interface SearchFormProps {
  onSearch: (value: string) => void;
  initValue?: string;
  className?: string | null;
  placeholder?: string;
}

interface SearchFormValues {
  topic: string;
}

const SearchForm = ({
  onSearch,
  initValue = "",
  className = null,
  placeholder = "Search",
}: SearchFormProps) => {
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

  const handleSearchSubmit = () => {
    handleSubmit(onSubmit)();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className={clsx(className)}>
        <InputWithButton
          name="topic"
          placeholder={placeholder}
          type="text"
          onSubmit={handleSearchSubmit}
        />
      </form>
    </FormProvider>
  );
};

export default SearchForm;
