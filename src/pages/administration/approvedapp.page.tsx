import { DashboardLayout } from "src/pages/_layout";
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Grid,
  Group,
  Menu,
  Modal,
  Text,
} from "@mantine/core";
import React, { useCallback, useEffect, useState } from "react";
import { PageContainer } from "src/component/PageContainer";
import dayjs from "dayjs";
import { showNotification } from "@mantine/notifications";
import { IconCheck, IconDots, IconArrowBackUp } from "@tabler/icons";
import { supabase } from "src/lib/supabase/supabase";
import { CommonApplication } from "@component/application/application";
import { useGetApplicationStoragePath } from "@hooks/useGetApplicationStoragePath";
import type { ApplicationModel } from "@type/index";

const Approved = () => {
  const [application, setApplication] = useState<ApplicationModel[]>([]);
  const [openedApplication, setOpenedApplication] = useState<boolean>(false);
  const [id, setId] = useState<number>(0);
  const ApplicationStoragePath = useGetApplicationStoragePath();

  const handleIsApprovedFalse = async () => {
    try {
      const { data, error } = await supabase
        .from("application")
        .update([{ isApproved: false }])
        .match({ id: id });

      if (!data || error) {
        console.error(error);
        return;
      }

      if (data) {
        setOpenedApplication(false);
        showNotification({
          disallowClose: true,
          title: "経費申請",
          message: "未承認に戻しました",
          color: "teal",
          icon: <IconCheck size={18} />,
        });
      }
    } catch (e) {
      console.error(e);
    }
  };

  const getApplication = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from<ApplicationModel>("application")
        .select("*")
        .filter("isApproved", "in", '("true")');
      console.log(data, error);
      if (!data || error) {
        return;
      }

      if (data) {
        console.log(data);

        ApplicationStoragePath.then((url) => {
          if (typeof url === "string") {
            const app = data.map((application) => {
              //getUserName(application.userID);
              //application.userName = memberName;
              application.receipt = url! + "/" + String(application.id);
              return application;
            });
            setApplication(app);
          } else {
            console.error(url);
          }
        });
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const handleSetBeforeApproved = useCallback(
    (id: number) => {
      setId(id);
      setOpenedApplication(true);
    },
    [setId, setOpenedApplication]
  );

  useEffect(() => {
    getApplication();
    const subscription = supabase
      .from("application")
      .on("UPDATE", (payload) => {
        getApplication();
        console.log("Change received!", payload);
      })
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <PageContainer title="過去の申請書">
        <Grid>
          {application.map((item) => {
            return (
              <Grid.Col span={4} key={item.id}>
                <CommonApplication
                  id={item.id}
                  payfor={item.payfor}
                  purpose={item.purpose}
                  detail={item.detail}
                  categoryOfCost={item.categoryOfCost}
                  inside={item.inside}
                  outside={item.outside}
                  paidDate={item.paidDate}
                  cost={item.cost}
                  isApproved={item.isApproved}
                  receipt={item.receipt}
                  userID={item.userID}
                  handleSetBeforeApproved={handleSetBeforeApproved}
                />
              </Grid.Col>
            );
          })}
        </Grid>
      </PageContainer>
      <Modal
        opened={openedApplication}
        onClose={() => setOpenedApplication(false)}
        centered
        title="慎重に確認してください"
        classNames={{
          header: "text-center text-blue-400",
        }}
      >
        <div>
          <Button
            color="primary"
            onClick={() => handleIsApprovedFalse()}
            size="sm"
            variant="outline"
          >
            未承認に戻す
          </Button>
        </div>
      </Modal>
    </div>
  );
};

Approved.getLayout = DashboardLayout;
export default Approved;
