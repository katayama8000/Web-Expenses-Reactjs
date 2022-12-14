import { useGetStoragePath } from "@hooks/useGetStoragePath";
import { ApplicationModel } from "@type/application.model";
import { useEffect, useState } from "react";
import { supabase } from "src/lib/supabase/supabase";
import { UseApplicationModel } from "@type/index";

export const useGetIsApprovedApplication = (
  isApproved: boolean
): UseApplicationModel => {
  const [application, setApplication] = useState<ApplicationModel[]>([]);
  const ApplicationStoragePath = useGetStoragePath("application", "receipt");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getApprovedApplication = async (): Promise<void> => {
    try {
      const { data, error } = await supabase
        .from<ApplicationModel>("application")
        .select("*")
        .match({ isApproved: isApproved });
      console.log(data, error);
      if (!data || error) {
        return;
      }

      if (data) {
        const app = data.map((application) => {
          application.receipt =
            ApplicationStoragePath! + "/" + String(application.id);
          return application;
        });
        setApplication(app);
      } else {
        console.error(error);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getApprovedApplication();
  }, []);
  return { application, getApprovedApplication, isLoading };
};
