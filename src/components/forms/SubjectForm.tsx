"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import InputField from "../InputField";
import Image from "next/image";
import { subjectSchema, SubjectSchema } from "@/lib/formValidationSchema";
import { createSubject } from "@/lib/actions";
import { useFormState } from "react-dom";

const SubjectForm = ({
  type,
  data,
}: {
  type: "create" | "update";
  data?: any;
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubjectSchema>({
    resolver: zodResolver(subjectSchema),
  });

  const [state, formAction] = useFormState(createSubject, {
    success: false,
    error: false,
  });
  const onSubmit = handleSubmit((data) => {
    console.log(data);
    formAction(data);
  });
  return (
    <form className="flex flex-col gap-8" onSubmit={onSubmit}>
      <h1 className="text-xl font-semibold">
        {type === "create" ? "Create a new subject" : "Update the subject"}
      </h1>

      <div className="flex justify-between flex-wrap gap-4">
        <InputField
          label={"Subject name"}
          register={register}
          name={"name"}
          defaultValue={data?.username}
          error={errors?.name}
        />
      </div>
      {state.error && (
        <span className="text-red-600">Error for create subject!</span>
      )}
      <button className="bg-blue-400 text-white p-2 rounded-md">
        {type === "create" ? "Create" : "Update"}
      </button>
    </form>
  );
};

export default SubjectForm;
