"use client";

import { Button, Checkbox, Input } from "@nextui-org/react";

import { getServerSession } from "next-auth";
import { options } from "@/app/api/auth/[...nextauth]/options";

import { useTranslations } from "next-intl";
import { useRouter } from "next/navigation";
import { useState, useRef, FormEvent } from "react";
import getImpersonate from "@/app/api/calls/getImpersonate";
import { useSession } from "next-auth/react";
import decodeToken from "@/app/utils/decodeToken";

export default function ImpersonateForm({ session }: any) {
  const serverAccessToken = session?.user?.serverAccessToken;
  const router = useRouter();
  const t = useTranslations("Impersonate");
  const email = useRef("");
  const rememberMe = useRef(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);

  const { update } = useSession();

  async function updateSession(token:any) {
    await update({
      newToken: token,
    });
    return token;
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const Email: string = email.current;
    const HaveConsent: boolean = rememberMe.current;

    setLoading(true);
    try {
      const res = await getImpersonate({
        Email,
        HaveConsent,
        serverAccessToken,
      });
      setLoading(false);
      if (res.accessToken) {
        try {
          const decodedToken= decodeToken(res.accessToken);
          const newToken = {
            ...decodedToken,
            serverAccessToken: res?.accessToken,
            serverRefreshToken: res?.refreshToken,
            // serverAccessTokenExp: decodedAccessToken?.serverAccessTokenExp,
          };
          console.log("DECODEDDATA=>", newToken)

          await updateSession(newToken)
          router?.replace(`/selectCompany`);
        } catch {
          console.log("TOKEN UPDATE FAILED");
        }
      } else {
        setError("wrongCredentials");
        throw new Error("wrongCredentials");
      }
    } catch (error) {
      console.log("Error");
      setLoading(false);
    }
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <Input
        isClearable
        id="email"
        label={t("emailLabel")}
        color="primary"
        name="email"
        disabled={loading}
        type="email"
        autoComplete="email"
        size="md"
        variant="bordered"
        maxLength={40}
        onChange={(e) => {
          email.current = e.target.value;
          setError("");
          if (email.current !== "") setIsEnabled(true);
          else setIsEnabled(false);
        }}
        classNames={{
          label: "text-black",
        }}
      />
      <span className="text-danger  text-sm mt-1 mx-2">{error}</span>
      <Checkbox
        className="p-0"
        onChange={(e) => (rememberMe.current = e.target.checked)}
      >
        {t("rememberMe")}
      </Checkbox>
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
  );
}
