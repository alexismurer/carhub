"use client";

import { ShowMoreProps } from "@/types";
import { useRouter } from "next/navigation";

import React from "react";
import CustomButton from "./CustomButton";
import { updateSearchParams } from "@/utils";
import { PAGE_SIZE } from "@/constants";
import { useDictionary } from "./LanguageProvider";

const ShowMore = ({ pageNumber, isNext }: ShowMoreProps) => {
  const router = useRouter();
  const t = useDictionary();

  const handleNavigation = () => {
    const newLimit = (pageNumber + 1) * PAGE_SIZE;
    const newPathName = updateSearchParams("limit", `${newLimit}`);
    router.push(newPathName, { scroll: false });
  };

  return (
    <div className="w-full flex-center gap-5 mt-10">
      {isNext && (
        <CustomButton
          title={t.home.showMore}
          btnType="button"
          containerStyles="bg-primary-blue rounded-full text-white"
          handleClick={handleNavigation}
        />
      )}
    </div>
  );
};

export default ShowMore;
