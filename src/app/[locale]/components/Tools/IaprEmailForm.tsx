"use client";

import getIarpEmailValidation from "@/app/api/calls/getIarpEmailValidation";
import { Button, Checkbox, Input } from "@nextui-org/react";

import { useTranslations } from "next-intl";
import { useState, useRef, FormEvent } from "react";
import InfoModal from "../Modals/InfoModal";

export default function IaprEmailForm({ session }: any) {
  const t = useTranslations("IaprEmail");
  const serverAccessToken = session?.user?.serverAccessToken;
  const tin = useRef("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [description, setDescription] = useState();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const vatNumber: string = tin.current;
    console.log("i submitted the IaprEmail Form");
    //TODO:when end point is ready enable code to get results
    // try {
    //   const res = await getIarpEmailValidation(vatNumber, serverAccessToken);
    //   console.log("DATA=>", res);
    //   setLoading(false);
    //   if (res.valid) {
    //     setDescription(res);
    //     setOpenModal(true);
    //   } else {
    //     setError(t("invalidVat"));
    //     throw new Error("wrongCredentials");
    //   }
    // } catch (error) {
    //   console.log("Error");
    //   setLoading(false);
    // }
  };

  return (
    <>
      {openModal && (
        <InfoModal
          title={t("contactEmail")}
          description={description}
          onClose={() => setOpenModal(false)}
        />
      )}
      <form className="space-y-6 w-full" onSubmit={handleSubmit}>
        <Input
          isClearable
          id="vat"
          label={t("vatLabel")}
          color="primary"
          name="vat"
          disabled={loading}
          type="text"
          placeholder="EL123456789"
          size="md"
          variant="bordered"
          minLength={11}
          maxLength={11}
          onChange={(e) => {
            tin.current = e.target.value;
            setError("");
            if (tin.current !== "") setIsEnabled(true);
            else setIsEnabled(false);
          }}
          classNames={{
            label: "text-black",
          }}
        />
        <span className="text-danger  text-sm mt-1 mx-2">{error}</span>
        <Button
          isLoading={loading ? true : false}
          type="submit"
          isDisabled={!isEnabled}
          className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          spinnerPlacement="end"
        >
          {t("button")}
        </Button>
      </form>
    </>
  );
}
