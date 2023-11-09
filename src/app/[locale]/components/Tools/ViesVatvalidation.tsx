"use client";

import getViesVatValidation from "@/app/api/calls/getViesVatValidation";
import { Button, Checkbox, Input, Select, SelectItem } from "@nextui-org/react";
import { useTranslations } from "next-intl";
import { useState, useRef, FormEvent } from "react";
import InfoModal from "../Modals/InfoModal";

const countries = [
  {
    id: "EL",
    value: "EL",
    option: "greece",
  },
  {
    id: "BE",
    value: "BE",
    option: "belgium",
  },
  {
    id: "BG",
    value: "BG",
    option: "bulgaria",
  },
  {
    id: "XI",
    value: "XI",
    option: "northIreland",
  },
  {
    id: "FR",
    value: "FR",
    option: "france",
  },
  {
    id: "DE",
    value: "DE",
    option: "germany",
  },
  {
    id: "DK",
    value: "DK",
    option: "denmark",
  },
  {
    id: "EE",
    value: "EE",
    option: "estonia",
  },
  {
    id: "IE",
    value: "IE",
    option: "ireland",
  },
  {
    id: "ES",
    value: "ES",
    option: "spain",
  },
  {
    id: "IT",
    value: "IT",
    option: "italy",
  },
  {
    id: "NL",
    value: "NL",
    option: "netherlands",
  },
  {
    id: "HR",
    value: "HR",
    option: "croatian",
  },
  {
    id: "CY",
    value: "CY",
    option: "cyprus",
  },
  {
    id: "LV",
    value: "LV",
    option: "latvia",
  },
  {
    id: "LT",
    value: "LT",
    option: "lithuania",
  },
  {
    id: "LU",
    value: "LU",
    option: "luxemburg",
  },
  {
    id: "MT",
    value: "MT",
    option: "malta",
  },
  {
    id: "HU",
    value: "HU",
    option: "hungary",
  },
  {
    id: "PL",
    value: "PL",
    option: "poland",
  },
  {
    id: "PT",
    value: "PT",
    option: "portugal",
  },
  {
    id: "RO",
    value: "RO",
    option: "romania",
  },
  {
    id: "SI",
    value: "SI",
    option: "slovenia",
  },
  {
    id: "SK",
    value: "SK",
    option: "slovakia",
  },
  {
    id: "SE",
    value: "SE",
    option: "sweden",
  },
  {
    id: "CZ",
    value: "CZ",
    option: "czechRepublic",
  },
  {
    id: "FI",
    value: "FI",
    option: "finland",
  },
];

export default function ViesVatvalidationForm({ session }: any) {
  const serverAccessToken = session?.user?.serverAccessToken;

  const t = useTranslations("ViesVatvalidation");
  const tin = useRef("");
  const rememberMe = useRef(false);
  const [selectedCountry, setSelectedCountry] = useState("EL"); // Default value is 'EL' for Greece
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [description, setDescription] = useState();

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedValue = e.target.value; // Extract the selected value from the event object
    setSelectedCountry(selectedValue); // Update the selected country when it changes
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const Vat: string = tin.current;
    const Code: string = selectedCountry;
    try {
      const res = await getViesVatValidation({
        Code,
        Vat,
        serverAccessToken,
      });
      setLoading(false);
      if (res.valid) {
        setDescription(res)
        setOpenModal(true);
      } else {
        setError(t("invalidVat"));
        throw new Error("wrongCredentials");
      }
    } catch (error) {
      console.log("Error");
      setLoading(false);
    }
  };

  return (
    <>
      {openModal && (
        <InfoModal
          title={t('viesVatInfo')}
          description={description}
          onClose={()=>setOpenModal(false)}
        />
      )}
      <form className="space-y-6 w-full md:w-[50%]" onSubmit={handleSubmit}>
        <Select
          label={t("countries")}
          defaultSelectedKeys={["EL"]}
          value={selectedCountry}
          showScrollIndicators
          classNames={{
            label: "text-black",
          }}
          onChange={handleCountryChange}
        >
          {countries.map((country) => (
            <SelectItem key={country.id} id={country.id} value={country.value}>
              {t(`${country.option}`)}
            </SelectItem>
          ))}
        </Select>
        <Input
          variant="bordered"
          color="primary"
          size="lg"
          disabled={loading}
          minLength={2}
          maxLength={13}
          label={t(`${"vatNumber"}`)}
          placeholder="123456789"
          type="text"
          onChange={(e) => {
            tin.current = e.target.value;
            setError("");
            if (tin.current !== "") setIsEnabled(true);
            else setIsEnabled(false);
          }}
          classNames={{
            input: "text-xl",
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
