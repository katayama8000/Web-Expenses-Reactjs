import { FC, useState } from "react";
import Link from "next/link";
import { useDisclosure } from "@mantine/hooks";
import {
  createStyles,
  Navbar,
  Group,
  UnstyledButton,
  Tooltip,
  MediaQuery,
  Switch,
} from "@mantine/core";
import {
  Home,
  Settings,
  Notes,
  UserPlus,
  Edit,
  Folders,
  TestPipe,
  ArrowLeft,
  ArrowRight,
  DeviceAnalytics,
  Key,
  ReportMoney,
  Book,
  Calculator,
} from "tabler-icons-react";
import { getPath } from "src/lib/const";
import { ActiveLink } from "src/lib/next";
import { useIsAdmin } from "@hooks/member/useIsAdmin";

const useStyles = createStyles<string, { collapsed?: boolean }>(
  (theme, params, getRef) => {
    const icon: string = getRef("icon");

    return {
      navbar: {
        position: "sticky",
        top: 0,
        width: params?.collapsed ? 81 : 264,
        transition: params?.collapsed ? "width 0.1s linear" : "none",
      },

      header: {
        paddingBottom: theme.spacing.xs,
        marginBottom: theme.spacing.md,
        borderBottom: `1px solid ${theme.colors.gray[2]}`,
      },

      footer: {
        paddingTop: theme.spacing.xs,
        marginTop: theme.spacing.md,
        borderTop: `1px solid ${theme.colors.gray[2]}`,
      },

      logo: {
        ...theme.fn.focusStyles(),
        width: "100%",
        display: "flex",
        alignItems: "center",
        columnGap: theme.spacing.sm,
        textDecoration: "none",
        fontSize: theme.fontSizes.sm,
        color: theme.colors.gray[7],
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,
        fontWeight: 700,
      },

      link: {
        ...theme.fn.focusStyles(),
        width: "100%",
        display: "flex",
        alignItems: "center",
        columnGap: theme.spacing.sm,
        textDecoration: "none",
        fontSize: theme.fontSizes.sm,
        color: theme.colors.gray[7],
        padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
        borderRadius: theme.radius.sm,
        fontWeight: 500,

        "&:hover": {
          backgroundColor: theme.colors.gray[0],
          color: theme.black,

          [`& .${icon}`]: {
            color: theme.black,
          },
        },
      },

      linkActive: {
        "&, &:hover": {
          backgroundColor: theme.colors[theme.primaryColor][0],
          color: theme.colors[theme.primaryColor][7],
          [`& .${icon}`]: {
            color: theme.colors[theme.primaryColor][7],
          },
        },
      },

      linkIcon: {
        ref: icon,
        color: theme.colors.gray[6],
      },

      linkLabel: params?.collapsed ? { display: "none" } : {},
    };
  }
);

const ITEMS_ADMIN = [
  { href: getPath("INDEX"), label: "?????????", Icon: Home },
  { href: getPath("USERAPPLICATION"), label: "???????????????", Icon: Notes },
  {
    href: getPath("UNAPPROVEDAPPLICATION"),
    label: "?????????????????????",
    Icon: Folders,
  },
  {
    href: getPath("APPROVEDAPPLICATION"),
    label: "????????????????????????",
    Icon: Folders,
  },
  {
    href: getPath("CALCULATION"),
    label: "????????????",
    Icon: Calculator,
  },
  {
    href: getPath("KEY"),
    label: "???",
    Icon: Key,
  },
  {
    href: getPath("SALES"),
    label: "??????",
    Icon: ReportMoney,
  },
  {
    href: getPath("LIBRARY"),
    label: "??????",
    Icon: Book,
  },
  { href: getPath("MEMBEREDIT"), label: "??????????????????", Icon: Edit },
  { href: getPath("ACCOUNT"), label: "???????????????", Icon: UserPlus },
  {
    href: getPath("TEST"),
    label: "?????????(???????????????)",
    Icon: TestPipe,
  },
];

const ITEMS_MEMBER = [
  { href: getPath("INDEX"), label: "?????????", Icon: Home },
  { href: getPath("USERAPPLICATION"), label: "???????????????", Icon: Notes },
  {
    href: getPath("KEY"),
    label: "???",
    Icon: Key,
  },
  {
    href: getPath("SALES"),
    label: "??????",
    Icon: ReportMoney,
  },
  { href: getPath("ACCOUNT"), label: "???????????????", Icon: UserPlus },
  {
    href: getPath("TEST"),
    label: "?????????(???????????????)",
    Icon: TestPipe,
  },
];

type Item = {
  href: string;
  label: string;
  Icon: FC;
};

export const SideNav: FC<{ className?: string }> = ({ className }) => {
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [collapsed, handlers] = useDisclosure(false);
  const { classes, cx } = useStyles({ collapsed });
  let ITEMS: Item[] = useIsAdmin(isAdmin) === true ? ITEMS_MEMBER : ITEMS_ADMIN;

  return (
    <Navbar p="md" className={cx(classes.navbar, className)}>
      <Navbar.Section grow>
        <Group className={classes.header} position="apart">
          <Link href={getPath("INDEX")}>
            <a className={classes.logo}>
              <DeviceAnalytics />
              <span className={classes.linkLabel}>Web-Expenses</span>
            </a>
          </Link>
        </Group>
        {ITEMS.map(({ label, href, Icon }) => (
          // <Tooltip
          //   label={label}
          //   key={label}
          //   disabled={!collapsed}
          //   position="right"
          //   withArrow
          //   sx={{ width: "100%" }}
          // >
          <ActiveLink href={href} passHref key={label}>
            {(isActive) => {
              return (
                <a
                  className={cx(classes.link, {
                    [classes.linkActive]: isActive,
                  })}
                >
                  <Icon />
                  <span className={classes.linkLabel}>{label}</span>
                </a>
              );
            }}
          </ActiveLink>
          // </Tooltip>
        ))}
      </Navbar.Section>
      <Switch
        size="xl"
        onLabel="????????????"
        offLabel="?????????"
        onClick={() => {
          setIsAdmin(!isAdmin);
        }}
      />

      <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
        <Navbar.Section className={classes.footer}>
          <UnstyledButton className={classes.link} onClick={handlers.toggle}>
            {collapsed ? (
              <ArrowRight className={classes.linkIcon} />
            ) : (
              <>
                <ArrowLeft className={classes.linkIcon} />
                <span>???????????????</span>
              </>
            )}
          </UnstyledButton>
        </Navbar.Section>
      </MediaQuery>
    </Navbar>
  );
};
